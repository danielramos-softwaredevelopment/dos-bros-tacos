# Dos Bros Tacos — Full-Stack Restaurant Ordering Platform

A full-stack restaurant ordering platform designed and built from the ground up to demonstrate product design, frontend engineering, backend architecture, payment processing, and production deployment.

**Live Website:** https://dos-bros-tacos.vercel.app/

**GitHub:** https://github.com/danielramos-softwaredevelopment

---

## Overview

Dos Bros Tacos is a production-deployed restaurant ordering experience built as a complete 0→1 product.

The project combines a responsive customer-facing interface with a Kotlin/Spring Boot backend, PostgreSQL persistence, Stripe payments, and asynchronous payment confirmation through Stripe webhooks.

The goal was not simply to build a working CRUD application, but to create a realistic ordering system that remains reliable when requests are retried, payments are delayed, external services fail, or the client and backend temporarily disagree about state.

---

## Product Experience

The application allows customers to:

* Browse the restaurant menu
* Add and modify items in a cart
* Review their order
* Calculate totals and taxes
* Submit an order
* Complete payment through Stripe
* Receive payment confirmation
* Track the resulting order state

The frontend was designed around clear customer flows rather than individual screens, with an emphasis on responsive layouts, reusable components, clear states, and straightforward interactions.

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Responsive UI
* Reusable component architecture

### Backend

* Kotlin
* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs
* Layered architecture
* DTO mapping
* Domain modeling
* Validation
* Centralized exception handling

### Data

* PostgreSQL
* Supabase
* JPA/Hibernate entity relationships
* Database constraints
* Transaction management

### Payments & Integrations

* Stripe PaymentIntents
* Stripe Webhooks
* Stripe CLI
* Third-party API integration

### Deployment

* Vercel — frontend
* Render — backend
* Supabase — PostgreSQL database
* GitHub — source control

---

# Architecture

The application separates responsibilities across the frontend, API, business logic, persistence, and external payment systems.

```text
┌──────────────────────┐
│      Next.js UI      │
│   React + TypeScript │
└──────────┬───────────┘
           │
           │ REST API
           ▼
┌──────────────────────┐
│   Spring Boot API    │
│       Kotlin         │
├──────────────────────┤
│    Controllers       │
│         ↓            │
│      Services        │
│         ↓            │
│    Repositories      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      PostgreSQL      │
│       Supabase       │
└──────────────────────┘

           │
           │ Payment creation
           ▼
┌──────────────────────┐
│        Stripe        │
│    PaymentIntent     │
└──────────┬───────────┘
           │
           │ Webhook
           ▼
┌──────────────────────┐
│ /webhooks/stripe     │
│                      │
│ Verify signature     │
│ Parse event          │
│ Update payment state │
└──────────────────────┘
```

---

# Order Lifecycle

Orders move through explicit states rather than relying on a single success response from the frontend.

```text
PAYMENT_PENDING
       │
       │ Stripe PaymentIntent
       ▼
   PROCESSING
       │
       │ payment_intent.succeeded
       ▼
      PAID
```

Payment confirmation is ultimately driven by Stripe's webhook event rather than trusting the browser's redirect or success page.

This allows the backend to remain the authoritative source of payment state.

---

# Payment Architecture

Stripe PaymentIntents are used to process customer payments.

The payment flow is:

```text
Customer
   │
   ▼
Checkout UI
   │
   ▼
Backend creates PaymentIntent
   │
   ▼
Stripe processes payment
   │
   ▼
Stripe emits payment_intent.succeeded
   │
   ▼
POST /webhooks/stripe
   │
   ├── Verify Stripe signature
   │
   ├── Extract PaymentIntent
   │
   ├── Read payment_request_id
   │
   └── Update order/payment state
           │
           ▼
          PAID
```

The webhook endpoint validates the `Stripe-Signature` header using Stripe's webhook signing secret before processing the event.

This prevents the application from accepting arbitrary requests that claim a payment succeeded.

---

# Idempotent Payment Processing

Payment processing must be safe when requests are retried.

A network failure can occur after Stripe successfully processes a payment but before the application receives the response. Retrying the request without protection could potentially create duplicate payment attempts.

The backend therefore uses:

* Idempotency keys
* Unique database constraints
* Existing payment lookup
* Retry-safe recovery logic

The goal is to ensure that repeating the same payment operation does not result in duplicate processing.

```text
Request
   │
   ▼
Generate idempotency key
   │
   ▼
Create PaymentIntent
   │
   ├── Success ────────────────┐
   │                           │
   └── Timeout / Retry         │
               │               │
               ▼               │
        Recover existing       │
        payment operation      │
               │               │
               └───────────────┘
                       │
                       ▼
                  Single payment
```

---

# Server-Authoritative Pricing

The frontend does not have final authority over the amount charged.

The backend calculates the order total using trusted menu and order data before creating the payment.

This prevents a client from modifying a request and attempting to submit an arbitrary price.

```text
Client Order
     │
     ▼
Backend validates items
     │
     ▼
Backend retrieves trusted pricing
     │
     ▼
Calculate subtotal
     │
     ▼
Calculate tax
     │
     ▼
Calculate final total
     │
     ▼
Create payment
```

This keeps business-critical pricing logic on the server.

---

# Database & Domain Modeling

The application models core restaurant concepts as persistent domain entities.

Primary concepts include:

* Orders
* Order Items
* Payments

JPA/Hibernate manages relationships between these entities while PostgreSQL provides durable persistence.

Database constraints are also used to protect important invariants at the persistence layer rather than relying exclusively on application-level checks.

---

# Layered Backend Architecture

The backend follows a traditional layered architecture:

```text
HTTP Request
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
PostgreSQL
```

### Controllers

Responsible for:

* HTTP request handling
* Request validation
* Response construction
* API boundaries

### Services

Responsible for:

* Business rules
* State transitions
* Transaction boundaries
* Payment workflows
* Order lifecycle logic

### Repositories

Responsible for:

* Database access
* Persistence
* Entity retrieval
* Database queries

This separation keeps business logic independent from HTTP and persistence concerns.

---

# Reliability & Failure Handling

The system was designed with failure scenarios in mind rather than assuming every operation succeeds.

Examples include:

* Duplicate payment requests
* Stripe payment retries
* Delayed webhook delivery
* Failed payments
* Invalid order data
* Invalid state transitions
* Database constraints
* Client/server state differences
* External service failures

One important design principle is that **a successful frontend payment page does not itself make an order paid**.

The backend waits for authoritative payment confirmation from Stripe.

---

# Production Deployment

The project is deployed as separate frontend and backend applications.

```text
GitHub
   │
   ├───────────────┐
   │               │
   ▼               ▼
 Vercel          Render
   │               │
Next.js        Spring Boot
                   │
                   ▼
              Supabase
              PostgreSQL

                   ▲
                   │
                 Stripe
                   │
                   ▼
             Stripe Webhook
```

The production deployment required resolving several real-world integration issues, including:

* CORS configuration
* Environment variables
* Frontend/backend connectivity
* Stripe webhook configuration
* Webhook signature verification
* Database persistence
* Production API debugging
* Deployment configuration

---

# Design & UX

The project was designed as a customer-facing product rather than simply an API demonstration.

Design considerations included:

* Clear ordering flows
* Responsive layouts
* Reusable UI components
* Visual hierarchy
* Cart and checkout interactions
* Loading states
* Payment states
* Error handling
* Accessibility
* Mobile-friendly interactions
* Clear feedback after important user actions

The design goal was to make the ordering process feel simple even though the underlying system contains multiple services, state transitions, and failure scenarios.

---

# AI-Assisted Development

AI tools were used throughout the development process as an engineering and design accelerator.

AI was used for:

* Concept exploration
* UI ideation
* Rapid prototyping
* Code generation
* Debugging
* Architecture analysis
* Failure-mode analysis
* Code critique
* UX critique
* Iterative refinement
* Technical research

AI was treated as a development tool rather than a replacement for engineering ownership.

Architecture decisions, implementation choices, debugging, testing, and final code decisions remained under direct developer control.

---

# Challenges & Lessons Learned

### Stripe Webhooks

The application initially relied heavily on the frontend payment flow. Moving payment confirmation to Stripe webhooks created a more reliable source of truth for payment state.

### CORS

Deploying the frontend and backend separately introduced cross-origin request requirements that did not exist during local development.

The production environment required explicit CORS configuration for the Vercel frontend.

### Environment Configuration

Local development and production use different environments and secrets. Stripe credentials, webhook secrets, database credentials, and deployment configuration must be managed independently.

### Distributed State

The payment flow demonstrated an important distributed-systems problem:

The browser, backend, Stripe, and database can temporarily have different views of the same operation.

The system therefore relies on authoritative state transitions, idempotency, database constraints, and webhook-driven updates rather than assuming synchronous communication.

### Production Debugging

The application was tested through the deployed production stack rather than stopping after local development.

This exposed issues involving:

* CORS
* API connectivity
* Environment variables
* Stripe webhook delivery
* Database persistence
* Payment state synchronization

Resolving these issues provided practical experience debugging a distributed application across multiple independently deployed systems.

---

# Local Development

## Prerequisites

* Node.js
* npm
* JDK 21
* Kotlin
* Gradle
* PostgreSQL/Supabase account
* Stripe account

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

## Backend

```bash
cd backend
./gradlew bootRun
```

The Spring Boot API runs on:

```text
http://localhost:8080
```

## Environment Variables

Sensitive credentials should be supplied through environment variables and should never be committed to source control.

Example configuration:

```text
DATABASE_URL=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

Use the project's actual configuration files and deployment settings for the complete environment-variable list.

---

# Testing

The payment workflow was tested both locally and against the deployed production environment.

Stripe CLI was used during development to test webhook delivery and payment events.

Important scenarios tested include:

* Successful payments
* Payment state transitions
* Webhook processing
* Duplicate/retry scenarios
* Invalid requests
* Production API communication
* Database persistence

---

# What This Project Demonstrates

This project demonstrates experience across the full product lifecycle:

**Concept → Design → Frontend → Backend → Database → Payments → Deployment → Debugging → Iteration**

It also demonstrates practical experience with:

* Full-stack development
* Product thinking
* REST API design
* Kotlin/Spring Boot
* React/Next.js
* PostgreSQL
* Payment systems
* Webhooks
* Idempotency
* Transactions
* Domain modeling
* Asynchronous processing
* Production debugging
* Distributed-system failure modes
* AI-assisted development

---

## Project Status

**Production deployed and actively maintained.**

The application continues to evolve as new design, engineering, and reliability improvements are identified.
