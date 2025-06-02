// prisma/seed.ts

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const clubsData = [
    { name: 'Red Tigers Football Club',         sport: 'Football'      },
    { name: 'Blue Dolphins Swimming Club',      sport: 'Swimming'      },
    { name: 'Golden Eagles Basketball Club',    sport: 'Basketball'    },
    { name: 'Green Hornets Rugby Club',         sport: 'Rugby'         },
    { name: 'Black Panthers Boxing Club',       sport: 'Boxing'        },
    { name: 'White Knights Tennis Club',        sport: 'Tennis'        },
    { name: 'Storm Chasers Cricket Club',       sport: 'Cricket'       },
    { name: 'Mountain Goats Hiking Club',       sport: 'Hiking'        },
    { name: 'City Cyclones Cycling Club',       sport: 'Cycling'       },
    { name: 'Ocean Waves Surfing Club',         sport: 'Surfing'       },
    { name: 'Silver Swans Badminton Club',      sport: 'Badminton'     },
    { name: 'Iron Giants Weightlifting Club',   sport: 'Weightlifting' },
    { name: 'Purple Dragons Martial Arts Club', sport: 'Martial Arts'  },
    { name: 'Sunnyvale Golf Club',              sport: 'Golf'          },
    { name: 'City Hoppers Volleyball Club',     sport: 'Volleyball'    },
    { name: 'Lakeside Rowers Rowing Club',      sport: 'Rowing'        },
    { name: 'Sunset Sailors Sailing Club',      sport: 'Sailing'       },
    { name: 'Royal Equines Equestrian Club',    sport: 'Equestrian'    },
    { name: 'Canyon Climbers Climbing Club',    sport: 'Climbing'      },
    { name: 'Wind Riders Kitesurfing Club',     sport: 'Kitesurfing'   },
    { name: 'Shadow Fencers Fencing Club',      sport: 'Fencing'       },
    { name: 'Peak Performers Gymnastics Club',  sport: 'Gymnastics'    },
    { name: 'City Sharks Table Tennis Club',    sport: 'Table Tennis'  },
    { name: 'Valley Runners Marathon Club',     sport: 'Running'       },
    { name: 'Urban Yogis Yoga Club',            sport: 'Yoga'          },
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
