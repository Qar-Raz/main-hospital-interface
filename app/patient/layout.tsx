import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";



// Patient Layout Component to protect Patient routes
// Checks if user is logged in and has PATIENT role
// This is needed to prevent user from accessing other roles' pages

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) return redirect("/");

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  // FALLBACK SYNC: If user doesn't exist (e.g. webhook failed or local dev without ngrok), create them.
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        role: "PATIENT",
        patientProfile: {
          create: {},
        },
      },
    });
  }

  // SECURITY CHECK: If they are not a patient, kick them out
  if (dbUser?.role !== "PATIENT") {
    return redirect("/");
  }

  return <>{children}</>;
}