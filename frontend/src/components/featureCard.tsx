import { Feature } from "@/app/lib/content"

interface FeatureCardProps {
    feature: Feature
    overlayPosition: "top" | "bottom"
}

export default function FeatureCard({
    feature,
    overlayPosition
}: FeatureCardProps) {

    return (
        <div className="relative bg-cover min-h-80 bg-center p-6 rounded-2xl shadow-md text-center hover:shadow-xl
                hover:-translate-y-3 transition-all duration-200"
            style={{ backgroundImage: `url(${feature.image})` }}
        >
            <div className={`absolute left-0 right-0 h-20 bg-black/60 px-4 rounded-2xl
                    flex items-center justify-center
                ${
                overlayPosition === "top" ? "top-0" : "bottom-0"
                }
                `}>

                <h3 className="text-3xl text-amber-50 font-bold">{feature.title}</h3>
            </div>
        </div>
    )
}