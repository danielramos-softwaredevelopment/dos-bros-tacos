import { FooterContent } from "@/app/lib/content";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
    content: FooterContent
}

export default function Footer({ content }: FooterProps) {
    return (
        <footer className="bg-c-terracotta text-c-cream p-5 space-y-5">
            <h2 className="text-center font-bold text-3xl">{content.restaurantName}</h2>
            
            <div className="grid gap-6 md:grid-cols-3 px-12 items-center">
                <div className="text-center space-y-5">
                    <p>{content.phoneNumber}</p>

                    <p>{content.email}</p>

                    <p>{content.address}</p>
                </div>

                <div className="flex justify-center">
                    <Image
                        src="/dos-bros-tacos-truck.jpeg"
                        alt="Dos bros tacos truck"
                        width={300}
                        height={300}
                        className="rounded-2xl"
                    />
                </div>

                <div className="text-center space-y-5">
                    <nav className="space-x-6">{content.navigation.map(link => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                        ))}
                    </nav>

                    <p>{content.businessHours}</p>

                    <p>{content.copyright}</p>
                </div>
            </div>
        </footer>
    )
}