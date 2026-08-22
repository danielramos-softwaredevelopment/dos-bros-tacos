# Toast Order API

A production-style backend service built with Kotlin, Spring Boot, and PostgreSQL that models restaurant order creation, payment processing, and business rule enforcement.

This project was built to deepen my understanding of backend engineering, distributed systems, and API design through implementing realistic business workflows rather than simple CRUD endpoints.

---

## Technologies

- Kotlin
- Spring Boot
- Spring Data JPA / Hibernate
- PostgreSQL
- Gradle
- REST APIs

---

## Features

- Restaurant order creation
- Payment processing workflow
- Idempotent payment creation
- Payment state machine
- Business rule validation
- Centralized exception handling
- Layered architecture
- PostgreSQL persistence

---

## Architecture

The application follows a layered architecture:

Controller → Service → Repository → PostgreSQL

### Controller

- Maps HTTP requests
- Performs request validation
- Returns HTTP responses

### Service

- Contains business logic
- Validates business rules
- Coordinates workflows
- Maintains system invariants

### Repository

- Handles data persistence
- Uses Spring Data JPA

---

## Payment Flow

The payment system is designed to safely handle retries and failures.

1. Client creates an order.
2. Order is persisted in a `PAYMENT_PENDING` state.
3. Client requests payment creation.
4. Existing payments are reused (idempotency).
5. New payment records are persisted **before** calling the payment provider.
6. Payment transitions through:

PENDING → PROCESSING → SUCCESSFUL / FAILED

Persisting the payment before contacting the provider ensures every external payment attempt has a corresponding database record. If the application crashes or the provider times out, payment processing can be safely resumed without risking duplicate charges.

---

## Engineering Concepts Demonstrated

- REST API design
- Layered architecture
- Domain modeling
- JPA entity relationships
- Transactional persistence
- Idempotency
- State machines
- Repository pattern
- Dependency injection
- Business validation
- Exception handling
- Separation of responsibilities

---

## Running Locally

Create a `.env` file using `.env.example`.

Example:

DATABASE_URL=jdbc:postgresql://localhost:5432/toast_orders
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

Then run:

./gradlew bootRun

The application starts on:

http://localhost:8080

---

## Future Improvements

- Payment reconciliation via webhooks
- Inventory reservation
- Authentication & authorization
- Integration testing
- Docker Compose deployment
- Event-driven architecture
- Observability and metrics

---

## Why I Built This

I built this project to move beyond simple CRUD applications and practice the kinds of engineering decisions required for production backend systems. The focus was understanding **why** architectural patterns such as idempotency, layered architecture, transactional consistency, and state machines exist, and implementing them in a realistic restaurant ordering domain.