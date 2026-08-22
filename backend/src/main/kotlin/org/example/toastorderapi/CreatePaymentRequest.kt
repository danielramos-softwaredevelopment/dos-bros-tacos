package org.example.toastorderapi

import java.math.BigDecimal
import java.util.UUID

data class CreatePaymentRequest(
    val orderId: UUID
)