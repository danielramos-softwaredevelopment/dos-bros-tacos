package org.example.toastorderapi

import com.stripe.StripeClient
import com.stripe.param.PaymentIntentCreateParams
import org.springframework.stereotype.Service
import java.math.BigDecimal
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

        val paymentIntent = stripeClient
            .v1()
            .paymentIntents()
            .create(params)

        return PaymentIntentResponse(
            id = paymentIntent.id,
            clientSecret = paymentIntent.clientSecret,
        )
    }
}