import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);


  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const rawSearch = url.searchParams.get("search") || "";
  const searchTerm = rawSearch.trim();
  const postsPerPage = 5;
  const offset = (page - 1) * postsPerPage;

 
  const whereClause = searchTerm
    ? {
        title: {
          contains: searchTerm,
          mode: "insensitive",
        },
      }
    : {};

  const posts = await prisma.post.findMany({
    where: whereClause,
    skip: offset,
    take: postsPerPage,
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true } },
    },
  });

  const totalPosts = await prisma.post.count({
    where: whereClause,
  });
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return NextResponse.json({ posts, totalPages });
}

