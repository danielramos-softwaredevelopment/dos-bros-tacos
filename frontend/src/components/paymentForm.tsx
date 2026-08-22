"use client"

import {
    PaymentElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js"
import React from "react"
import Button from "./button"

interface PaymentFormProps {
    orderId: string
}

export default function PaymentForm({ orderId }: PaymentFormProps) {
    const elements = useElements()
    const stripe = useStripe()



    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success?orderId=${orderId}`
            },
        })

        if (error) {
            console.error(error.message)
        }
    }



    return (
        <div className="w-full max-w-2xl mx-auto bg-c-cream text-c-charcoal rounded-2xl shadow-xl p-10 space-y-8
                        border-3 border-c-terracotta flex flex-col">
            <div className="space-y-3">
                <h2 className="text-2xl font-bold text-c-burgundy">Payment</h2>

                <p className="text-sm text-c-charcoal/70 ">Enter your payment information</p>

                <p className="">*   IN TEST MODE    *</p>

                <p className="text-sm text-c-charcoal/70">ENTER CARD NUMBER: 4242424242424242</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto w-full flex flex-col flex-1"
            >
                <div className="">
                    <PaymentElement />
                </div>

                <div className="flex justify-center pt-6">
                    <Button
                            variant="primary"
                        >
                            Pay
                    </Button>
                </div>
            </form>
        </div>
    )
}