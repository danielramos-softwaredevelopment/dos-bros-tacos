"use client"

import { CartProvider } from "./cart/cart-context"

interface ProvidersProps {
    children: React.ReactNode
}

export default function({ children }: ProvidersProps) {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    )
}