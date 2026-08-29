package org.example.toastorderapi

import java.util.UUID

class OrderCannotBePaidException(
    val status: OrderStatus,
    val id: UUID
) : RuntimeException()