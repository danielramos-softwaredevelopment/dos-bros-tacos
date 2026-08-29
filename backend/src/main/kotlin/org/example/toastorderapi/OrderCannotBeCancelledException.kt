package org.example.toastorderapi

import java.util.UUID

class OrderCannotBeCancelledException(
    val id: UUID,
) : RuntimeException()