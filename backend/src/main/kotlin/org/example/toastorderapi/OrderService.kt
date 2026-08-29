package org.example.toastorderapi

import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.math.RoundingMode
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.util.UUID


@Service
class OrderService(
    private val orderRepository: OrderRepository,
    private val menuItemRepository: MenuItemRepository,
) {

    private val taxRate = BigDecimal("0.07")

    fun createOrder(request: CreateOrderRequest): OrderResponse {

        val deliveryErrors = mutableMapOf<String, String>()

        validateDeliveryDate(
            deliveryDate = request.deliveryDate,
            errors = deliveryErrors
        )

        validateDeliveryTime(
            deliveryTime = request.deliveryTime,
            errors = deliveryErrors
        )

        validateMinimumDeliveryTime(
            deliveryTime = request.deliveryTime,
            deliveryDate = request.deliveryDate,
            errors = deliveryErrors
        )

        if (deliveryErrors.isNotEmpty()) {
            throw InvalidDeliveryWindowException(
                fieldErrors = deliveryErrors
            )
        }

        validateItems(items = request.items)
        validatePositiveItemQuantities(items = request.items)

        val subtotal = calculateSubtotal(request.items)
        val tax = calculateTax(subtotal)
        val total = calculateTotal(subtotal, tax)
        val now = Instant.now()

        val order = Order(
            id = UUID.randomUUID(),

            status = OrderStatus.PAYMENT_PENDING,

            subtotal = subtotal,
            tax = tax,
            total = total,

            customerName = request.customerName,
            customerEmail = request.customerEmail,
            customerPhone = request.customerPhone,

            restaurantId = request.restaurantId,

            deliveryDate = request.deliveryDate,
            deliveryTime = request.deliveryTime,

            createdAt = now,
            updatedAt = now,
        )
        val orderItems = request.items.map {
            OrderItem(
                menuItemId = it.menuItemId,
                quantity = it.quantity,
                order = order,
            )
        }

        order.items.addAll(orderItems)

        val saveOrder = orderRepository.save(order)
        return saveOrder.toResponse()
    }



                    //  HELPER FUNCTIONS  //

    private fun getPrice(menuItemId: Int): BigDecimal {
        return menuItemRepository.findById(menuItemId)
            .orElseThrow{
                MenuItemNotFoundException(menuItemId)
            }
            .price
    }
    private fun calculateSubtotal(
        items: List<CreateOrderItemRequest>
    ): BigDecimal {
        return items.sumOf {
            getPrice(it.menuItemId)
                .multiply(BigDecimal(it.quantity))
        }

    }
    private fun calculateTax(subtotal: BigDecimal): BigDecimal {
        return subtotal
            .multiply(taxRate)
            .setScale(2, RoundingMode.HALF_UP)
    }
    private fun calculateTotal(subtotal: BigDecimal, tax: BigDecimal): BigDecimal {
        return subtotal.add(tax)
    }



    private fun validateDeliveryDate(
        deliveryDate: LocalDate,
        errors: MutableMap<String, String>
    ) {
        if (deliveryDate.isBefore(LocalDate.now())) {
            errors["deliveryDate"] =
                "Delivery date cannot be in the past"
        }
    }
    private fun validateDeliveryTime(
        deliveryTime: LocalTime,
        errors: MutableMap<String, String>
        ) {
            val openingTime = LocalTime.of(11, 0)
            val closingTime = LocalTime.of(23, 0)

            if (deliveryTime !in openingTime..<closingTime) {
                errors["deliveryTime"] =
                    "Delivery time must fall between $openingTime and $closingTime"
            }
        }
    private fun validateMinimumDeliveryTime(
        deliveryTime: LocalTime,
        deliveryDate: LocalDate,
        errors: MutableMap<String, String>
    ) {
        val minimumDeliveryDateTime = LocalDateTime.now().plusMinutes(30)

        val requestedDeliveryDateTime = LocalDateTime.of(
            deliveryDate,
            deliveryTime
        )

        if (requestedDeliveryDateTime.isBefore(minimumDeliveryDateTime)) {
            errors["deliveryTime"] =
                "Delivery time must be at least 30 minutes from now"
        }
    }
    private fun validateItems(items: List<CreateOrderItemRequest>) {
        if (items.isEmpty()) {
            throw EmptyOrderItemsException()
        }
    }
    private fun validatePositiveItemQuantities(items: List<CreateOrderItemRequest>) {
        if (items.any{it.quantity <= 0}) {
            throw InvalidItemQuantityException()
        }
    }


    private fun findOrder(id: UUID): Order {
        return orderRepository.findById(id)
            .orElseThrow{
                OrderNotFoundException(id)
            }
    }
    fun getOrder(id: UUID): OrderResponse {
        val order = findOrder(id)
        return order.toResponse()
    }



    fun cancelOrder(id: UUID): OrderResponse {
        val order = findOrder(id)

        if (order.status != OrderStatus.PAYMENT_PENDING) {
            throw OrderCannotBeCancelledException(id)
        }
        order.status = OrderStatus.CANCELLED
        order.updatedAt = Instant.now()
        val saveOrder = orderRepository.save(order)

        return saveOrder.toResponse()
    }
}