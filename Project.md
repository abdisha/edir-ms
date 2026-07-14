# EDIR Management System

The **EDIR Management System** is a community management application designed to digitize and simplify the administration of an Edir organization. It enables administrators to manage the organization, members, leadership, contributions, member financial records, payments, penalties, and future operational activities while enforcing business rules through a Domain-Driven Design (DDD) approach.

---

# Core Modules

The system is organized into independent business modules.

- **Edir Management**
- **Member Management**
- **Contribution Management**
- **Member Contribution Management**
- **Payment Management**
- **Penalty Management**
- **Reporting**
- **Notification** *(Future)*
- **Meeting Management** *(Future)*
- **Expense Management** *(Future)*

---

# Edir

The system manages a single Edir organization.

> **Business Rule:** Only one Edir can exist in the system.

## Information

- Name
- Established Year
- Description
- Address
  - City
  - Sub-city
  - Woreda
- Phone Number

## Leadership

The Edir maintains three leadership positions.

### Roles

- Director
- Secretary
- Treasurer

### Features

- Appoint leaders
- Revoke appointments
- View current leadership

### Business Rules

- Only active members may become leaders.
- A member may occupy only one leadership position.
- Leadership appointments can be changed at any time.
- Leadership is automatically revoked when a member becomes deceased or leaves the organization.

---

# Members

Members are the foundation of an Edir.

## Features

- Register members
- Update member information
- View member profile
- List members
- Suspend members
- Reactivate members
- Record members leaving the Edir
- Mark members as deceased

## Member Information

- First Name
- Middle Name
- Last Name
- Gender
- Date of Birth
- Age
- Phone Number
- Address
  - City
  - Sub-city
  - Woreda
- Registration Date
- Membership Status
- Left Date

## Membership Status

- Active
- Suspended
- Left
- Deceased

## Business Rules

- Every member has a unique identifier.
- Duplicate registration is not allowed.
- Only active members participate in contributions.
- Deceased members cannot participate in future contributions.
- A member may leave and later rejoin according to Edir policies.

---

# Contributions

A Contribution defines a contribution period.

Examples

- January 2026 Monthly Contribution
- February 2026 Monthly Contribution
- Emergency Contribution
- Building Fund Contribution

A Contribution **does not store payments**.

Instead, it defines the financial obligations that every participating member must fulfill.

## Contribution Information

- Description
- Contribution Type
- Contribution Amount
- Start Date
- Due Date
- End Date
- Penalty Policy
- Status

## Features

- Create contribution periods
- Configure contribution amount
- Configure due dates
- Configure penalty policy
- Open contribution period
- Close contribution period
- View contribution statistics

## Business Rules

- A contribution belongs to one contribution period.
- Only one contribution may exist for the same period and type.
- A contribution defines the amount every participating member must pay.
- Closed contributions cannot be modified.
- Creating a contribution automatically initializes member contribution records for all active members.

---

# Member Contributions

A Member Contribution represents the financial ledger of a single member for a specific contribution period.

It is an independent aggregate responsible for tracking the member's financial obligations.

## Information

- Member
- Contribution
- Expected Contribution Amount
- Outstanding Contribution
- Outstanding Penalty
- Total Outstanding Balance
- Payment Status
- Settlement Status

## Payment Status

- Pending
- Partially Paid
- Paid
- Overdue

## Features

- View member contribution
- Track outstanding balances
- Record settlements
- Track payment progress
- Maintain payment history
- Roll balances into future contribution periods

## Business Rules

- Every active member has one Member Contribution per contribution period.
- A Member Contribution belongs to exactly one Member.
- A Member Contribution belongs to exactly one Contribution.
- Outstanding balances are updated after every payment.
- Payment status is automatically recalculated.
- Outstanding balances may roll over into future contribution periods.

---

# Payments

Payments belong to a Member Contribution.

A member may make multiple payments toward the same contribution.

## Payment Information

- Payment Date
- Amount
- Payment Method
- Receipt Number
- Recorded By
- Notes

## Features

- Record cash payments
- Record bank payments
- Support partial payments
- Support multiple payments
- View payment history
- Generate receipts

## Business Rules

- Multiple payments are allowed.
- Partial payments are allowed.
- Payments reduce outstanding balances.
- Every payment is permanently recorded.
- Payments cannot be modified after settlement unless explicitly reversed.

---

# Penalties

Penalties are maintained per Member Contribution.

They are calculated according to the configured penalty policy.

## Features

- Automatic penalty calculation
- Manual penalty adjustment (optional)
- Penalty waiver (future)
- Penalty reporting

## Business Rules

- Penalties are calculated only for overdue balances.
- Penalties belong to a Member Contribution.
- Penalties remain outstanding until settled.
- Penalties become part of the total outstanding balance.

---

# Settlement

Settlement determines how received payments are applied.

## Features

- Automatic settlement
- Partial settlement
- Outstanding balance calculation

## Business Rules

The settlement strategy is configurable.

Typical settlement order:

1. Outstanding Penalty
2. Outstanding Contribution

or

1. Outstanding Contribution
2. Outstanding Penalty

The domain model is responsible for enforcing settlement rules.

---

# Balance Rollover

When a new contribution period is created, unpaid balances from previous periods may be rolled into the new Member Contribution.

## Business Rules

Balances eligible for rollover include:

- Outstanding Contribution
- Outstanding Penalty

Example

Previous Contribution

- Contribution Due: 500 ETB
- Outstanding Contribution: 150 ETB
- Outstanding Penalty: 40 ETB

Next Contribution

- New Contribution: 500 ETB
- Rolled Contribution: 150 ETB
- Rolled Penalty: 40 ETB

Total Due

690 ETB

---

# Future Features

## Funeral Management

- Register funeral events
- Track attendance
- Assign support members

## Financial Management

- Expense Management
- Income Management
- Asset Management
- Loan Management
- Budget Planning

## Meetings

- Schedule meetings
- Attendance
- Minutes
- Decisions

## Reporting

- Contribution Reports
- Outstanding Balance Reports
- Penalty Reports
- Financial Statements
- Dashboard
- Analytics

## Communication

- SMS Notifications
- Email Notifications
- Telegram Notifications

## Administration

- User Management
- Role Management
- Audit Logs
- Document Management

---

# Technology Stack

## Backend

- Java 21
- Spring Boot
- Spring Modulith
- Spring Data JPA
- PostgreSQL
- Maven

## Frontend

- React
- TypeScript
- TanStack Router
- TanStack Query
- TanStack Table
- shadcn/ui
- Tailwind CSS

---

# Architecture

The project follows

- Domain-Driven Design (DDD)
- Hexagonal Architecture (Ports and Adapters)
- CQRS
- Spring Modulith
- Event-Driven Module Communication

---

# Domain Aggregates

The system is centered around three primary aggregates.

## Edir

Responsible for

- Organization information
- Membership
- Leadership

## Contribution

Responsible for

- Contribution period
- Contribution amount
- Due dates
- Penalty policy
- Contribution lifecycle

## MemberContribution

Responsible for

- Member financial ledger
- Outstanding contribution
- Outstanding penalties
- Payment history
- Settlement
- Balance rollover

---

# High-Level Domain Model

```text
                         +-------------------+
                         |       Edir        |
                         +-------------------+
                                  |
                       manages members
                                  |
                                  ▼
                         +-------------------+
                         |      Member       |
                         +-------------------+

                                  ▲
                                  |
                    created for every active member
                                  |
                                  |
+-------------------+     1 ---- *|
|   Contribution    |------------>|  MemberContribution |
+-------------------+             +----------------------+
| Period            |             | Outstanding Amount   |
| Amount            |             | Outstanding Penalty  |
| Due Date          |             | Payment Status       |
| Penalty Policy    |             | Settlement Status    |
+-------------------+             +----------------------+
                                             |
                                             | 1
                                             |
                                             | owns
                                             |
                                             ▼
                                      +--------------+
                                      |   Payment    |
                                      +--------------+
                                      | Amount       |
                                      | Date         |
                                      | Method       |
                                      | Receipt No.  |
                                      +--------------+
```

---

# Spring Modulith Modules

```text
edir
├── Manage Edir
├── Leadership

member
├── Register Member
├── Update Member
├── Suspend Member
├── Mark Deceased

contribution
├── Create Contribution
├── Close Contribution
├── Penalty Policy

member-contribution
├── Create Member Contribution
├── Receive Payment
├── Settlement
├── Calculate Penalty
├── Roll Over Balance

reporting
├── Contribution Reports
├── Member Reports
├── Financial Reports
```

---

# Domain Events

Examples of domain events used for communication between modules.

- ContributionCreated
- MemberRegistered
- MemberSuspended
- MemberMarkedAsDeceased
- PaymentReceived
- PenaltyCalculated
- ContributionClosed
- OutstandingBalanceRolledOver

---

# Project Goals

- Digitize Edir administration.
- Preserve business rules inside the domain model.
- Support partial payments and multiple payment transactions.
- Track outstanding contribution and penalty balances.
- Automatically calculate penalties.
- Support configurable settlement strategies.
- Automatically roll unpaid balances into future contribution periods.
- Build a modular system using Spring Modulith.
- Apply Domain-Driven Design and Hexagonal Architecture throughout the application.
- Enable future expansion without affecting existing modules.