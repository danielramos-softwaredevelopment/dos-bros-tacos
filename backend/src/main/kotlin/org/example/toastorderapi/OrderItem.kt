package org.example.toastorderapi

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity

@Table(name = "order_items")

class OrderItem(
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val menuItemId: Int,

    val quantity: Int,

    @ManyToOne
    @JoinColumn(name = "order_id")
    val order: Order,
)