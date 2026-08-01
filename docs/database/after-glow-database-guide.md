# After Glow Bookings — Database Guide

This file is a quick reference for future database work in this project.

## Where the database schema lives

- `prisma/schema.prisma` — Prisma models, enums, and relationships
- `prisma.config.ts` — Prisma 7 config, database URL for CLI, seed command
- `prisma/seed.ts` — initial values for lookup tables like services and sources

## Current database tables

- `Customer`
- `Source`
- `Service`
- `Appointment`
- `AppointmentService`

## When to add a new table

Add a new table when:
- the data needs its own identity
- the data will be reused in multiple places
- the data has its own lifecycle
- the data should not be duplicated inside another table

Examples:
- a new booking category
- a new employee/staff table later
- a loyalty program table later

## How to add a new table

1. Open `prisma/schema.prisma`
2. Add the new `model`
3. Add any relations to existing models
4. Save the file
5. Run validation:
   ```bash
   npx prisma validate
   ```
6. If validation passes, create a migration:
   ```bash
   npx prisma migrate dev --name add_<table_name>
   ```
7. If needed, update `prisma/seed.ts`
8. Run the seed:
   ```bash
   npx prisma db seed
   ```
9. Check the data in Prisma Studio:
   ```bash
   npx prisma studio
   ```

## How to add a new field to an existing table

1. Open `prisma/schema.prisma`
2. Add or edit the field
3. Save the file
4. Run validation:
   ```bash
   npx prisma validate
   ```
5. Create a migration:
   ```bash
   npx prisma migrate dev --name add_<field_name>
   ```
6. If the field needs default values, update the seed file or app code

## How to add values to tables

### For initial data
Use `prisma/seed.ts`.

Typical examples:
- service catalog
- booking sources
- default dropdown values

Run:

```bash
npx prisma db seed
```

### For manual testing
Use Prisma Studio:

```bash
npx prisma studio
```

Then:
- open the table
- click `Add record`
- fill the fields
- save

## Common commands

### Check schema syntax
```bash
npx prisma validate
```

### Create or apply a migration
```bash
npx prisma migrate dev --name <migration_name>
```

### Regenerate Prisma Client
```bash
npx prisma generate
```

### Run the seed script
```bash
npx prisma db seed
```

### Open Prisma Studio
```bash
npx prisma studio
```

## Important rules for this project

- `Customer.fullName` is required
- `Customer.phone` is optional
- `Customer.email` is optional
- `Appointment.notes` is optional
- `Appointment.status` starts as `CONFIRMED`
- `Service.name` must stay unique
- `Source.name` must stay unique
- one appointment can have many services
- appointment time is stored as both `startDateTime` and `endDateTime`

## Recommended workflow

When changing the database:

1. Update `schema.prisma`
2. Validate
3. Migrate
4. Generate Prisma Client if needed
5. Update seed data if needed
6. Check in Prisma Studio
7. Commit the changes

## Useful examples

### Add a new service
- edit `prisma/seed.ts`
- add the new service data
- run `npx prisma db seed`

### Add a new source
- edit `prisma/seed.ts`
- add the new source
- run `npx prisma db seed`

### Add a new table later
- edit `prisma/schema.prisma`
- validate
- migrate
- seed if needed

## Notes for production

When the app is deployed:
- keep `.env.local` private
- update `DATABASE_URL` only in secure environment settings
- never commit secrets
- use migrations for every schema change
