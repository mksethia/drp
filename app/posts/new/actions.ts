"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("You must be logged in to add a club");
  }

  // Extract and cast form values
  const name = formData.get("title") as string;
  const sport = formData.get("sport") as string;
  const expLevel = formData.get("level") as string;
  const coverImg = formData.get("coverImg") as string;
  const images = formData.getAll("images") as string[];
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);
  const social = formData.get("social") as string;
  const costPerMonth = parseInt(formData.get("costPerMonth") as string, 10);
  const ageGroup = formData.get("ageGroup") as string;
  const memberCount = parseInt(formData.get("memberCount") as string, 10);
  const trainingFreq = parseInt(formData.get("trainingFreq") as string, 10);
  const hasGym = formData.get("hasGym") === "on";
  const hasPool = formData.get("hasPool") === "on";
  const hasParking = formData.get("hasParking") === "on";
  const hasShowers = formData.get("hasShowers") === "on";
  const hasCafe = formData.get("hasCafe") === "on";
  const hasLifts = formData.get("hasLifts") === "on";
  const hasDisabledAccess = formData.get("hasDisabledAccess") === "on";
  const description = formData.get("description") as string;

  // Create a new club record
  await prisma.club.create({
    data: {
      name,
      sport,
      expLevel,
      coverImg,
      images,
      latitude,
      longitude,
      social,
      costPerMonth,
      ageGroup,
      memberCount,
      trainingFreq,
      hasGym,
      hasPool,
      hasParking,
      hasShowers,
      hasCafe,
      hasLifts,
      hasDisabledAccess,
      description,
    },
  });

  // Redirect back to the posts list
  redirect("/posts");
}
