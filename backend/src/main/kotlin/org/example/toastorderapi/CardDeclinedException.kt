package org.example.toastorderapi

import java.util.UUID

class CardDeclinedException(
    paymentRequestId: UUID
): RuntimeException(
    "Card declined for payment request $paymentRequestId"
)