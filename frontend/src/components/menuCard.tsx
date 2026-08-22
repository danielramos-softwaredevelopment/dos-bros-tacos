"use client"

import { MenuItem } from "@/app/lib/content";
import { useCart } from "@/app/cart/useCart"
import Image from "next/image";
import Button from "./button";

interface MenuCardProps {
    menuItem: MenuItem
    className?: string
    featured?: boolean
    index?: number
    isVisible?: boolean
}

export default function MenuCard({
    menuItem,
    className,
    featured = false,
    index,
    isVisible = false
}: MenuCardProps) {

    const {
        cartItems,
        addItem,
        removeItem
    } = useCart()

    const cartItem = cartItems.find(item =>
        item.id === menuItem.id
    )

    const quantity = cartItem?.quantity ?? 0

    const featuredAnimation =
        index === 0
            ? "animate-featured-from-right"
            : index === 1
                ? "animate-featured-from-top"
                : "animate-featured-from-left"



    return featured ? (
        <div className={`group perspective-[1000px] ${
                isVisible ? featuredAnimation : ""
            }`}
        >
            <div className="relative h-96 w-full duration-600 transform-3d rounded-2xl transition-all
                            group-hover:transform-[translateY(-1rem)_rotateY(180deg)]
                            group-hover:shadow-2xl">

                {/* FRONT */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden">
                    <Image
                        alt={menuItem.title}
                        src={menuItem.image}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* BACK */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-white p-6 flex flex-col justify-center
                                items-center space-y-5 backface-hidden
                                transform-[rotateY(180deg)]"
                >
                    <h3 className="text-2xl text-gray-900 font-bold">
                        {menuItem.title}
                    </h3>

                    <p className="text-lg text-gray-600 whitespace-pre-line">
                        {menuItem.description}
                    </p>

                    <p className="text-xl text-gray-600">
                        ${menuItem.price.toFixed(2)}
                    </p>

                    <div className="space-x-10">
                        <Button
                            onClick={() => removeItem(menuItem)}
                            variant="menu"
                        >
                            -
                        </Button>

                        <span className="text-3xl text-gray-600 font-bold">
                            {quantity}
                        </span>

                        <Button
                            onClick={() => addItem(menuItem)}
                            variant="menu"
                        >
                            +
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    ) : (

        <div className={`group relative h-96 bg-white rounded-2xl shadow-md text-center space-y-5
                        hover:shadow-xl hover:-translate-y-3 transition-all duration-200 ${className}`}>

            <Image
                alt={menuItem.title}
                src={menuItem.image} fill
                className="object-cover rounded-2xl transition-opacity duration-300
                            group-hover:opacity-0"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center rounded-2xl
                            space-y-5 p-6 bg-white opacity-0 group-hover:opacity-100 transition"
            >
                <h3 className="text-2xl text-gray-900 font-bold">{menuItem.title}</h3>

                <p className="text-lg text-gray-600 whitespace-pre-line">{menuItem.description}</p>

                <p className="text-xl text-gray-600">${menuItem.price.toFixed(2)}</p>

                <div className="space-x-10">
                    <Button
                        onClick={() => removeItem(menuItem)}
                        variant="menu"
                    >
                        -
                    </Button>

                    <span className="text-3xl text-gray-600 font-bold">
                        {quantity}
                    </span>

                    <Button
                        onClick={() => addItem(menuItem)}
                        variant="menu"
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    )
}