import FullMenu from "@/components/FullMenu";
import { categories, footerContent, fullMenu } from "../lib/content";
import Footer from "@/components/Footer";

export default function MenuPage() {
    return (
        <>
    
            <main className="bg-c-peach pt-20 pb-14">
                <FullMenu
                    categories={categories}
                    menuItems={fullMenu}
                />
            </main>

            <footer>
                <Footer content={footerContent}/>
            </footer>

        </>
    )
}