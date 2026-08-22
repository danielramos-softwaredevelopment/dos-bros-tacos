package org.example.toastorderapi

data class PaymentIntentResponse(
    val id: String,
    val clientSecret: String?,
)