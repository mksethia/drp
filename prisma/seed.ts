const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.club.deleteMany();

  const clubsData = [
    {
      name: 'Red Tigers Football Club',
      sport: 'Football',
      level: 'Experienced',
      longitude: 12.4924,
      latitude: 41.8902,
      imageUrl: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/6935/production/_123233962_gettyimages-1235538326.jpg'
    },
    {
      name: 'Blue Dolphins Football Club',
      sport: 'Football',
      level: 'Intermediate',
      longitude: 12.4964,
      latitude: 41.9028,
      imageUrl: '/images/red-tiger.png'
    },
    {
      name: 'Golden Eagles Football Club',
      sport: 'Football',
      level: 'Open to All',
      longitude: 12.4964,
      latitude: 41.9028,
      imageUrl: '/images/red-tiger.png'
    },
    {
      name: 'Green Hornets Rugby Club',
      sport: 'Rugby',
      level: 'Beginner',
      longitude: 12.4964,
      latitude: 41.9028,
      imageUrl: '/images/red-tiger.png'
    },
  ];

  await prisma.club.createMany({
    data: clubsData,
    skipDuplicates: true,
  });

  console.log(`✅ Inserted ${clubsData.length} clubs into the database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
