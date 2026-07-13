# EDIR Management System

The **EDIR Management System** is a community management application designed to digitize and simplify the administration of an Edir organization. It enables administrators to manage organizational information, members, contributions, penalties, and other day-to-day activities while enforcing the organization's business rules.

---

## Features

### Edir

The system manages a single Edir organization.

> **Business Rule:** There can only be **one Edir** in the system, representing the current organization.

#### Information

- Name
- Established Year
- Description
- Address
    - City
    - Sub-city
    - Woreda
- Phone Number

---

### Members

Members are the foundation of an Edir. The system allows administrators to register, manage, and track member information.

#### Features

- Register new members
- Update member information
- View member details
- List all members
- Record members who leave the Edir
- Record deceased members
- Assign leadership roles
- Suspend Members

#### Member Information

- First Name
- Middle Name
- Last Name
- Gender
- Date of Birth / Age
- Phone Number
- Address
    - City
    - Sub-city
    - Woreda
- Registration Date
- Membership Status
- Left Date
---

### Contributions

Manage member contributions and contribution periods.

#### Features

- Create contribution periods
- Configure contribution amount
- Configure contribution due dates
- Record member contributions
- Track unpaid contributions
- View contribution history

#### Business Rules

- Every contribution belongs to a contribution period.
- A contribution period has a start date and an end date.
- Members are expected to pay their contributions before the due date.
- Late contributions are automatically penalized
- 

---

### Contribution Penalties

Manage penalties for late contributions.

#### Features

- Configure penalty amount
- Configure penalty due date
- Automatically calculate penalties
- Track unpaid penalties

#### Business Rules

- A penalty is applied when a contribution is paid after its due date.
- Penalty calculation follows the organization's configured rules.

---

### Leadership

The Edir can assign leadership positions to members.

#### Supported Roles

- Director
- Secretary
- Treasurer

> **Business Rule:** Only registered members can be assigned to leadership roles.

---

## Future Features

- Funeral event management
- Meeting management
- Expense management
- Income management
- Financial reports
- Dashboard and analytics
- SMS/Email notifications
- User and role management
- Audit logs
- Document management

---

## Technology Stack

### Backend

- Java 21
- Spring Boot
- Spring Modulith
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend

- React
- TypeScript
- TanStack Router
- TanStack Query
- TanStack Table
- shadcn/ui
- Tailwind CSS

---

## Architecture

This project follows:

- Domain-Driven Design (DDD)
- Hexagonal Architecture (Ports and Adapters)
- CQRS (Query/Command Separation)
- Spring Modulith

### High-Level Architecture

```text
Client
    │
    ▼
REST Controllers
    │
    ▼
Application Layer
 ├── Commands
 └── Queries
    │
    ▼
Domain Layer
 ├── Aggregates
 ├── Entities
 ├── Value Objects
 └── Domain Services
    │
    ▼
Infrastructure Layer
 ├── Persistence (JPA)
 ├── Messaging
 └── External Integrations
```

---

## Project Goals

- Digitize Edir administration
- Enforce business rules through the domain model
- Build a maintainable and modular application
- Separate business logic from infrastructure
- Support future expansion with additional modules and features