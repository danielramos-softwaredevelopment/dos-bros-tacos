"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface StripeProviderProps {
    children: React.ReactNode
    clientSecret: string | null
}

export default function StripeProvider({
    children,
    clientSecret,
}: StripeProviderProps) {
    if (!clientSecret) {
        return <>{children}</>
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
        >
            {children}
        </Elements>
    )
}