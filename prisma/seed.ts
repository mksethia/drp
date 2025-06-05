// prisma/seed.ts

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const clubsData = [
    { name: 'Red Tigers Football Club',          sport: 'Football',       distance: 5.3 },
    { name: 'Blue Dolphins Swimming Club',       sport: 'Swimming',       distance: 2.8 },
    { name: 'Golden Eagles Basketball Club',     sport: 'Basketball',     distance: 7.1 },
    { name: 'Green Hornets Rugby Club',          sport: 'Rugby',          distance: 1.4 },
    { name: 'Black Panthers Boxing Club',        sport: 'Boxing',         distance: 9.0 },
    { name: 'White Knights Tennis Club',         sport: 'Tennis',         distance: 3.6 },
    { name: 'Storm Chasers Cricket Club',        sport: 'Cricket',        distance: 6.2 },
    { name: 'Mountain Goats Hiking Club',        sport: 'Hiking',         distance: 4.5 },
    { name: 'City Cyclones Cycling Club',        sport: 'Cycling',        distance: 0.9 },
    { name: 'Ocean Waves Surfing Club',          sport: 'Surfing',        distance: 8.4 },
    { name: 'Silver Swans Badminton Club',       sport: 'Badminton',      distance: 2.3 },
    { name: 'Iron Giants Weightlifting Club',    sport: 'Weightlifting',  distance: 5.7 },
    { name: 'Purple Dragons Martial Arts Club',  sport: 'Martial Arts',   distance: 7.9 },
    { name: 'Sunnyvale Golf Club',               sport: 'Golf',           distance: 3.0 },
    { name: 'City Hoppers Volleyball Club',      sport: 'Volleyball',     distance: 6.6 },
    { name: 'Lakeside Rowers Rowing Club',       sport: 'Rowing',         distance: 1.1 },
    { name: 'Sunset Sailors Sailing Club',       sport: 'Sailing',        distance: 8.7 },
    { name: 'Royal Equines Equestrian Club',     sport: 'Equestrian',     distance: 4.2 },
    { name: 'Canyon Climbers Climbing Club',     sport: 'Climbing',       distance: 0.4 },
    { name: 'Wind Riders Kitesurfing Club',      sport: 'Kitesurfing',    distance: 9.8 },
    { name: 'Shadow Fencers Fencing Club',       sport: 'Fencing',        distance: 2.6 },
    { name: 'Peak Performers Gymnastics Club',   sport: 'Gymnastics',     distance: 7.2 },
    { name: 'City Sharks Table Tennis Club',     sport: 'Table Tennis',   distance: 3.8 },
    { name: 'Valley Runners Marathon Club',      sport: 'Running',        distance: 6.9 },
    { name: 'Urban Yogis Yoga Club',             sport: 'Yoga',           distance: 1.7 },
  ]

  await prisma.club.createMany({
    data: clubsData,
    skipDuplicates: true,
  })

  console.log(`✅ Inserted ${clubsData.length} clubs into the database.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
