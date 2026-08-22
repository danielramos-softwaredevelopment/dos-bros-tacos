import { MenuItem } from "@/app/lib/content"
import MenuCard from "./menuCard"

interface FullMenuProps {
    categories: string[]
    menuItems: MenuItem[]
}

export default function FullMenu({ categories, menuItems }: FullMenuProps) {
    return (
        <section className="space-y-20 px-8 mb-10">

            <h1 className="text-7xl font-bold text-center leading-tight">MENU</h1>

            {categories.map(category => {

                const categoryItems = menuItems.filter(
                    menuItem => menuItem.category === category
                )

                return(

                    <section key={category} className="space-y-10">

                        <h2 className="text-5xl font-bold">
                            {category}
                        </h2>

                        <div className="grid gap-12 md:grid-cols-3">
                            {categoryItems.map(menuItem => (
                                <MenuCard
                                    key={menuItem.id}
                                    menuItem={menuItem}
                                />
                            ))}
                        </div>

                    </section>
                )
            })}



        </section>
    )
}