// components/SearchClubs.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
  author: { name: string | null } | null;
};

export default function SearchClubs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // On initial mount, fetch ALL clubs (no filter)
  useEffect(() => {
    fetchPosts();
  }, []);

  // Helper to call our API and update state
  async function fetchPosts(queryString: string = "") {
    try {
      // e.g. GET /api/posts?search=chess  or  GET /api/posts
      const res = await fetch(`/api/posts${queryString}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }

  // When user submits the form, re-fetch with ?search=…
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    const qs = trimmed ? `?search=${encodeURIComponent(trimmed)}` : "";
    fetchPosts(qs);
  }

  return (
    <div className="w-full max-w-6xl">
      {/* ─── Search Bar ───────────────────────────────────────────────── */}
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clubs by title…"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* ─── Results Grid ──────────────────────────────────────────────── */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No clubs found.
          </p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="group">
              <div className="border rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 group-hover:underline mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  by {post.author?.name ?? "Anonymous"}
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  {new Date(post.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="relative flex-1">
                  <p className="text-gray-700 leading-relaxed line-clamp-2">
                    {post.content ?? "No content available."}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
