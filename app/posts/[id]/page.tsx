import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Slideshow from "@/app/components/slideshow";
import {
  MapPin,
  Users,
  CalendarDays,
  DollarSign,
  Dumbbell,
  Droplet,
  Coffee,
  Car,
  ShowerHead,
  MoveVertical,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ClubPage({ params }: { params: { id: string } }) {
  const clubId = parseInt(params.id, 10);
  const club = await prisma.club.findUnique({ where: { id: clubId } });

  if (!club) notFound();

  // Server action to delete the club
  async function deleteClub() {
    "use server";
    await prisma.club.delete({ where: { id: clubId } });
    redirect("/clubs");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Cover Image */}
        <div className="relative">
          <img
            src={club.coverImg}
            alt={club.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <h1 className="text-4xl font-extrabold text-white">
              {club.name}
            </h1>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <span className="bg-accent text-white px-4 py-1 rounded-full uppercase text-sm">
              {club.sport}
            </span>
            <span className="bg-accent/20 text-accent px-4 py-1 rounded-full uppercase text-sm">
              {club.ageGroup}
            </span>
            <span className="bg-accent/20 text-accent px-4 py-1 rounded-full uppercase text-sm">
              Social: {club.social}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              <span>{club.memberCount} Members</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-accent" />
              <span>Training: {club.trainingFreq}× / week</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              <span>£{club.costPerMonth} / month</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-accent" />
              <span>Level: {club.expLevel}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {club.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Amenities
            </h2>
            <div className="flex flex-wrap gap-4">
              {club.hasGym && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Dumbbell className="w-4 h-4 text-accent" />
                  <span className="text-sm">Gym</span>
                </div>
              )}
              {club.hasPool && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Droplet className="w-4 h-4 text-accent" />
                  <span className="text-sm">Pool</span>
                </div>
              )}
              {club.hasParking && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Car className="w-4 h-4 text-accent" />
                  <span className="text-sm">Parking</span>
                </div>
              )}
              {club.hasShowers && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <ShowerHead className="w-4 h-4 text-accent" />
                  <span className="text-sm">Showers</span>
                </div>
              )}
              {club.hasCafe && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Coffee className="w-4 h-4 text-accent" />
                  <span className="text-sm">Café</span>
                </div>
              )}
              {club.hasLifts && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <MoveVertical className="w-4 h-4 text-accent" />
                  <span className="text-sm">Lifts</span>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-accent" />
            <span>
              Lat: {club.latitude.toFixed(4)}, Lng: {club.longitude.toFixed(4)}
            </span>
          </div>

          {/* Image Gallery */}
          {club.images.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Gallery
              </h2>
              <Slideshow images={club.images} />
            </div>
          )}

          {/* Delete Button */}
          <form action={deleteClub} className="mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete Club
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
