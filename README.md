# Dos Bros Tacos

A production-minded restaurant ordering backend built around a real-world food ordering workflow, with a focus on **reliability, payment safety, validation, persistence, and failure recovery** rather than simply implementing CRUD endpoints.

## Live Demo

The full-stack application is deployed and can be explored through the live restaurant website.

**Live Site:** [Dos Bros Tacos](https://dos-bros-tacos.vercel.app/)

The live application demonstrates the complete ordering experience, including:

* Restaurant menu browsing
* Delivery date and time selection
* Delivery-window validation
* Minimum 30-minute scheduling requirement
* Server-side order validation
* Backend pricing and tax calculation
* Order persistence
* Stripe test-mode payment processing
* Payment state tracking
* Payment failure recovery and reconciliation

> **Note:** This application uses Stripe test-mode payments. No real charges are made.

## Tech Stack

* **Kotlin**
* **Spring Boot 4**
* **Spring Data JPA / Hibernate**
* **PostgreSQL**
* **Gradle Kotlin DSL**
* **Stripe API**
* **Docker**
* **JUnit / Spring Boot Test**
* **Java 21**

## Architecture

The application follows a layered backend architecture:

```text
HTTP Request
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
PostgreSQL
```

External systems are isolated behind application-level responsibilities:

```text
                    ┌──────────────┐
                    │    Client    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Controllers  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Services   │
                    └───┬──────┬───┘
                        │      │
             ┌──────────┘      └──────────┐
             ▼                            ▼
      ┌─────────────┐              ┌─────────────┐
      │ PostgreSQL  │              │    Stripe   │
      └─────────────┘              └─────────────┘
```

The goal is to keep business logic inside services while keeping persistence and external integrations behind dedicated components.

---

# Core Order Flow

An order follows a state-driven workflow:

```text
Order Request
     ↓
Validate Delivery Window
     ↓
Validate Items
     ↓
Calculate Subtotal
     ↓
Calculate Tax
     ↓
Calculate Total
     ↓
Create Order
     ↓
PAYMENT_PENDING
     ↓
Payment Processing
     ↓
Payment Confirmed
```

Orders are persisted with a PAYMENT_PENDING state before payment processing, providing a durable record of the order and its payment state.

---

# Delivery Validation

Orders must satisfy several independent delivery rules.

### Delivery Date

The requested delivery date cannot be in the past.

### Business Hours

Delivery must fall within the **business window enforced by the backend**.

The current business window is:

**11:00 AM – 11:00 PM**

### Minimum Notice

A delivery must be scheduled at least **30 minutes in advance**.

The date and time are combined before this comparison:

```text
Requested Delivery Date + Requested Delivery Time
                         ↓
                LocalDateTime
                         ↓
             Must be ≥ Now + 30 min
```

Keeping business-hour validation and minimum-notice validation separate allows each rule to evolve independently.

---

# Order Validation

The API validates orders before persistence.

Validation includes:

* Delivery date is not in the past
* Delivery time falls within the backend-enforced business window
* Delivery is scheduled at least 30 minutes in advance
* Order contains at least one item
* Item quantities are positive
* Requested menu items exist

Validation errors are collected into a field-error map where appropriate so clients can receive meaningful validation feedback.

---

# Pricing

Order totals are calculated on the backend rather than trusting client-provided totals.

```text
Menu Item Prices
       ↓
   Subtotal
       ↓
      Tax
       ↓
     Total
```

The configured tax rate is:

**7%**

Tax is rounded to two decimal places using `HALF_UP` rounding.

This ensures the server remains the authority for financial calculations.

---

# Payment Processing

Stripe is used as the external payment provider.

Payment-related state is persisted separately from the order so that payment processing can be tracked independently.

A payment records information such as:

* Payment ID
* Order ID
* Payment amount
* Payment status
* Payment request ID
* Stripe PaymentIntent ID
* Time the Stripe request was sent
* Creation and update timestamps

Sensitive Stripe credentials are provided through environment variables rather than being stored in source code.

Required local environment variables:

```text
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET_KEY
```

---

# Payment Reliability

Payment processing is designed around the reality that external API calls can fail independently from database transactions.

For example:

```text
Database Transaction
        ↓
Payment State
        ↓
Stripe Request
        ↓
Network Failure
```

A database rollback cannot undo a successful external Stripe charge. This creates a distributed consistency problem between the database and the external payment provider.

Because of this, the payment workflow tracks enough state to distinguish between:

* Payment not attempted
* Payment request sent
* Payment successfully associated with Stripe
* Payment requiring reconciliation

This allows the system to recover from failures instead of assuming that a failed application request necessarily means the external payment failed.

---

# Payment Reconciliation

A scheduled reconciliation process checks payments that remain in an unresolved state.

Conceptually:

```text
          ┌────────────────────┐
          │ Payment Pending    │
          └─────────┬──────────┘
                    │
                    ▼
             Stripe Request
                    │
          ┌─────────┴─────────┐
          │                   │
       Success              Failure
          │                   │
          ▼                   ▼
 Payment Confirmed       Retry / Recovery
                              │
                              ▼
                       Reconciliation
```

This protects the system from situations where the application loses the response from Stripe even though Stripe may have successfully processed the payment.

The reconciliation process is scheduled by Spring and operates against persisted payment state.

---

# Database

The application uses PostgreSQL with Spring Data JPA/Hibernate.

Current persistence includes entities for concepts such as:

* Orders
* Order Items
* Payments
* Menu Items

Repositories isolate database access from business logic.

Hibernate manages the entity mapping and persistence lifecycle.

---

# Failure Handling

The backend is designed with failure scenarios in mind rather than treating the happy path as the only possible execution path.

Examples considered include:

* Invalid delivery dates
* Invalid delivery times
* Invalid item quantities
* Missing menu items
* Empty orders
* Payment failures
* External payment requests that lose their response
* Orders being cancelled while payment is pending
* Database persistence failures

The objective is to preserve important business invariants even when individual operations fail.

---

# Important Invariants

The system is designed around several important invariants.

### Payment Safety

A payment request must not result in multiple customer charges.

### Order Integrity

An order must not be created with invalid delivery information or invalid menu items.

### Financial Accuracy

The backend calculates the authoritative subtotal, tax, and total.

### Recoverability

An uncertain payment state must be recoverable rather than silently treated as a failed payment.

### Cancellation Safety

Orders can only be cancelled while they remain in the appropriate cancellable state.

---

# Local Development

## Requirements

* Java 21
* Gradle
* PostgreSQL
* Stripe test credentials

## Environment Variables

Set the required Stripe credentials in your local environment:

```bash
export STRIPE_SECRET_KEY="your_test_secret_key"
export STRIPE_WEBHOOK_SECRET_KEY="your_test_webhook_secret"
```

Verify that the variables are available to the current shell:

```bash
echo $STRIPE_SECRET_KEY
echo $STRIPE_WEBHOOK_SECRET_KEY
```

> **Do not commit Stripe credentials to Git.**

## Run the Application

From the backend directory:

```bash
./gradlew bootRun
```

The application starts on:

```text
http://localhost:8080
```

---

# Testing

Run the complete test suite with:

```bash
./gradlew test
```

The test suite covers application behavior including validation, order creation, persistence, and payment-related workflows.

Before pushing changes:

```bash
./gradlew test
./gradlew bootRun
```

The application should successfully initialize Spring, connect to PostgreSQL, initialize Hibernate, and start Tomcat on port `8080`.

---

# Application Goals

This application is intentionally more than a basic restaurant CRUD API.

The primary goal is to practice building backend systems that remain understandable and recoverable when things go wrong.

The design focuses on:

* REST API design
* Kotlin backend development
* Spring Boot
* PostgreSQL persistence
* JPA/Hibernate
* External API integration
* Payment reliability
* Idempotency
* Transaction boundaries
* Failure recovery
* State-driven workflows
* Validation
* Testing
* Distributed-system thinking

The application is built as a practical exercise in moving from:

```text
"It works when everything succeeds."
```

toward:

```text
"What happens when every individual component
can succeed or fail independently?"
```

That distinction is central to the design of the system.
