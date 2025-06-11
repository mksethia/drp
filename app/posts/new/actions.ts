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

  await prisma.club.create({
    data: {
      name: formData.get("title") as string,
      sport: formData.get("content") as string,
      level: formData.get("level") as string,
      latitude: Number(formData.get("latitude")),
      longitude: Number(formData.get("longitude")),
      imageUrl: formData.get("imageUrl") as string | null || null,
    },
  });

  redirect("/posts");
} 