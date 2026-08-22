package org.example.toastorderapi

import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface PaymentRepository : JpaRepository<Payment, UUID>{
    fun findByOrderId(orderId: UUID): Payment?
    fun findByPaymentRequestId(paymentRequestId: UUID): Payment?
}