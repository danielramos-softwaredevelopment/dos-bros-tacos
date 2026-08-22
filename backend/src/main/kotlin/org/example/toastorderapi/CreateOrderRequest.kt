package org.example.toastorderapi

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Positive
import java.time.LocalDate
import java.time.LocalTime

data class CreateOrderRequest(

    //  CUSTOMER
    @field:NotBlank(message = "Customer name cannot be empty")
    val customerName: String,

    @field:NotBlank(message = "Customer email cannot be empty")
    @field:Email(message = "Email must be valid")
    val customerEmail: String,

    @field:NotBlank(message = "Customer phone number cannot be empty")
    val customerPhone: String,



    //  RESTAURANT
    @field:Positive(message = "Restaurant ID cannot be blank")
    val restaurantId: Int,



    //  SCHEDULE
    val deliveryDate: LocalDate,
    val deliveryTime: LocalTime,



    //  ITEMS
    @field:NotEmpty("Order must contain at least 1 item")
    val items: List<CreateOrderItemRequest>,
)


