// prisma/seed.ts

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const clubsData = [
  { name: 'Red Tigers Football Club',          sport: 'Football',       distance: 5.3, level: 'Experienced' },
  { name: 'Blue Dolphins Swimming Club',       sport: 'Swimming',       distance: 2.8, level: 'Intermediate' },
  { name: 'Golden Eagles Basketball Club',     sport: 'Basketball',     distance: 7.1, level: 'Experienced' },
  { name: 'Green Hornets Rugby Club',          sport: 'Rugby',          distance: 1.4, level: 'Beginner' },
  { name: 'Black Panthers Boxing Club',        sport: 'Boxing',         distance: 9.0, level: 'Experienced' },
  { name: 'White Knights Tennis Club',         sport: 'Tennis',         distance: 3.6, level: 'Intermediate' },
  { name: 'Storm Chasers Cricket Club',        sport: 'Cricket',        distance: 6.2, level: 'Open to All' },
  { name: 'Mountain Goats Hiking Club',        sport: 'Hiking',         distance: 4.5, level: 'Open to All' },
  { name: 'City Cyclones Cycling Club',        sport: 'Cycling',        distance: 0.9, level: 'Beginner' },
  { name: 'Ocean Waves Surfing Club',          sport: 'Surfing',        distance: 8.4, level: 'Experienced' },
  { name: 'Silver Swans Badminton Club',       sport: 'Badminton',      distance: 2.3, level: 'Beginner' },
  { name: 'Iron Giants Weightlifting Club',    sport: 'Weightlifting',  distance: 5.7, level: 'Experienced' },
  { name: 'Purple Dragons Martial Arts Club',  sport: 'Martial Arts',   distance: 7.9, level: 'Intermediate' },
  { name: 'Sunnyvale Golf Club',               sport: 'Golf',           distance: 3.0, level: 'Open to All' },
  { name: 'City Hoppers Volleyball Club',      sport: 'Volleyball',     distance: 6.6, level: 'Intermediate' },
  { name: 'Lakeside Rowers Rowing Club',       sport: 'Rowing',         distance: 1.1, level: 'Beginner' },
  { name: 'Sunset Sailors Sailing Club',       sport: 'Sailing',        distance: 8.7, level: 'Experienced' },
  { name: 'Royal Equines Equestrian Club',     sport: 'Equestrian',     distance: 4.2, level: 'Intermediate' },
  { name: 'Canyon Climbers Climbing Club',     sport: 'Climbing',       distance: 0.4, level: 'Open to All' },
  { name: 'Wind Riders Kitesurfing Club',      sport: 'Kitesurfing',    distance: 9.8, level: 'Experienced' },
  { name: 'Shadow Fencers Fencing Club',       sport: 'Fencing',        distance: 2.6, level: 'Intermediate' },
  { name: 'Peak Performers Gymnastics Club',   sport: 'Gymnastics',     distance: 7.2, level: 'Experienced' },
  { name: 'City Sharks Table Tennis Club',     sport: 'Table Tennis',   distance: 3.8, level: 'Beginner' },
  { name: 'Valley Runners Marathon Club',      sport: 'Running',        distance: 6.9, level: 'Open to All' },
  { name: 'Urban Yogis Yoga Club',             sport: 'Yoga',           distance: 1.7, level: 'Beginner' },
];


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
