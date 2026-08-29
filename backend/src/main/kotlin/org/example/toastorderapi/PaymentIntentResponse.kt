package org.example.toastorderapi

import java.time.Instant

data class PaymentIntentResponse(
    val id: String,
    val clientSecret: String?,
    val stripeRequestSentAt: Instant,
)