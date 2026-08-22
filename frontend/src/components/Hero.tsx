import { HeroContent } from "@/app/lib/content";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";

interface HeroProps { content: HeroContent }

export default function Hero({ content }: HeroProps) {
    return (
        <section className="min-h-screen relative py-32 px-10 bg-[url('/taco-wallpaper-orange-red.jpg')] flex items-center">

            <div className="absolute inset-0 bg-linear-to-r from-white/50 to-black/50"></div>
            
            <div className="relative min-h-100 z-10 grid gap-12 md:grid-cols-2 ">

                <Image alt="Fresh catering dishes prepared for an event" src={content.image} priority
                    width={900} height={900}
                    className="w-full h-auto rounded-2xl object-cover shadow-lg"/>

                <div className="space-y-10">
                    <h1 className="text-7xl text-c-cream font-bold tracking-tight">
                        {content.heading}
                    </h1>

                    <p className="text-4xl text-amber-100">
                        {content.subheading}
                    </p>

                    <Button
                        href={content.ctaLink}
                        variant="hero"
                    >
                        {content.ctaText}
                    </Button>
                </div>

            </div>

        </section>
    )
}