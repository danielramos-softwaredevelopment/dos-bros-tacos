package org.example.toastorderapi

import jakarta.validation.constraints.Positive
import java.math.BigDecimal

data class CreateOrderItemRequest(
    @field:Positive("Menu item ID must be positive")
    val menuItemId: Int,

    @field:Positive("Quantity must be at least 1")
    val quantity: Int,
)