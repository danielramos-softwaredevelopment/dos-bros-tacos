import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { ctaContent, featuredMenu, features, footerContent, heroContent } from "@/app/lib/content";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedMenu from "@/components/FeaturedMenu";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>

      <main>
        <Hero content={heroContent}/> 
        <FeaturedMenu featuredMenu={featuredMenu} />
        <WhyChooseUs features={features}/>
        <CTA content={ctaContent} />
        <Footer content={footerContent} />
      </main>
      
    </>
  );
}
