package org.example.toastorderapi

import java.math.BigDecimal
import java.util.UUID
import java.time.Instant

data class PaymentResponse(
    val id: UUID,
    val orderId: UUID,
    val status:  PaymentStatus,
    val amount: BigDecimal,
    val clientSecret: String?,
    val createdAt: Instant,
    val updatedAt: Instant,
)


fun Payment.toResponse(
    clientSecret: String? = null
): PaymentResponse {

    return PaymentResponse(
        id = id,
        orderId = orderId,
        status = status,
        amount = amount,
        clientSecret = clientSecret,
        createdAt = createdAt,
        updatedAt = updatedAt,
        )

}