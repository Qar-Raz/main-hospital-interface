import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  // 1. Get the logged-in user from Clerk
  const user = await currentUser();

  // 2. IF NOT LOGGED IN: Show a simple Landing Page
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="mb-4 text-4xl font-bold text-blue-700">Hospital Management App</h1>
        <p className="mb-8 text-lg text-gray-600">Please sign in to access your portal.</p>
        
        <div className="flex gap-4">
          <Link 
            href="/sign-in" 
            className="rounded bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link 
            href="/sign-up" 
            className="rounded border border-blue-600 px-6 py-3 text-blue-600 transition hover:bg-blue-50"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  // 3. IF LOGGED IN: Check their Role in Neon DB
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id }
  });

  // 4. Redirect based on Role
  if (dbUser?.role === 'DOCTOR') {
    redirect('/doctor');
  } 
  
  if (dbUser?.role === 'PATIENT') {
    redirect('/patient');
  }

  // 5. SYNC FALLBACK: If user exists in Clerk but not in DB (Webhook failed or local dev), create them now.
  if (!dbUser) {
    await prisma.user.create({
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
    redirect("/patient");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Account Setup Complete</h2>
        <p className="text-gray-500">Redirecting you...</p>
      </div>
    </div>
  );
}