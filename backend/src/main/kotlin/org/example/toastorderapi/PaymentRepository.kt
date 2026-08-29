package org.example.toastorderapi

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID
import java.time.Instant

interface PaymentRepository : JpaRepository<Payment, UUID>{
    fun findByOrderId(orderId: UUID): Payment?

    fun findByPaymentRequestId(paymentRequestId: UUID): Payment?

    @Query("""
        SELECT p
        FROM Payment p
        WHERE p.status = :status
            AND (
                p.stripeRequestSentAt IS NULL
                OR p.stripeRequestSentAt < :cutoff
            )
    """)

    fun findPaymentsNeedingReconciliation(
        status: PaymentStatus,
        cutoff: Instant
    ):List<Payment>
}