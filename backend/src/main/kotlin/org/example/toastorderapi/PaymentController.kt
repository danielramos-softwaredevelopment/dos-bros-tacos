package org.example.toastorderapi

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI
import java.util.UUID

@RestController
@RequestMapping("/payments")
class PaymentController(
    private val paymentService: PaymentService,
) {

    @PostMapping("/{orderId}")
    fun createPayment(
        @PathVariable orderId: UUID
    ): ResponseEntity<PaymentResponse> {

        val payment = paymentService.createPayment(orderId)
        return ResponseEntity
            .created(URI.create("/payments/${payment.id}"))
            .body(payment)

    }
}