'use server'

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Helper to ensure user is authenticated. 
// In a real app, you'd also check if the user is a DOCTOR and owns this appointment.
async function checkAuth() {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function startAppointment(appointmentId: string) {
  try {
    await checkAuth();

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "IN_PROGRESS" },
    });

    revalidatePath("/doctor");
    revalidatePath("/patient");
    return { success: true };
  } catch (error) {
    console.error("Error starting appointment:", error);
    return { success: false, error: "Failed to start appointment" };
  }
}

export async function completeAppointment(appointmentId: string, notes: string) {
  try {
    await checkAuth();

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { 
        status: "COMPLETED"
      },
    });

    revalidatePath("/doctor");
    revalidatePath("/patient");
    return { success: true };
  } catch (error) {
    console.error("Error completing appointment:", error);
    return { success: false, error: "Failed to complete appointment" };
  }
}

export async function cancelAppointment(appointmentId: string) {
  try {
    await checkAuth();

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });

    revalidatePath("/doctor");
    revalidatePath("/patient");
    return { success: true };
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return { success: false, error: "Failed to cancel appointment" };
  }
}
