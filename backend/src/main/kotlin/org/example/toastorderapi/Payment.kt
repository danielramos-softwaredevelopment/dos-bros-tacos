package org.example.toastorderapi

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "payments")
class Payment(

    @Id
    val id: UUID,

    @Column(
        name = "order_id",
        unique = true
    )
    val orderId: UUID,
    @Column(
        name = "payment_request_id",
        unique = true
    )
    val paymentRequestId: UUID,

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    var status: PaymentStatus,

    @Column(name = "amount")
    val amount: BigDecimal,

    @Column(name = "stripe_payment_intent_id")
    var stripePaymentIntentId: String?,

    @Column(name = "created_at")
    val createdAt: Instant,
    @Column(name = "updated_at")
    var updatedAt: Instant,
)

enum class PaymentStatus {
    PENDING,
    PROCESSING,
    SUCCESSFUL,
    FAILED,
    REFUNDED,
}