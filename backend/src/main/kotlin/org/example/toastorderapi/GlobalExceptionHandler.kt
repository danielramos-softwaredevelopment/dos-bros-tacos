package org.example.toastorderapi

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(OrderNotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun handleOrderNotFound(
        exception: OrderNotFoundException
    ): ErrorResponse {
        return ErrorResponse(
            error = "ORDER_NOT_FOUND",
            message = exception.message ?: "Order not found"
        )
    }

    @ExceptionHandler(InvalidDeliveryWindowException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleInvalidDeliveryWindow(
        exception: InvalidDeliveryWindowException
    ): FieldErrorResponse {
        return FieldErrorResponse(
            message = exception.message,
            fieldErrors = exception.fieldErrors
        )
    }

    @ExceptionHandler(OrderCannotBeCancelledException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleOrderCannotBeCancelled(
        exception: OrderCannotBeCancelledException
    ): ErrorResponse{
        return ErrorResponse(
            error = "ORDER_CANNOT_BE_CANCELLED",
            message = exception.message ?: "Order cannot be canceled"
        )
    }

    @ExceptionHandler(OrderCannotBePaidException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleOrderCannotBePaid(
        exception: OrderCannotBePaidException
    ): ErrorResponse{
        return ErrorResponse(
            error = "ORDER_CANNOT_BE_PAID",
            message = exception.message ?: "Order cannot be not paid"
        )
    }

    @ExceptionHandler(PaymentNotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun handlePaymentNotFound(
        exception: PaymentNotFoundException
    ): ErrorResponse {
        return ErrorResponse(
            error = "PAYMENT_NOT_FOUND",
            message = exception.message ?: "Payment not found"
        )
    }

    @ExceptionHandler(CardDeclinedException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleCardDeclined(
        exception: CardDeclinedException
    ): ErrorResponse {
        return ErrorResponse(
            error = "CARD_DECLINED",
            message = exception.message ?: "Card declined"
        )
    }




}