package org.example.toastorderapi

import com.stripe.net.Webhook
import com.stripe.model.PaymentIntent
import com.stripe.exception.SignatureVerificationException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/webhooks")
class StripeWebhookController(
    private val stripeConfig: StripeConfig,
    private val paymentService: PaymentService,
) {

    @PostMapping("/stripe")
    fun handleStripeWebhook(
        @RequestBody payload: String,
        @RequestHeader("Stripe-Signature") signature: String,
    ): ResponseEntity<String> {
        val event = try {
            Webhook.constructEvent(
                payload,
                signature,
                stripeConfig.webhookSecretKey,
            )
        } catch (exception: SignatureVerificationException) {
            return ResponseEntity
                .status(400)
                .body("Invalid Stripe Signature")
        }

        when (event.type) {
            "payment_intent.succeeded" -> {
                val paymentIntent = event
                    .data
                    .`object`
                    .let { it as PaymentIntent
                    }

                val paymentRequestId =
                    paymentIntent.metadata["payment_request_id"]
                        ?: throw IllegalStateException(
                            "Missing payment_request_id in Stripe PaymentIntent ${paymentIntent.id}"
                        )

                val paymentRequestUuid = UUID.fromString(paymentRequestId)

                paymentService.handlePaymentIntentSucceeded(
                    paymentRequestId = paymentRequestUuid,
                    stripePaymentIntentId = paymentIntent.id,
                )

                println("Payment succeeded: ${paymentIntent.id}")
            }
        }

        return ResponseEntity.ok("OK")
    }
}