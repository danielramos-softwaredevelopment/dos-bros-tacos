package org.example.toastorderapi

data class FieldErrorResponse(
    val message: String,
    val fieldErrors: Map<String, String> = emptyMap()
)