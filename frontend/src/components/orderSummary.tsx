"use client"

import { useCart } from "@/app/cart/useCart"
import Button from "./button"
import Image from "next/image"

interface OrderSummaryProps {
    onCheckout: () => void
}

export default function OrderSummary({ onCheckout }: OrderSummaryProps) {


    const {
        cartItems,
        addItem,
        removeItem,
        clearCart
    } = useCart()

    return (
        <div className="w-full max-w-2xl mx-auto bg-c-cream text-c-charcoal rounded-2xl p-10 space-y-10 border-3 border-c-terracotta">

            <h2 className="text-3xl font-bold">Order Summary</h2>

            {cartItems.length === 0 ? (
                <div className="py-10 space-y-5 text-center">
                    <p className="text-5xl">
                        🌮
                    </p>

                    <h3 className="text-2xl font-bold text-c-burgundy">
                        Your Cart is Empty
                    </h3>

                    <p className="text-c-charcoal">
                        Add Some Tacos to Get the Party Started
                    </p>

                    <Button
                        variant="secondary"
                        href="/menu"
                    >
                        Menu
                    </Button>
                </div>
            ) : (
                <div className="space-y-5">
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            className="flex items-center gap-5 bg-c-peach rounded-xl p-4"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={50}
                                height={50}
                                className="object-cover rounded-lg"
                            />

                            <div className="flex-1 text-left space-y-3 p-1">
                                <h3 className="text-xl font-bold">
                                    {item.title}
                                </h3>

                                <div className="space-x-2">
                                    <Button
                                        variant="quantity"
                                        onClick={() => removeItem(item)}
                                    >
                                        -
                                    </Button>

                                    <span className="min-w-6 text-center font-semibold">
                                        {item.quantity}
                                    </span>

                                    <Button
                                        variant="quantity"
                                        onClick={() => addItem(item)}
                                    >
                                        +
                                    </Button>
                                    
                                </div>
                            </div>

                            <p>
                                ${(item.quantity)*(item.price)}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <>
                    <div className="border-t-2 border-dashed border-c-charcoal/30 pt-5">
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-semibold">
                                Subtotal
                            </span>

                            <span>
                                ${cartItems.reduce((total, item) =>
                                total + item.price * item.quantity, 0).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="secondary"
                        onClick={onCheckout}
                    >
                        Continue to Checkout
                    </Button>
                </>
            )}
        </div>

    )
}