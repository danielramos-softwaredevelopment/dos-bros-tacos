import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./cart/cart-context";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dos Bros Tacos",
  description: "Dos Bros Tacos Catering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} >

        <CartProvider>

          <body className="min-h-full flex flex-col">

            <Navbar/>
            {children}
            
          </body>
          
        </CartProvider>

    </html>

  );

}
