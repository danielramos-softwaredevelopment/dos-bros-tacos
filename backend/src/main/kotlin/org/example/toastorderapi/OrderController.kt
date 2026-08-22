package org.example.toastorderapi

import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.util.UUID

@RestController
@RequestMapping("/orders")
class OrderController(
    private val orderService: OrderService
){
    @PostMapping
    fun createOrder(
        @Valid
        @RequestBody
        request: CreateOrderRequest
    ): ResponseEntity<OrderResponse> {

        val response = orderService.createOrder(request)

        val location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(response.id)
            .toUri()

        return ResponseEntity
            .created(location)
            .body(response)
    }

    @PatchMapping("/{id}/cancel")
    fun cancelOrder(
        @PathVariable id: UUID
    ): OrderResponse {
        return orderService.cancelOrder(id)
    }

    @GetMapping("/{id}")
    fun getOrder(
        @PathVariable
        id: UUID
    ): OrderResponse {
        return orderService.getOrder(id)
    }



}