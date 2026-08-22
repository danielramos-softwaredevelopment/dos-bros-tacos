import { OrderResponse } from "@/app/lib/content"
import Button from "./button"

interface OrderConfirmationProps {
    order: OrderResponse
    onPayment: () => void 
}

export default function OrderConfirmation({
    order,
    onPayment,
}: OrderConfirmationProps) {

    const deliveryDate = new Date(`${order.deliveryDate}T00:00:00`)
    const formattedDate = deliveryDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    const deliveryTime = new Date(`1970-01-01T${order.deliveryTime}`)
    .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    })



    return (
        <div className=" h-225 w-full max-w-2xl mx-auto bg-c-cream text-c-charcoal rounded-2xl shadow-xl p-10 space-y-8
                        border-3 border-c-terracotta">
            <h2 className="text-5xl font-bold text-c-burgundy tracking-tight">
                🌮 Order Confirmation
            </h2>
            
            <p className="text-2xl text-c-charcoal/80">
                Please review Delivery and Total
            </p>

            <div className="bg-c-peach rounded-xl p-5 space-y-2">
                <p className="text-sm tracking-wider text-c-charcoal/60">
                    ORDER NUMBER
                </p>

                <p className="text-xl font-semibold text-c-charcoal">
                    #{order.id}
                </p>

                <p className="text-sm text-c-charcoal/70">
                    Payment Required to Complete Your Order
                </p>
            </div>

            <div className="bg-c-peach rounded-xl p-5 space-y-2">
                <p className="text-sm tracking-wider text-c-charcoal/60">
                    DELIVERY
                </p>

                <p className="text-2xl font-semibold text-c-charcoal">
                    {formattedDate}
                </p>

                <p className="text-lg text-c-charcoal/70">
                    {deliveryTime}
                </p>
            </div>

            <div className="bg-c-peach rounded-xl p-5 space-y-3">
                <p className="text-sm tracking-wider text-c-charcoal/60">
                    ORDER TOTAL
                </p>

                <div className="flex justify-between text-lg text-c-charcoal/70">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-lg text-c-charcoal/70">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-c-charcoal/20 pt-3 flex justify-between text-2xl font-bold">
                    <span className="text-c-charcoal">
                        Total
                    </span>

                    <span className="text-c-burgundy">
                        ${order.total.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="space-y-5">
                <p>
                    Complete payment to confirm your order.
                </p>

                <Button
                    variant="primary"
                    onClick={onPayment}
                >
                    Payment →
                </Button>
            </div>
        </div>
    )
}