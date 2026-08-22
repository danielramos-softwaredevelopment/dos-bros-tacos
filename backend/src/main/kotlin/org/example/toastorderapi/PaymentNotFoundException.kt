package org.example.toastorderapi

import java.util.UUID

class PaymentNotFoundException(
    id: UUID
) : RuntimeException(
    "Payment with id $id not found"
)