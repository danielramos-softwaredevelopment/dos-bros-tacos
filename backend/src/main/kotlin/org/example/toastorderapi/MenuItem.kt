package org.example.toastorderapi

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal

@Entity

@Table(name = "menu_items")

class MenuItem(

    @Id
    val id: Int,

    @Column(name = "title")
    val title: String,

    @Column(name = "price", precision = 10, scale = 2)
    val price: BigDecimal
)