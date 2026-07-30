# Database Design

## Project

**After Glow Bookings**

Version: 1.0

---

# Goals

The database is designed to support:

- One beauty salon
- One administrator
- Customer management
- Appointment management
- Multiple services per appointment
- Editable service catalogue
- Editable booking sources
- Calendar integration
- Future reports & statistics

---

# Database Overview

The application consists of the following entities:

- Customer
- Appointment
- Service
- Source
- AppointmentService

A User table will be added later when the application is deployed to production.

---

# Entity Relationship Diagram

```text
Customer (1)
      │
      │
      ▼
Appointment (N)
      │
      ├────────────► Source (1)
      │
      ▼
AppointmentService (N)
      ▲
      │
Service (1)
```

---

# Customer

Represents a customer of the salon.

| Field     | Type     | Required |
| --------- | -------- | -------- |
| id        | UUID     | ✅       |
| fullName  | String   | ✅       |
| phone     | String   | ❌       |
| email     | String   | ❌       |
| notes     | String   | ❌       |
| isActive  | Boolean  | ✅       |
| createdAt | DateTime | ✅       |
| updatedAt | DateTime | ✅       |

## Notes

- Phone is optional.
- Email is optional.
- Customers are never deleted.
- Customers can be deactivated.

---

# Appointment

Represents a booking.

| Field         | Type     | Required |
| ------------- | -------- | -------- |
| id            | UUID     | ✅       |
| customerId    | FK       | ✅       |
| sourceId      | FK       | ✅       |
| startDateTime | DateTime | ✅       |
| endDateTime   | DateTime | ✅       |
| notes         | String   | ❌       |
| status        | Enum     | ✅       |
| createdAt     | DateTime | ✅       |
| updatedAt     | DateTime | ✅       |

---

## Status

```text
CONFIRMED
COMPLETED
CANCELLED
```

Rules:

- New appointment → CONFIRMED
- User cancels → CANCELLED
- Appointment time has passed → Display as COMPLETED

---

# Service

Represents a service offered by the salon.

| Field           | Type     | Required |
| --------------- | -------- | -------- |
| id              | UUID     | ✅       |
| name            | String   | ✅       |
| price           | Decimal  | ✅       |
| durationMinutes | Integer  | ✅       |
| displayOrder    | Integer  | ✅       |
| isActive        | Boolean  | ✅       |
| createdAt       | DateTime | ✅       |
| updatedAt       | DateTime | ✅       |

## Notes

- Services are selected from a dropdown.
- Multiple services can be attached to one appointment.
- Prices can change over time.
- Durations can change over time.
- Services are never deleted.

---

# Source

Represents where the booking came from.

Examples:

- Rantevu
- Treatwell
- Τηλέφωνο

| Field        | Type     | Required |
| ------------ | -------- | -------- |
| id           | UUID     | ✅       |
| name         | String   | ✅       |
| displayOrder | Integer  | ✅       |
| isActive     | Boolean  | ✅       |
| createdAt    | DateTime | ✅       |
| updatedAt    | DateTime | ✅       |

---

# AppointmentService

Join table between Appointment and Service.

| Field         | Type |
| ------------- | ---- |
| appointmentId | FK   |
| serviceId     | FK   |

Relationship:

Appointment

↓

Many Services

---

# Business Rules

## Customer

- Full name is required.
- Phone is optional.
- Email is optional.
- Notes are optional.

---

## Appointment

- Customer is required.
- Source is required.
- At least one service is required.
- Notes are optional.

---

## Services

- Multiple services can be selected.
- Duration is used to calculate appointment end time.
- End time is stored in the database.

---

## Sources

- Managed from the application.
- Dropdown selection only.
- Can be activated/deactivated.

---

# Future Tables

## User

Will be introduced during the production deployment phase.

```text
User
----
id
username
passwordHash
createdAt
updatedAt
```

Authentication currently uses environment variables.

---

# Future Features Supported

- Customer page
- Customer history
- Customer search
- Appointment history
- Calendar
- Reports
- Revenue statistics
- Service management
- Booking source management
- Email reminders
- SMS reminders

---

# Design Decisions

## Why Customer is a separate table

Avoids storing customer information repeatedly for every appointment and enables customer history.

## Why Source is a table

Allows adding, editing, removing and ordering booking sources without code changes.

## Why Service is a table

Allows editing prices, durations and availability while keeping appointments linked to services.

## Why AppointmentService exists

Supports multiple services within a single appointment.

## Why startDateTime and endDateTime are stored

- Easy calendar integration
- Easier overlap detection
- Historical accuracy
- No need to recalculate duration every time
