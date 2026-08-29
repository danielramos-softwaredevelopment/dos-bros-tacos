package org.example.toastorderapi

import java.util.UUID

class OrderNotFoundException(
    val id: UUID
) : RuntimeException()