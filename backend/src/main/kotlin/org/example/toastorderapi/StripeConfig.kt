package org.example.toastorderapi

import com.stripe.StripeClient
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class StripeConfig (
    @Value($$"${stripe.secret-key}")
    private val secretKey: String,

    @Value($$"${stripe.webhook-secret-key}")
    val webhookSecretKey: String,
) {
    @Bean
    fun stripeClient(): StripeClient {
        return StripeClient(secretKey)
    }

}