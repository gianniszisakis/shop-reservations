import "dotenv/config";

import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const sources = [
  { name: "Rantevu", displayOrder: 1 },
  { name: "Treatwell", displayOrder: 2 },
  { name: "Τηλέφωνο", displayOrder: 3 },
];

const services = [
  {
    name: "Μανικιούρ & Πεντικιούρ ημιμόνιμο",
    durationMinutes: 135,
    price: "29.92",
  },
  {
    name: "Μανικιούρ Ημιμόνιμο & Lash Lift",
    durationMinutes: 150,
    price: "40",
  },
  {
    name: "Πεντικιούρ ημιμόνιμο & Συντήρηση Τεχνητών",
    durationMinutes: 165,
    price: "40",
  },
  {
    name: "Μανικιούρ & πεντικιούρ χωρίς χρώμα",
    durationMinutes: 120,
    price: "25",
  },
  {
    name: "Μανικιούρ Απλό Χρώμα",
    durationMinutes: 55,
    price: "14",
  },
  {
    name: "Αφαίρεση μόνο Ημιμόνιμου από άλλο κατάστημα",
    durationMinutes: 15,
    price: "6",
  },
  {
    name: "Πεντικιούρ Αντρικό με αφαίρεση σκλήρυνσης",
    durationMinutes: 105,
    price: "28",
  },
  {
    name: "Αφαίρεση acrygel-τεχνητά",
    durationMinutes: 20,
    price: "8",
  },
  {
    name: "Μανικιούρ Ημιμόνιμο",
    durationMinutes: 90,
    price: "17",
  },
  {
    name: "Φυσική ενίσχυση ημιμόνιμο Χέρια",
    durationMinutes: 105,
    price: "22",
  },
  {
    name: "Πεντικιούρ Ημιμόνιμο",
    durationMinutes: 95,
    price: "20",
  },
  {
    name: "Πεντικιούρ χαμάμ Κλεοπάτρα πλήρη περιποίηση (απλό χρώμα η χωρίς)",
    durationMinutes: 110,
    price: "23",
  },
  {
    name: "Πεντικιούρ χαμάμ Κλεοπάτρα πλήρη περιποίηση (ημιμόνιμο)",
    durationMinutes: 120,
    price: "27",
  },
  {
    name: "Μανικιούρ Αντρικό",
    durationMinutes: 45,
    price: "14",
  },
  {
    name: "Πεντικιούρ με Απλό χρώμα",
    durationMinutes: 55,
    price: "17",
  },
  {
    name: "Ημιμόνιμο με ενισχυμένη με βάση Gel",
    durationMinutes: 100,
    price: "24",
  },
  {
    name: "Μανικιούρ περιποίηση χωρίς χρώμα",
    durationMinutes: 40,
    price: "10",
  },
  {
    name: "Πεντικιούρ φουλ περιποίηση αφαίρεση σκλήρυνσης",
    durationMinutes: 105,
    price: "28",
  },
  {
    name: "Μανικιούρ φουλ περιποίηση χαμάμ Κλεοπάτρα ημιμόνιμο",
    durationMinutes: 90,
    price: "22",
  },
  {
    name: "Πεντικιούρ ημιμόνιμο & lash lift",
    durationMinutes: 110,
    price: "37",
  },
  {
    name: "Αφαίρεση ημιμόνιμο από άλλο κατάστημα & Μανικιούρ ημιμόνιμο",
    durationMinutes: 80,
    price: "21",
  },
  {
    name: "Θρεπτική μάσκα Χεριών",
    durationMinutes: 10,
    price: "5",
  },
  {
    name: "Σχηματισμός Φρυδιών",
    durationMinutes: 10,
    price: "5",
  },
  {
    name: "Καθαρισμός και σχήμα",
    durationMinutes: 10,
    price: "9",
  },
  {
    name: "Καθαρισμός φρυδιών",
    durationMinutes: 10,
    price: "5",
  },
  {
    name: "Lash Lift & tint",
    durationMinutes: 60,
    price: "28",
  },
  {
    name: "Lash & Brow lift & tint",
    durationMinutes: 80,
    price: "40",
  },
  {
    name: "Lash Lift & πεντικιούρ ημιμόνιμο",
    durationMinutes: 135,
    price: "38",
  },
  {
    name: "Brow lift & tint",
    durationMinutes: 55,
    price: "28",
  },
  {
    name: "Συντήρηση τεχνητών Small",
    durationMinutes: 115,
    price: "27",
  },
  {
    name: "Συντήρηση τεχνητών medium",
    durationMinutes: 135,
    price: "30",
  },
  {
    name: "Συντήρηση τεχνητών & απλό πεντκιούρ χωρίς χρώμα",
    durationMinutes: 180,
    price: "35",
  },
  {
    name: "Συντήρηση τεχνητών & πεντκιούρ ημιμόνιμο",
    durationMinutes: 210,
    price: "39",
  },
  {
    name: "Τοποθέτηση τεχνητών small",
    durationMinutes: 115,
    price: "35",
  },
  {
    name: "Τοποθέτηση τεχνητών medium",
    durationMinutes: 150,
    price: "40",
  },
];

async function main() {
  for (const source of sources) {
    await prisma.source.upsert({
      where: { name: source.name },
      update: {
        displayOrder: source.displayOrder,
        isActive: true,
      },
      create: {
        name: source.name,
        displayOrder: source.displayOrder,
        isActive: true,
      },
    });
  }

  for (const [index, service] of services.entries()) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: {
        price: new Prisma.Decimal(service.price),
        durationMinutes: service.durationMinutes,
        displayOrder: index + 1,
        isActive: true,
      },
      create: {
        name: service.name,
        price: new Prisma.Decimal(service.price),
        durationMinutes: service.durationMinutes,
        displayOrder: index + 1,
        isActive: true,
      },
    });
  }

  console.log(
    `Production data ready: ${sources.length} sources, ${services.length} services.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
