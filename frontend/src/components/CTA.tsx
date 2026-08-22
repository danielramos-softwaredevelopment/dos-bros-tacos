import { CTAContent } from "@/app/lib/content";
import Link from "next/link";
import Button from "./button";

interface CTAProps {
    content: CTAContent
}

export default function CTA({ content }: CTAProps) {
    return (
        <section className="min-h-80 bg-c-cream text-center space-y-10 p-10">

            <h2 className="text-5xl text-c-charcoal font-bold leading-tight">{content.heading}</h2>
            <p className="text-3xl text-gray-700">{content.description}</p>

            <Button
                variant="cta"
                href={content.buttonLink}
            >
                <span className="relative z-10">
                    {content.buttonText}
                </span>
            </Button>

        </section>
    )
}