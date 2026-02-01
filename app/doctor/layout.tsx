import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";



// Doctor Layout Component to protect Doctor routes
// Checks if user is logged in and has DOCTOR role
// This is needed to prevent user from accessing other roles' pages

export default async function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // 1. If not logged in, go to home
  if (!user) return redirect("/");

  // 2. Check Role in DB
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  // 3. The actual secturity check, if not DOCTOR, go to home
  if (dbUser?.role !== "DOCTOR") {
    return redirect("/"); 
  }

  // 4. If they pass, render the page
  return <>{children}</>;
}