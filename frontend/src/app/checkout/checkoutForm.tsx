"use client"

import { useCart } from "@/app/cart/useCart"
import { OrderResponse, PaymentResponse } from "@/app/lib/content"
import Button from "@/components/button"
import { useState } from "react"

interface CheckoutFormProps {
    onCreatedOrder: (order: OrderResponse) => void
    setClientSecret: (clientSecret: string | null) => void
}


export default function CheckoutForm({
    onCreatedOrder,
    setClientSecret
}: CheckoutFormProps) {

    const { cartItems } = useCart()

    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const [fieldErrors, setFieldErrors] = useState<{
        deliveryDate?: string
        deliveryTime?: string
    }>({})

    const API_URL = process.env.NEXT_PUBLIC_API_URL



    async function createPayment(orderId: string): Promise<PaymentResponse> {
        const response = await fetch(
            `${API_URL}/payments/${orderId}`,
            {
                method: "POST",
            }
        )

        if (!response.ok) {
            throw new Error("Failed to create payment")
        }

        return response.json()
    }

    

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        setError(null)
        setFieldErrors({})
        setIsLoading(true)

        try{
            const formData = new FormData(event.currentTarget)

            const orderRequest = {
                customerName: formData.get("name"),
                customerPhone: formData.get("phone"),
                customerEmail: formData.get("email"),
                restaurantId: 1,
                deliveryDate: formData.get("deliveryDate"),
                deliveryTime: formData.get("deliveryTime"),
                items: cartItems.map(item => ({
                    menuItemId: item.id,
                    quantity: item.quantity
                }))
            }

            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderRequest)
            })

            if (!response.ok) {
                const error = await response.json()

                setFieldErrors(error.fieldErrors ?? {})

                throw new Error(error.message)
            }



            const data: OrderResponse = await response.json()
            const payment = await createPayment(data.id)

            if (!payment.clientSecret) {
                throw new Error(
                    "PaymentIntent did not return a client secret"
                )
            }

            setClientSecret(payment.clientSecret)

            console.log("Order:", data)
            console.log("Payment:", payment)

            onCreatedOrder(data)
        } catch (error) {
            console.error("Checkout failed:", error)

            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError(
                    "Please enter a valid date and time"
                )
            }
        } finally {
            setIsLoading(false)
        }
    }



    return (

        <div className="w-full max-w-2xl mx-auto bg-c-cream text-c-charcoal rounded-2xl shadow-xl border-3 border-c-terracotta
                        p-8 md:p-10 space-y-8">

            <div className="space-y-2 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-c-burgundy tracking-tight">
                    Checkout
                </h2>

                <p className="text-lg text-c-charcoal/70">
                    Just Tell Us When and Where to Deliver.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >
                <div className="bg-c-peach rounded-xl p-6 space-y-5">
                    <h3 className="text-2xl font-bold text-c-burgundy">
                        Customer Information
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-c-charcoal/80"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full rounded-lg border-2 border-c-charcoal/10 bg-c-cream px-4 py-3 text-lg text-c-charcoal
                                            outline-none transition-all duration-200
                                            focus:border-c-terracotta focus:ring-2 focus:ring-c-terracotta/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-semibold text-c-charcoal/80"
                            >
                                Phone
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="w-full rounded-lg border-2 border-c-charcoal/10 bg-c-cream px-4 py-3 text-lg text-c-charcoal
                                            outline-none transition-all duration-200
                                            focus:border-c-terracotta focus:ring-2 focus:ring-c-terracotta/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-c-charcoal/80"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full rounded-lg border-2 border-c-charcoal/10 bg-c-cream px-4 py-3 text-lg text-c-charcoal
                                            outline-none transition-all duration-200
                                            focus:border-c-terracotta focus:ring-2 focus:ring-c-terracotta/20"
                            />
                        </div>
                    </div>
                </div>


                <div className="bg-c-peach rounded-xl p-6 space-y-5">
                    <h3 className="text-2xl font-bold text-c-burgundy">
                        Delivery Window
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label
                                htmlFor="deliveryDate"
                                className="block text-sm font-semibold text-c-charcoal/80"
                            >
                                Date
                            </label>

                            <input
                                id="deliveryDate"
                                name="deliveryDate"
                                type="date"
                                required
                                onChange={() => {
                                    setFieldErrors(prev => ({
                                        ...prev,
                                        deliveryDate: undefined
                                    }))
                                }}
                                className={`w-full rounded-lg border-2 px-4 py-3 text-lg text-c-charcoal
                                    outline-none transition-all duration-200
                                    ${
                                        fieldErrors.deliveryDate
                                            ? "border-red-500 bg-red-100 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                            : "border-c-charcoal/10 bg-c-cream focus:border-c-terracotta focus:ring-2 focus:ring-c-terracotta/20"
                                }`}
                            />

                            {fieldErrors.deliveryDate && (
                                <p className="text-sm font-semibold text-red-600">
                                    {fieldErrors.deliveryDate}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="deliveryTime"
                                className="block text-sm font-semibold text-c-charcoal/80"
                            >
                                Time
                            </label>

                            <input
                                id="deliveryTime"
                                name="deliveryTime"
                                type="time"
                                required
                                onChange={() => {
                                    setFieldErrors(prev => ({
                                        ...prev,
                                        deliveryTime: undefined
                                    }))
                                }}
                                className={`w-full rounded-lg border-2 px-4 py-3 text-lg text-c-charcoal
                                    outline-none transition-all duration-200
                                    ${
                                        fieldErrors.deliveryTime
                                            ? "border-red-500 bg-red-100 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                            : "border-c-charcoal/10 bg-c-cream focus:border-c-terracotta focus:ring-2 focus:ring-c-terracotta/20"
                                }`}
                            />

                            {fieldErrors.deliveryTime && (
                                <p className="text-sm font-semibold text-red-600">
                                    {fieldErrors.deliveryTime}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {error && (
                    <div
                        className="rounded-lg border-2 border-red-500/30 bg-red-100 px-4 py-3 text-center text-red-700"
                    >
                        {error}
                    </div>
                )}

                <div className="flex justify-center pt-2">
                    <Button
                        variant="secondary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-3">
                                <span className="h-5 w-5 rounded-full border-3 border-dashed border-c-burgundy/30 border-t-c-burgundy animate-spin"/>

                                Processing...
                            </span>
                            
                        ) : (
                            "Place Order →"
                        )}
                    </Button>
                </div>
            </form>
        </div>

    )
}