package org.example.toastorderapi

import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDate
import java.time.LocalTime
import java.util.UUID

data class OrderResponse(
    val id: UUID,
    val status: OrderStatus,
    val subtotal: BigDecimal,
    val tax: BigDecimal,
    val total: BigDecimal,
    val customerName: String,
    val customerEmail: String,
    val customerPhone: String,
    val restaurantId: Int,
    val deliveryDate: LocalDate,
    val deliveryTime: LocalTime,
    val createdAt: Instant,
    val updatedAt: Instant,
    val items: List<OrderItemResponse>,
)

data class OrderItemResponse(
    val id: Long,
    val menuItemId: Int,
    val quantity: Int,
)



fun Order.toResponse(): OrderResponse {
    return OrderResponse(
        id = id,
        status = status,
        subtotal = subtotal,
        tax = tax,
        total = total,
        customerName = customerName,
        customerEmail = customerEmail,
        customerPhone = customerPhone,
        restaurantId = restaurantId,
        deliveryDate = deliveryDate,
        deliveryTime = deliveryTime,
        createdAt = createdAt,
        updatedAt = updatedAt,
        items = items.map {
            OrderItemResponse(
                id = it.id,
                menuItemId = it.menuItemId,
                quantity = it.quantity,
            )
        }
    )
}