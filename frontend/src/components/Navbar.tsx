"use client"

import { useCart } from "@/app/cart/useCart"
import { site } from "@/app/lib/site"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Navbar() {

    const [isScrolled, setIsScrolled] = useState(false)

    const { cartItems } = useCart()

    const cartCount = cartItems.reduce(
        (count, item) => count + item.quantity,
        0
    )

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])



    return (
    <div className={`
        fixed top-0 z-50 w-full flex justify-between items-center backdrop-blur-lg px-5 bg-c-terracotta/60 text-gray-50
        transition-all duration-300 ease-out
        ${isScrolled ? "py-1" : "py-2"}
        `}
    >
        <nav className={`
            transition-all duration-300 ease-out
            ${isScrolled ? "text-3xl" : "text-5xl"}
            `}
        >
            <Link href="/">{site.name}</Link>
        </nav>

        <nav className="space-x-10">
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart ({cartCount})</Link>
        </nav>
    </div>
    )
}