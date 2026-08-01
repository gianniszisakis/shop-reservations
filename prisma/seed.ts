import "dotenv/config";
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.appointmentService.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.service.deleteMany();
  await prisma.source.deleteMany();

  await prisma.source.createMany({
    data: [
      { name: "Rantevu", displayOrder: 1, isActive: true },
      { name: "Treatwell", displayOrder: 2, isActive: true },
      { name: "Τηλέφωνο", displayOrder: 3, isActive: true },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        name: "Μανικιούρ & Πεντικιούρ ημιμόνιμο",
        price: new Prisma.Decimal("28"),
        durationMinutes: 135,
        displayOrder: 1,
        isActive: true,
      },
      {
        name: "Μανικιούρ Ημιμόνιμο & Lash Lift",
        price: new Prisma.Decimal("35"),
        durationMinutes: 150,
        displayOrder: 2,
        isActive: true,
      },
      {
        name: "Μανικιούρ & πεντικιούρ χωρίς χρώμα Valentine's offer",
        price: new Prisma.Decimal("21"),
        durationMinutes: 120,
        displayOrder: 3,
        isActive: true,
      },
      {
        name: "Πεντικιούρ ημιμόνιμο & Συντήρηση Τεχνητών",
        price: new Prisma.Decimal("37"),
        durationMinutes: 165,
        displayOrder: 4,
        isActive: true,
      },
      {
        name: "Μανικιούρ & πεντικιούρ χωρίς χρώμα",
        price: new Prisma.Decimal("25"),
        durationMinutes: 120,
        displayOrder: 5,
        isActive: true,
      },
      {
        name: "Μανικιούρ Απλό Χρώμα",
        price: new Prisma.Decimal("12"),
        durationMinutes: 55,
        displayOrder: 6,
        isActive: true,
      },
      {
        name: "Αφαίρεση Ημιμόνιμου από άλλο κατάστημα",
        price: new Prisma.Decimal("5"),
        durationMinutes: 15,
        displayOrder: 7,
        isActive: true,
      },
      {
        name: "Πεντικιούρ Αντρικό με αφαίρεση σκλήρυνσης",
        price: new Prisma.Decimal("20"),
        durationMinutes: 105,
        displayOrder: 8,
        isActive: true,
      },
      {
        name: "Αφαίρεση acrygel-τεχνητά",
        price: new Prisma.Decimal("8"),
        durationMinutes: 20,
        displayOrder: 9,
        isActive: true,
      },
      {
        name: "Μανικιούρ Ημιμόνιμο",
        price: new Prisma.Decimal("15"),
        durationMinutes: 90,
        displayOrder: 10,
        isActive: true,
      },
      {
        name: "Φυσική ενίσχυση ημιμόνιμο Χέρια",
        price: new Prisma.Decimal("22"),
        durationMinutes: 105,
        displayOrder: 11,
        isActive: true,
      },
      {
        name: "Πεντικιούρ Ημιμόνιμο",
        price: new Prisma.Decimal("18"),
        durationMinutes: 95,
        displayOrder: 12,
        isActive: true,
      },
      {
        name: "Πεντικιούρ χαμάμ Κλεοπάτρα πλήρη περιποίηση (απλό χρώμα η χωρίς)",
        price: new Prisma.Decimal("22"),
        durationMinutes: 110,
        displayOrder: 13,
        isActive: true,
      },
      {
        name: "Πεντικιούρ χαμάμ Κλεοπάτρα πλήρη περιποίηση (ημιμόνιμο)",
        price: new Prisma.Decimal("25"),
        durationMinutes: 120,
        displayOrder: 14,
        isActive: true,
      },
      {
        name: "Μανικιούρ Αντρικό",
        price: new Prisma.Decimal("14"),
        durationMinutes: 45,
        displayOrder: 15,
        isActive: true,
      },
      {
        name: "Πεντικιούρ με Απλό χρώμα",
        price: new Prisma.Decimal("15"),
        durationMinutes: 55,
        displayOrder: 16,
        isActive: true,
      },
      {
        name: "Ημιμόνιμο ενισχυμένη με βάση Gel",
        price: new Prisma.Decimal("24"),
        durationMinutes: 100,
        displayOrder: 17,
        isActive: true,
      },
      {
        name: "Μανικιούρ περιποίηση χωρίς χρώμα",
        price: new Prisma.Decimal("10"),
        durationMinutes: 40,
        displayOrder: 18,
        isActive: true,
      },
      {
        name: "Πεντικιούρ φουλ περιποίηση αφαίρεση σκλήρυνσης",
        price: new Prisma.Decimal("24"),
        durationMinutes: 105,
        displayOrder: 19,
        isActive: true,
      },
      {
        name: "Μανικιούρ φουλ περιποίηση χαμάμ Κλεοπάτρα ημιμόνιμο",
        price: new Prisma.Decimal("20"),
        durationMinutes: 90,
        displayOrder: 20,
        isActive: true,
      },
      {
        name: "Πεντικιούρ ημιμόνιμο & lash lift",
        price: new Prisma.Decimal("37"),
        durationMinutes: 110,
        displayOrder: 21,
        isActive: true,
      },
      {
        name: "Θρεπτική μάσκα Χεριών",
        price: new Prisma.Decimal("5"),
        durationMinutes: 10,
        displayOrder: 22,
        isActive: true,
      },
      {
        name: "Lash Lift & tint",
        price: new Prisma.Decimal("25"),
        durationMinutes: 60,
        displayOrder: 23,
        isActive: true,
      },
      {
        name: "Lash & Brow lift & tint",
        price: new Prisma.Decimal("40"),
        durationMinutes: 80,
        displayOrder: 24,
        isActive: true,
      },
      {
        name: "Lash Lift & πεντικιούρ ημιμόνιμο",
        price: new Prisma.Decimal("38"),
        durationMinutes: 135,
        displayOrder: 25,
        isActive: true,
      },
      {
        name: "Brow lift & tint",
        price: new Prisma.Decimal("25"),
        durationMinutes: 55,
        displayOrder: 26,
        isActive: true,
      },
      {
        name: "Συντήρηση τεχνητών Small",
        price: new Prisma.Decimal("25"),
        durationMinutes: 115,
        displayOrder: 27,
        isActive: true,
      },
      {
        name: "Συντήρηση τεχνητών medium",
        price: new Prisma.Decimal("28"),
        durationMinutes: 135,
        displayOrder: 28,
        isActive: true,
      },
      {
        name: "Συντήρηση τεχνητών & απλό πεντκιούρ χωρίς χρώμα",
        price: new Prisma.Decimal("35"),
        durationMinutes: 180,
        displayOrder: 29,
        isActive: true,
      },
      {
        name: "Συντήρηση τεχνητών & πεντκιούρ ημιμόνιμο",
        price: new Prisma.Decimal("39"),
        durationMinutes: 210,
        displayOrder: 30,
        isActive: true,
      },
      {
        name: "Τοποθέτηση τεχνητών small",
        price: new Prisma.Decimal("25"),
        durationMinutes: 115,
        displayOrder: 31,
        isActive: true,
      },
      {
        name: "Τοποθέτηση τεχνητών medium",
        price: new Prisma.Decimal("35"),
        durationMinutes: 150,
        displayOrder: 32,
        isActive: true,
      },
    ],
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
