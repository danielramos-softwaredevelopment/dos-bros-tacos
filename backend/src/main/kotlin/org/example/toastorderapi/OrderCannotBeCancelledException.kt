package org.example.toastorderapi

import java.util.UUID

class OrderCannotBeCancelledException(
    id: UUID,
    status: OrderStatus,
) : RuntimeException(
    "Order id: $id cannot be cancelled because its status is $status"
)