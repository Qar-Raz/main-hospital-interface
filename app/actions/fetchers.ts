'use server'

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getPatientAppointments() {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      include: { patientProfile: true },
    });

    if (!dbUser || !dbUser.patientProfile) {
      return { success: false, error: "Patient profile not found" };
    }

    const appointments = await prisma.appointment.findMany({
      where: { patientId: dbUser.patientProfile.id },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            // Include specialization as it's part of doctor profile and useful
          },
        },
      },
      orderBy: { date: "desc" },
    });

    return { success: true, data: appointments };
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return { success: false, error: "Failed to fetch appointments" };
  }
}

export async function getDoctorAppointments() {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      include: { doctorProfile: true },
    });

    if (!dbUser || !dbUser.doctorProfile) {
      return { success: false, error: "Doctor profile not found" };
    }

    const appointments = await prisma.appointment.findMany({
      where: { doctorId: dbUser.doctorProfile.id },
      include: {
        patient: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { date: "asc" },
    });

    return { success: true, data: appointments };
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return { success: false, error: "Failed to fetch appointments" };
  }
}
