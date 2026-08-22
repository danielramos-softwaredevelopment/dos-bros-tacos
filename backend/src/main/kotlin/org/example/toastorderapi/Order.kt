package org.example.toastorderapi

import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDate
import java.time.LocalTime
import java.util.UUID

@Entity

@Table(name = "orders")

class Order(
    @Id
    val id: UUID,

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    var status: OrderStatus = OrderStatus.PAYMENT_PENDING,

    @Column(name = "subtotal")
    val subtotal: BigDecimal,
    @Column(name = "tax")
    val tax: BigDecimal,
    @Column(name = "total")
    val total: BigDecimal,

    @Column(name = "name")
    val customerName: String,
    @Column(name = "email")
    val customerEmail: String,
    @Column(name = "phone")
    val customerPhone: String,

    @Column(name = "restaurant_id")
    val restaurantId: Int,

    @Column(name = "delivery_date")
    val deliveryDate: LocalDate,
    @Column(name = "delivery_time")
    val deliveryTime: LocalTime,

    @Column(name = "created_at")
    val createdAt: Instant,
    @Column(name = "updated_at")
    var updatedAt: Instant,

    @OneToMany(
        mappedBy = "order",
        cascade = [CascadeType.ALL],
        orphanRemoval = true,
    )
    val items: MutableList<OrderItem> = mutableListOf()



    )

enum class OrderStatus {
    PAYMENT_PENDING,
    PAID,
    CANCELLED,
}