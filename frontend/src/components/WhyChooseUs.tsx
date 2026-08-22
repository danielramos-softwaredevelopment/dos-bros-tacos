import { Feature } from "@/app/lib/content";
import FeatureCard from "./featureCard";

interface WhyChooseUsProps {
    features: Feature[]
}

export default function WhyChooseUs({ features }: WhyChooseUsProps) {
    return (
        <>
            <div className="py-10 bg-linear-to-t from-c-peach to-c-cream"></div>
                <section className="bg-c-peach text-center pt-10 pb-20 px-10">
                    <div className="space-y-10">
                        <h2 className="text-5xl text-c-charcoal font-bold tracking-tight">
                            Why Choose the Bros?
                        </h2>

                        <p className="text-3xl text-gray-700">
                            Big flavor, fresh ingredients, and catering that keeps the fiesta stress-free.
                        </p>

                        <div className="grid flex-1 gap-12 md:grid-cols-3">
                            {features.map((feature, index) => (
                                <FeatureCard
                                    key={feature.title}
                                    feature={feature}
                                    overlayPosition={index % 2 === 0 ? "top" : "bottom"}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            <div className="py-10 bg-linear-to-b from-c-peach to-c-cream"></div>
        </>
    )
}