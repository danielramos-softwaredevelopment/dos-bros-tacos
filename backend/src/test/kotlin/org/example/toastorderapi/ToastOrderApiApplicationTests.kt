package org.example.toastorderapi

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.assertEquals
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDate
import java.time.LocalTime
import java.util.UUID

@SpringBootTest
class PaymentServiceTest {

    @Autowired
    lateinit var paymentService: PaymentService

    @Autowired
    lateinit var orderRepository: OrderRepository

    @Autowired
    lateinit var paymentRepository: PaymentRepository

    @Test
    fun `duplicate payment webhook is idempotent`() {

        val now = Instant.now()

        val order = Order(
            id = UUID.randomUUID(),
            status = OrderStatus.PAYMENT_PENDING,
            subtotal = BigDecimal("50.00"),
            tax = BigDecimal("4.00"),
            total = BigDecimal("54.00"),
            customerName = "Idempotency Test",
            customerEmail = "test@example.com",
            customerPhone = "555-555-5555",
            restaurantId = 1,
            deliveryDate = LocalDate.now().plusDays(1),
            deliveryTime = LocalTime.of(12, 0),
            createdAt = now,
            updatedAt = now,
        )

        orderRepository.save(order)

        val paymentRequestId = UUID.randomUUID()
        val stripePaymentIntentId = "pi_test_idempotency"

        val payment = Payment(
            id = UUID.randomUUID(),
            orderId = order.id,
            paymentRequestId = paymentRequestId,
            status = PaymentStatus.PENDING,
            amount = BigDecimal("54.00"),
            transactionId = null,
            stripePaymentIntentId = null,
            createdAt = now,
            updatedAt = now,
        )

        paymentRepository.save(payment)

        val firstResponse =
            paymentService.handlePaymentIntentSucceeded(
                paymentRequestId = paymentRequestId,
                stripePaymentIntentId = stripePaymentIntentId,
            )

        val secondResponse =
            paymentService.handlePaymentIntentSucceeded(
                paymentRequestId = paymentRequestId,
                stripePaymentIntentId = stripePaymentIntentId,
            )

        assertEquals(
            PaymentStatus.SUCCESSFUL,
            secondResponse.status
        )

        val savedPayment = paymentRepository
            .findByPaymentRequestId(paymentRequestId)
            ?: error("Payment was not found")

        val savedOrder = orderRepository
            .findById(order.id)
            .orElseThrow()

        assertEquals(
            PaymentStatus.SUCCESSFUL,
            savedPayment.status
        )

        assertEquals(
            OrderStatus.PAID,
            savedOrder.status
        )

        assertEquals(
            stripePaymentIntentId,
            savedPayment.stripePaymentIntentId
        )

        val payments = paymentRepository.findAll()
            .filter { it.orderId == order.id }

        assertEquals(1, payments.size)
    }
}