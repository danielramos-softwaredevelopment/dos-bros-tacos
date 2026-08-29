package org.example.toastorderapi

class InvalidDeliveryWindowException(
    val fieldErrors: Map<String, String>
) : RuntimeException()