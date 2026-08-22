"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { OrderResponse } from "@/app/lib/content"
import Button from "@/components/button"

export default function CheckoutSuccessPage() {
    const [order, setOrder] = useState<OrderResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const orderId = params.get("orderId")

        if (!orderId) {
            setError(true)
            setLoading(false)
            return
        }

        let attempts = 0
        const maxAttempts = 30

        async function fetchOrder() {
            try {
                const response = await fetch(
                    `http://localhost:8080/orders/${orderId}`,
                    {
                        cache: "no-store",
                    }
                )

                if (!response.ok) {
                    throw new Error("Failed to retrieve order")
                }

                const data: OrderResponse = await response.json()

                console.log("Order Status:", data.status)

                setOrder(data)

                if (data.status === "PAID") {
                    setLoading(false)
                    return
                }

                attempts++

                if (attempts >= maxAttempts) {
                    setError(true)
                    setLoading(false)
                    return
                }

                setTimeout(fetchOrder, 1000)

            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [])

    if (loading) {
        return (
            <main className="min-h-screen bg-c-cream flex items-center justify-center px-6">
                <div className="max-w-lg text-center">
                    <div className="text-6xl mb-6">
                        🌮
                    </div>

                    <h1 className="text-4xl font-bold text-c-burgundy">
                        Confirming Your Order...
                    </h1>

                    <p className="mt-4 text-lg text-c-charcoal/70">
                        Just making sure everything went through.
                    </p>
                </div>
            </main>
        )
    }

    if (error || !order) {
        return (
            <main className="min-h-screen bg-c-cream flex items-center justify-center px-6">
                <div className="max-w-lg text-center">
                    <div className="text-6xl mb-6">
                        🌮
                    </div>

                    <h1 className="text-4xl font-bold text-c-burgundy">
                        We Couldn't Find Your Order
                    </h1>

                    <p className="mt-4 text-lg text-c-charcoal/70">
                        Your payment may have gone through, but we
                        couldn't retrieve your order information.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex mt-8 rounded-xl bg-c-burgundy px-6 py-3 font-bold text-white"
                    >
                        Back to Dos Bros
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-c-cream px-6 py-20">
            <div className="max-w-2xl mx-auto">

                {/* Success Header */}

                <div className="text-center">
                    <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-c-burgundy shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="h-12 w-12 text-c-cream"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m5 12 4 4L19 7"
                            />
                        </svg>
                    </div>

                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-c-terracotta">
                        Order Confirmed
                    </p>

                    <h1 className="mt-3 text-5xl font-black tracking-tight text-c-burgundy">
                        You're All Set!
                    </h1>

                    <p className="mt-5 text-lg text-c-charcoal/70">
                        Thanks, {order.customerName}! Your order has
                        been successfully placed.
                    </p>
                </div>


                {/* Order Card */}

                <div className="mt-10 rounded-3xl border-2 border-c-terracotta/20 bg-white p-8 shadow-xl">

                    {/* Order ID + Status */}

                    <div className="flex flex-col gap-4 border-b border-c-charcoal/10 pb-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-c-charcoal/50">
                                Order ID
                            </p>

                            <p className="mt-1 break-all font-mono text-sm font-bold text-c-burgundy">
                                {order.id}
                            </p>
                        </div>

                        <div className="rounded-full bg-c-peach px-4 py-2 text-sm font-bold text-c-burgundy">
                            {order.status}
                        </div>
                    </div>


                    {/* Customer Information */}

                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-c-burgundy">
                            Customer Information
                        </h2>

                        <div className="mt-4 space-y-2 text-c-charcoal">
                            <p>
                                <span className="font-semibold">
                                    Name:
                                </span>{" "}
                                {order.customerName}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Email:
                                </span>{" "}
                                {order.customerEmail}
                            </p>

                            <p>
                                <span className="font-semibold">
                                    Phone:
                                </span>{" "}
                                {order.customerPhone}
                            </p>
                        </div>
                    </div>


                    {/* Delivery Information */}

                    <div className="mt-8 border-t border-c-charcoal/10 pt-8">
                        <h2 className="text-xl font-bold text-c-burgundy">
                            Delivery
                        </h2>

                        <div className="mt-4">
                            <p className="font-semibold text-c-charcoal">
                                {order.deliveryDate}
                            </p>

                            <p className="text-c-charcoal/70">
                                {order.deliveryTime}
                            </p>
                        </div>
                    </div>


                    {/* Payment Summary */}

                    <div className="mt-8 border-t border-c-charcoal/10 pt-8">
                        <h2 className="text-xl font-bold text-c-burgundy">
                            Payment Summary
                        </h2>

                        <div className="mt-4 space-y-3">

                            <div className="flex justify-between">
                                <span className="text-c-charcoal/70">
                                    Subtotal
                                </span>

                                <span className="font-semibold">
                                    ${order.subtotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-c-charcoal/70">
                                    Tax
                                </span>

                                <span className="font-semibold">
                                    ${order.tax.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between border-t border-c-charcoal/10 pt-4 text-xl">
                                <span className="font-bold text-c-burgundy">
                                    Total
                                </span>

                                <span className="font-black text-c-burgundy">
                                    ${order.total.toFixed(2)}
                                </span>
                            </div>

                        </div>
                    </div>

                </div>


                {/* Closing Message */}

                <div className="mt-8 rounded-2xl bg-c-peach/70 px-6 py-5 text-center">
                    <p className="text-lg text-c-charcoal/80">
                        🌮 Thanks for ordering from{" "}
                        <span className="font-bold text-c-burgundy">
                            Dos Bros Tacos
                        </span>
                        !
                    </p>

                    <p className="mt-1 text-c-charcoal/60">
                        We're getting everything ready for you.
                    </p>
                </div>


                {/* Return Home */}

                <div className="mt-8 text-center">
                    <Button
                        variant="primary"
                        href="/"
                    >
                        Back to Dos Bros →
                    </Button>
                </div>

            </div>
        </main>
    )
}