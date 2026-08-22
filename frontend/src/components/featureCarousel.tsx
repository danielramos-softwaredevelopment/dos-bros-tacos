"use client"

import { Feature } from "@/app/lib/content"
import FeatureCard from "./featureCard"
import { useState } from "react"

interface FeatureCarouselProps {
    features: Feature[]

}

export default function FeatureCarousel({ features }: FeatureCarouselProps) {

    const [startIndex, setStartIndex] = useState(0)
    const visibleFeatures = features.slice(startIndex, startIndex + 3)

    const handleNext = () => {
        if (startIndex < features.length - 3) {
        setStartIndex(startIndex + 1)
        }
    }

    const handlePrevious = () => {
        if (startIndex)
        setStartIndex(startIndex - 1)
    }

    return (
        <div className="flex items-center justify-center gap-6">

            <button
                onClick={handlePrevious}
                disabled={startIndex === 0}
                className="text-black
                            hover:cursor-pointer"
            >
                ←
            </button>

            <div className="grid flex-1 gap-12 md:grid-cols-3">
                {visibleFeatures.map((feature, index) => (
                    <FeatureCard
                        key={feature.title}
                        feature={feature}
                        overlayPosition={index % 2 === 0 ? "top" : "bottom"}
                    />
                ))}
            </div>

            <button
                onClick={handleNext}
                disabled={startIndex >= features.length - 3}
                className="text-black
                            hover:cursor-pointer"
            >
                →
            </button>

        </div>
    )
}