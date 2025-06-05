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

  const distance = parseFloat(formData.get("distance") as string);
  if (isNaN(distance)) throw new Error("Invalid distance submitted");

  await prisma.club.create({
    data: {
      name: formData.get("title") as string,
      sport: formData.get("content") as string,
      distance,
    },
  });

  redirect("/posts");
}
