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
            message = "Order not found for order id: ${exception.id}"
        )
    }

    @ExceptionHandler(MenuItemNotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun handleMenuItemNotFound(
        exception: MenuItemNotFoundException
    ): ErrorResponse {
        return ErrorResponse(
            error = "MENU_ITEM_NOT_FOUND",
            message = "Menu item not found for menu item id: ${exception.menuItemId}"
        )
    }

    @ExceptionHandler(EmptyOrderItemsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleEmptyOrderItems(
        exception: EmptyOrderItemsException
    ): ErrorResponse {
        return ErrorResponse(
            error = "EMPTY_ORDER_ITEMS",
            message = "Order items cannot be empty"
        )
    }

    @ExceptionHandler(InvalidItemQuantityException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleInvalidItemQuantity(
        exception: InvalidItemQuantityException
    ): ErrorResponse {
        return ErrorResponse(
            error = "INVALID_ITEM_QUANTITY",
            message = "Item quantity cannot be less than 1"
        )
    }

    @ExceptionHandler(InvalidDeliveryWindowException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleInvalidDeliveryWindow(
        exception: InvalidDeliveryWindowException
    ): FieldErrorResponse {
        return FieldErrorResponse(
            fieldErrors = exception.fieldErrors,
            message = "Please correct the highlighted fields"
        )
    }

    @ExceptionHandler(OrderCannotBeCancelledException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleOrderCannotBeCancelled(
        exception: OrderCannotBeCancelledException
    ): ErrorResponse{
        return ErrorResponse(
            error = "ORDER_CANNOT_BE_CANCELLED",
            message = "Order: ${exception.id} cannot be cancelled"
        )
    }

    @ExceptionHandler(OrderCannotBePaidException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleOrderCannotBePaid(
        exception: OrderCannotBePaidException
    ): ErrorResponse{
        return ErrorResponse(
            error = "ORDER_CANNOT_BE_PAID",
            message = "Order: ${exception.id} cannot be paid because its status is: ${exception.status}"
        )
    }

    @ExceptionHandler(PaymentNotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun handlePaymentNotFound(
        exception: PaymentNotFoundException
    ): ErrorResponse {
        return ErrorResponse(
            error = "PAYMENT_NOT_FOUND",
            message = "Payment not found for id: ${exception.id}"
        )
    }

    @ExceptionHandler(CardDeclinedException::class)
    @ResponseStatus(HttpStatus.CONFLICT)
    fun handleCardDeclined(
        exception: CardDeclinedException
    ): ErrorResponse {
        return ErrorResponse(
            error = "CARD_DECLINED",
            message = "Card declined for order: ${exception.id}"
        )
    }




}