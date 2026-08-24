package org.example.toastorderapi

import org.springframework.stereotype.Service
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.transaction.annotation.Transactional
import java.util.UUID
import java.time.Instant

@Service
class PaymentService (
    private val paymentRepository : PaymentRepository,
    private val orderRepository : OrderRepository,
    private val paymentProvider : PaymentProvider,
) {



    fun createPayment(orderId: UUID): PaymentResponse {

        val existingPayment = findExistingPayment(orderId)

        if (existingPayment != null) {
            return existingPayment.toResponse()
        }

        val order = findOrder(orderId)
        validatePaymentStatus(order)
        val now = Instant.now()
        val payment = Payment(
            id = UUID.randomUUID(),
            orderId = order.id,
            paymentRequestId = UUID.randomUUID(),
            status = PaymentStatus.PENDING,
            amount = order.total,
            stripePaymentIntentId = null,
            createdAt = now,
            updatedAt = now,
        )

        return try {
            val savedPayment = paymentRepository.save(payment)

            val paymentIntent = paymentProvider.createPaymentIntent(
                savedPayment.amount,
                savedPayment.paymentRequestId,
            )
            savedPayment.stripePaymentIntentId = paymentIntent.id
            savedPayment.updatedAt = now

            val finalPayment = paymentRepository.save(savedPayment)
            finalPayment.toResponse(
                clientSecret = paymentIntent.clientSecret
            )
        } catch (exception: DataIntegrityViolationException) {

            val existingPayment = findExistingPayment(orderId)
                ?: throw exception
            existingPayment.toResponse()

        }
    }



    @Transactional
    fun handlePaymentIntentSucceeded(
        paymentRequestId: UUID,
        stripePaymentIntentId: String,
    ): PaymentResponse {

        val payment = paymentRepository
            .findByPaymentRequestId(paymentRequestId)

            ?: throw IllegalStateException(
                "Payment not found for paymentRequestId: $paymentRequestId"
            )

        if (payment.status == PaymentStatus.SUCCESSFUL) {
            println(
                "Duplicate payment webhook ignored:" +
                        "paymentRequestId=$paymentRequestId"
            )
        } else {
            payment.status = PaymentStatus.SUCCESSFUL
            payment.stripePaymentIntentId = stripePaymentIntentId
            payment.updatedAt = Instant.now()

            paymentRepository.save(payment)
        }

        val order = orderRepository
            .findById(payment.orderId)
            .orElseThrow {
                OrderNotFoundException(payment.orderId)
            }

        if (order.status != OrderStatus.PAID) {

            order.status = OrderStatus.PAID
            order.updatedAt = Instant.now()

            orderRepository.save(order)
        }
        return payment.toResponse()
    }



    private fun findOrder(id: UUID): Order {

        return orderRepository.findById(id)
            .orElseThrow{
                OrderNotFoundException(id)
            }

    }


    private fun validatePaymentStatus(order: Order) {

        if (order.status != OrderStatus.PAYMENT_PENDING) {
            throw OrderCannotBePaidException(
                order.id,
                order.status
            )
        }

    }


    private fun findExistingPayment(orderId: UUID): Payment? {

        return paymentRepository.findByOrderId(orderId)

    }



    /*
        fun testStripeConnection() {
            val account = stripeClient
                .v1()
                .accounts()
                .retrieve("acct_1T20YIJIfyzwA66x")

            println("Stripe account: ${account.id}")
        }
    */






}