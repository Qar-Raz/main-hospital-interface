'use server'

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const appointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor is required"),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Appointment date must be in the future",
  }),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

export async function getDoctors() {
  try {
    const doctors = await prisma.doctorProfile.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return { success: true, data: doctors };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return { success: false, error: "Failed to fetch doctors" };
  }
}

export async function bookAppointment(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Find the user in our database using clerkId
    const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
        include: { patientProfile: true }
    });

    if (!dbUser || !dbUser.patientProfile) {
        return { success: false, error: "Patient profile not found. Please complete your profile." };
    }

    const rawData = {
      doctorId: formData.get("doctorId") as string,
      date: formData.get("date") as string,
      reason: formData.get("reason") as string,
    };

    const validation = appointmentSchema.safeParse(rawData);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const errorMessage = Object.values(errors).flat().join(", ");
      return { success: false, error: errorMessage };
    }

    const { doctorId, date, reason } = validation.data;

    await prisma.appointment.create({
      data: {
        patientId: dbUser.patientProfile.id,
        doctorId: doctorId,
        date: new Date(date),
        reason: reason,
        status: "PENDING",
      },
    });

    revalidatePath("/patient");
    revalidatePath("/doctor");
    return { success: true };
  } catch (error) {
    console.error("Error booking appointment:", error);
    return { success: false, error: "Failed to book appointment" };
  }
}
