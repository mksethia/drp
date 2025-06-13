const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.club.deleteMany();

  const clubsData = [
    {
      name: 'Red Tigers Football Club',
      sport: 'Football',
      level: 'Experienced',
      longitude: -0.1357,
      latitude:  51.4975,
      // imageUrl: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/6935/production/_123233962_gettyimages-1235538326.jpg',
      imageUrl: 'images/facilities.jpg',
      social: 'Social',
      cost: 100,
      isElite: true,
    },
    {
      name: 'Blue Dolphins Football Club',
      sport: 'Football',
      level: 'Intermediate',
      longitude: -0.3421,
      latitude: 51.5805,
      imageUrl: 'https://www.afcoakley.co.uk/wp-content/uploads/2023/02/Oakley_Team_3-scaled_1080x600_acf_cropped.jpg',
      social: 'Very Social',
      cost: 25,
      isElite: false,
    },
    {
      name: 'Golden Eagles Football Club',
      sport: 'Football',
      level: 'Open to All',
      longitude: 0.0098,
      latitude: 51.4934,
      imageUrl: 'https://www.alexandraparkfc.co.uk/wp-content/uploads/2022/11/2022_10_30_AP_JPEG-8-bit-300ppi-sRGB-For-Web_00021-1024x683.jpg',
      social: 'Training Only',
      cost: 48,
      isElite: false,
    },
    {
      name: 'Green Hornets Rugby Club',
      sport: 'Rugby',
      level: 'Beginner',
      longitude: -0.0073,
      latitude: 51.4612,
      imageUrl: 'https://www.ayrrugbyclub.co.uk/wp-content/uploads/2021/09/report1-scaled.jpg',
      social: 'Social',
      cost: 143,
      isElite: false,
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
