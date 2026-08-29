package org.example.toastorderapi

import com.stripe.StripeClient
import com.stripe.net.RequestOptions
import com.stripe.param.PaymentIntentCreateParams
import com.stripe.param.PaymentIntentSearchParams
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.Instant
import java.util.UUID

@Service
class StripePaymentProvider(
    private val stripeClient: StripeClient,
) : PaymentProvider {


    override fun createPaymentIntent(
        amount: BigDecimal,
        paymentRequestId: UUID
    ): PaymentIntentResponse {

        val amountInCents = amount
            .movePointRight(2)
            .longValueExact()

        val params = PaymentIntentCreateParams.builder()
            .setAmount(amountInCents)
            .setCurrency("usd")
            .setDescription("Dos Bros Tacos Order")
            .putMetadata(
                "payment_request_id",
                paymentRequestId.toString(),
                )
            .build()

        val requestOptions = RequestOptions.builder()
            .setIdempotencyKey(paymentRequestId.toString())
            .build()

        val stripeRequestSentAt = Instant.now()

        val paymentIntent = stripeClient
            .v1()
            .paymentIntents()
            .create(params, requestOptions)

        return PaymentIntentResponse(
            id = paymentIntent.id,
            clientSecret = paymentIntent.clientSecret,
            stripeRequestSentAt = stripeRequestSentAt,
        )
    }

    override fun retrievePaymentStatus(
        paymentRequestId: UUID
    ): PaymentStatus? {
        val params = PaymentIntentSearchParams.builder()
            .setQuery(
                "metadata['payment_request_id']: '$paymentRequestId'"
            )
            .setLimit(2L)
            .build()

        val results = stripeClient
            .v1()
            .paymentIntents()
            .search(params)

        if (results.data.isEmpty()) {
            return null
        }

        if (results.data.size > 1) {
            throw IllegalStateException(
                "Multiple payment intents found for paymentRequestId: $paymentRequestId"
            )
        }

        val paymentIntent = results.data[0]

        return when (paymentIntent.status) {
            "succeeded" -> PaymentStatus.SUCCESSFUL

            "processing" -> PaymentStatus.PROCESSING

            "requires_payment_method",
            "canceled" -> PaymentStatus.FAILED

            "requires_confirmation",
            "requires_action",
            "requires_capture" -> PaymentStatus.PENDING

            else -> PaymentStatus.PENDING
        }
    }
}