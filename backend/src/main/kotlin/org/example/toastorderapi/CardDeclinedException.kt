package org.example.toastorderapi

import java.util.UUID

class CardDeclinedException(
    val id: UUID
): RuntimeException()