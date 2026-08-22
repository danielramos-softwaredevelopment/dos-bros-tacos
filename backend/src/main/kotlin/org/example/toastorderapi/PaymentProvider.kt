package org.example.toastorderapi

import java.math.BigDecimal
import java.util.UUID

interface PaymentProvider {

    fun createPaymentIntent(
        amount: BigDecimal,
        paymentRequestId: UUID,
    ): PaymentIntentResponse
}