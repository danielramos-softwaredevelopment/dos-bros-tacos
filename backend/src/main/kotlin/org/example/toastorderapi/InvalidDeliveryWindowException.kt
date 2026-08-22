package org.example.toastorderapi

class InvalidDeliveryWindowException(
    override val message: String,
    val fieldErrors: Map<String, String>
) : RuntimeException(message)