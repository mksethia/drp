"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md py-4 px-8">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="NEXTPLAY logo"
            width={120}   // adjust to your logo’s natural dimensions
            height={40}   // adjust to your logo’s natural dimensions
            priority      // optional: for critical images like a logo
          />
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
            <Link href="/login" className="bg-accent text-white px-4 py-2 rounded-lg transition">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
