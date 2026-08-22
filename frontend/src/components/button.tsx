"use client"

import Link from "next/link"
import { useRef } from "react"

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "hero" | "cta" | "primary" | "secondary" | "quantity" | "menu"
    href?: string
    children: React.ReactNode
}

export default function Button({
    children,
    variant = "primary",
    href,
    ...buttonProps
}: ButtonProps) {

    const buttonRef = useRef<HTMLElement>(null)

    const handleMouseMove = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        if (!buttonRef.current) {
            return
        }

        const rect = buttonRef.current.getBoundingClientRect()

        const x =
            event.clientX -
            (rect.left + rect.width / 2)

        const y =
            event.clientY -
            (rect.top + rect.height / 2)

        const strength = 0.50

        buttonRef.current.style.transform =
            `translate(${x * strength}px, ${y * strength}px)`
    }

    const handleMouseLeave = () => {
        if (!buttonRef.current) {
            return
        }

        buttonRef.current.style.transform =
            "translate(0, 0)"
    }

    const variantStyles = {
        hero: "px-6 py-3 bg-amber-600 text-2xl text-c-cream hover:bg-amber-700/50 hover:text-c-charcoal hover:border-2 hover:border-c-golden",

        cta: "px-6 py-3 bg-amber-600 text-2xl text-c-cream hover:bg-amber-600/70 hover:text-c-terracotta hover:border-2 hover:border-c-terracotta",

        primary: "px-6 py-3 bg-amber-600 text-2xl text-c-cream border-2 border-transparent hover:scale-105 hover:bg-amber-600/50 hover:text-c-terracotta hover:border-c-terracotta active:scale-95",

        secondary: "px-6 py-3 bg-c-peach text-2xl text-c-burgundy border-2 border-transparent hover:scale-105 hover:border-c-burgundy active:scale-100",

        menu: "px-6 py-3 bg-amber-600 text-xl text-c-cream hover:bg-amber-700 active:scale-95",

        quantity: "px-3 py-1 bg-c-cream text-xl active:scale-95"
}

    const className = `
        rounded-lg
        font-semibold
        shadow-md
        transition-[transform,box-shadow,background-color,color,border-color]
        duration-200

        hover:shadow-xl
        hover:cursor-pointer

        ${variantStyles[variant]}
    `

    const isMagnetic = 
        variant === "hero" ||
        variant === "cta"



    if (href) {
        return (
            <Link
                ref={buttonRef as React.Ref<HTMLAnchorElement>}
                href={href}
                className={`${className} inline-block group`}
                onMouseMove={isMagnetic ? handleMouseMove : undefined}
                onMouseLeave={isMagnetic ? handleMouseLeave : undefined}
            >
                <span className="relative inline-block">
                    {children}

                    {variant === "cta" && (
                        <span
                            aria-hidden={true}
                            className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-transparent overflow-hidden"
                        >
                            <span className="absolute inset-y-0 left-0 w-60 bg-c-cream animate-cta-line transition-colors duration-300 ease-in-out group-hover:bg-c-terracotta" />
                        </span>
                    )}
                </span>
            </Link>
        )
    }

    return (
        <button
            ref={buttonRef as React.Ref<HTMLButtonElement>}
            className={className}
            onMouseMove={isMagnetic ? handleMouseMove : undefined}
            onMouseLeave={isMagnetic ? handleMouseLeave : undefined}
            {...buttonProps}
        >
            {children}
        </button>
    )
}