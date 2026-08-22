package org.example.toastorderapi

import java.util.UUID

class OrderNotFoundException(id: UUID) : RuntimeException(
    "Order not found for id $id"
)