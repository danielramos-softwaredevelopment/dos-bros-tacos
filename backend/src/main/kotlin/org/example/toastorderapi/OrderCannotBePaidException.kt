package org.example.toastorderapi

import java.util.UUID

class OrderCannotBePaidException(
    id: UUID,
    status: OrderStatus,
) : RuntimeException(
    "Order with id $id cannot be paid because its status is $status"
)