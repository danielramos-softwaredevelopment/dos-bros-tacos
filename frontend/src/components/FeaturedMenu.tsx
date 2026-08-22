"use client"

import { MenuItem } from "@/app/lib/content";
import MenuCard from "./menuCard";
import { useEffect, useRef, useState } from "react";

interface FeaturedMenuProps {
    featuredMenu: MenuItem[]
}

export default function FeaturedMenu({ featuredMenu }: FeaturedMenuProps) {

    const sectionRef = useRef<HTMLElement | null>(null)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const section = sectionRef.current

        if (!section) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.2
            }
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="bg-c-cream text-center p-10 overflow-hidden">
            <div className="space-y-10">
                <h2 className="text-5xl text-c-charcoal font-bold tracking-tight">Featured Menu</h2>

                <p className="text-3xl text-stone-700">Customer Favorites Made Fresh</p>

                <div className="grid gap-12 md:grid-cols-3">
                    {featuredMenu.map((menuItem, index) => (
                        <MenuCard
                            key={menuItem.id}
                            menuItem={menuItem}
                            featured={true}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}