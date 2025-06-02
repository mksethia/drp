// app/page.tsx
export const dynamic = "force-dynamic"; // disables SSG/ISR

import { redirect } from "next/navigation";
import { checkPostTableExists } from "@/lib/db-utils";

// ← Import the client component we’ll create next
import SearchClubs from "@/SearchClubs";

export default async function Home() {
  // 1) SERVER‐SIDE: check if "post" table exists; redirect if not.
  const tableExists = await checkPostTableExists();
  if (!tableExists) {
    redirect("/setup");
  }

  // 2) RENDER: a header + our client‐side SearchClubs component
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-24 px-8">
      <h1 className="text-5xl font-extrabold mb-6 text-[#333333]">
        New Clubs
      </h1>

      {/* ← ← ← This is where the search bar (and results grid) will appear */}
      <SearchClubs />
    </div>
  );
}
