import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ClubDetail({ params }: { params: { id: string } }) {
  const club = await prisma.club.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!club) notFound();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{club.name}</h1>
        <p className="text-lg text-gray-700">
          <strong>Sport:</strong> {club.sport}
        </p>
        <p className="text-lg text-gray-700 mt-2">
          <strong>Distance:</strong> {club.distance} mi
        </p>
        <p className="text-lg text-gray-700 mt-2">
          <strong>Experience Level:</strong> {club.level}
        </p>

        <a href="/app" className="mt-6 inline-block text-indigo-600 hover:underline">
          ← Back to Clubs
        </a>
      </div>
    </div>
  );
}