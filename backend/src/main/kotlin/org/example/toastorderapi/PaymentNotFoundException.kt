package org.example.toastorderapi

import java.util.UUID

class PaymentNotFoundException(
    val id: UUID
) : RuntimeException()