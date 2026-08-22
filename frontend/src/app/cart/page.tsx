"use client"

import { useState } from "react";
import { OrderResponse } from "../lib/content";

import CheckoutForm from "@/app/checkout/checkoutForm";
import OrderConfirmation from "@/components/orderConfirmation";
import OrderSummary from "@/components/orderSummary";
import StripeProvider from "@/components/stripeProvider";
import PaymentForm from "@/components/paymentForm";



export default function Cart() {

    const [order, setOrder] = useState<OrderResponse | null>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [showCheckout, setShowCheckout] = useState(false)
    const [showPayment, setShowPayment] = useState(false)



    return (
        <>
            <main className="space-y-10 py-20">
                <h1 className="text-5xl text-center font-bold leading-tight">Your Order</h1>
            
                <div className="text-center">
                    {!order && !showCheckout && (
                        <OrderSummary
                            onCheckout={() => setShowCheckout(true)}
                        />
                    )}

                    {!order && showCheckout && (
                        <CheckoutForm
                            setClientSecret={setClientSecret}
                            onCreatedOrder={setOrder}
                        />
                    )}

                    {order && !showPayment && (
                        <OrderConfirmation
                            order={order}
                            onPayment={() => setShowPayment(true)}
                        />
                    )}

                    {order && showPayment && clientSecret && (
                        <StripeProvider clientSecret={clientSecret}>
                            <PaymentForm orderId={order.id}/>
                        </StripeProvider>
                    )}
                </div>
            </main>
        </>
    )
}