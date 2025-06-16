"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-transparent shadow-md py-4 px-8">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl text-[#ffffff] font-bold text-gray-800 hover:text-[#ffffff] transition-colors">
          NEXTPLAY
        </Link>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link 
                href="/posts/new" 
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition"
              >
                ADD CLUB
              </Link>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {session.user?.name && <div>{session.user.name}</div>}
                  <div>{session.user?.email}</div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}