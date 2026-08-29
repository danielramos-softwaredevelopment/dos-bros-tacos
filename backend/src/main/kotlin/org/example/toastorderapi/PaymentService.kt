package org.example.toastorderapi

import org.springframework.stereotype.Service
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.transaction.annotation.Transactional
import java.time.Duration
import java.util.UUID
import java.time.Instant

@Service
class PaymentService (
    private val paymentRepository : PaymentRepository,
    private val orderRepository : OrderRepository,
    private val paymentProvider : PaymentProvider,
) {

    fun createPayment(orderId: UUID): PaymentResponse {
        val now = Instant.now()

        val existingPayment = findExistingPayment(orderId)

        if (existingPayment != null) {
            return existingPayment.toResponse()
        }

        val order = findOrder(orderId)
        validatePaymentStatus(order)
        val payment = Payment(
            id = UUID.randomUUID(),
            orderId = order.id,
            paymentRequestId = UUID.randomUUID(),
            status = PaymentStatus.PENDING,
            amount = order.total,
            stripePaymentIntentId = null,
            stripeRequestSentAt = null,
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
            savedPayment.stripeRequestSentAt = paymentIntent.stripeRequestSentAt
            savedPayment.updatedAt = Instant.now()

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

            ?: throw PaymentNotFoundException(
                id = paymentRequestId
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

        markOrderPaid(payment)
        return payment.toResponse()
    }


                        /*         HELPER FUNCTIONS            */



    @Transactional
    @Scheduled(fixedDelay = 60_000)
    fun reconcilePayments() {
        val payments = findPaymentsNeedingReconciliation()

        for (payment in payments) {
            if (payment.stripeRequestSentAt == null) {
                retryPaymentCreation(payment)
                continue
            }

            val stripeStatus = paymentProvider
                .retrievePaymentStatus(payment.paymentRequestId)

            updatePaymentFromStripeState(
                payment,
                stripeStatus
            )
        }
    }

    private fun retryPaymentCreation(
        payment: Payment
    ) {
        val paymentIntent = paymentProvider.createPaymentIntent(
            payment.amount,
            payment.paymentRequestId,
        )

        payment.stripePaymentIntentId = paymentIntent.id
        payment.stripeRequestSentAt = paymentIntent.stripeRequestSentAt
        payment.updatedAt = Instant.now()
        paymentRepository.save(payment)
    }
    private fun updatePaymentFromStripeState(
        payment: Payment,
        stripeStatus: PaymentStatus?
    ) {
        when (stripeStatus) {
            PaymentStatus.SUCCESSFUL -> {
                payment.status = PaymentStatus.SUCCESSFUL
                payment.updatedAt = Instant.now()
                paymentRepository.save(payment)

                markOrderPaid(payment)
            }

            PaymentStatus.PENDING,
            PaymentStatus.PROCESSING -> {
                return
            }

            PaymentStatus.FAILED -> {
                payment.status = PaymentStatus.FAILED
                payment.updatedAt = Instant.now()
                paymentRepository.save(payment)
            }

            null -> {
                retryPaymentCreation(payment)
                return
            }
            else -> return
        }
    }
    private fun findPaymentsNeedingReconciliation(): List<Payment> {
        val cutoff = Instant.now()
            .minus(Duration.ofMinutes(15))

        return paymentRepository.findPaymentsNeedingReconciliation(
            status = PaymentStatus.PENDING,
            cutoff = cutoff
        )
    }



    private fun markOrderPaid(
        payment: Payment
    ) {
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
                status = order.status,
                id = order.id
            )
        }
    }
    private fun findExistingPayment(orderId: UUID): Payment? {
        return paymentRepository.findByOrderId(orderId)
    }



    /*                              TEST FUNCTIONS

        fun testStripeConnection() {
            val account = stripeClient
                .v1()
                .accounts()
                .retrieve("acct_1T20YIJIfyzwA66x")

            println("Stripe account: ${account.id}")
        }
    */






}