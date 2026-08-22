        //      HERO            //

export interface HeroContent {
    image: string
    heading: string
    subheading: string
    description: string
    ctaText: string
    ctaLink: string
}

export const heroContent: HeroContent = {
    image: "/dos-bros-tacos-truck.jpeg",
    heading: "TACOS FOR THE WHOLE CREW 🌮",
    subheading: "Dos Bros Tacos is officially catering → bring the taco experience to your event.",
    description: "Choose your menu and let us handle the details.",
    ctaText: "Taco 'Bout a Good Time!",
    ctaLink: "/menu"
}



        //      WHY CHOOSE US       //

export interface Feature {
    image: string
    title: string
}

export const features: Feature[] = [
    {
        image: "/fresh-ingredients.jpg",
        title: "🥗 Lettuce Impress You",
    },
    {
        image: "/dos-bros-tacos-truck.jpeg",
        title: "🚚 Rolling in Flavor",
    },
    {
        image: "/catering.webp",
        title: "🎉 Nacho Average Catering",
    },
]



        //      FEATURED MENU       //

export interface MenuItem {
    id: number
    category: "Appetizers" | "Entrées" | "Drinks" | "Desserts" | "Alcohol"
    image: string
    title: string
    price: number
    description: string
}

export const featuredMenu: MenuItem[] = [
    {
        id: 23,
        category: "Desserts",
        image: "/flan.jpeg",
        title: "Traditional Flan",
        price: 7.99,
        description: "Silky vanilla custard topped with rich caramel sauce made fresh in-house."
    },
    {
        id: 5,
        category: "Entrées",
        image: "/birria-tacos.jpg",
        title: "Birria Tacos",
        price: 19.99,
        description: "Slow-braised beef folded into crispy corn tortillas with melted cheese, onions, cilantro, and rich consommé for dipping."
    },
    {
        id: 28,
        category: "Alcohol",
        image: "/watermelon-alcohol.jpeg",
        title: "Spicy Watermelon Margarita",
        price: 8.99,
        description: "Fresh watermelon and zesty lime meet a kick of spice in this refreshing margarita."
    },
]



        //      FULL MENU       //

export const categories = [
    "Appetizers",
    "Entrées",
    "Drinks",
    "Desserts",
    "Alcohol"
]

export const fullMenu: MenuItem[] = [
    {
        id: 1,
        category: "Appetizers",
        image: "/ceviche.jpg",
        title: "Signature Ceviche",
        price: 12.99,
        description: "Fresh seafood cured in citrus with tomatoes, cucumbers, serranos, onions, cilantro, topped with avocado.\nOptional: Tapatío"
    },
    {
        id: 2,
        category: "Appetizers",
        image: "/flautas.jpeg",
        title: "House Chicken Flautas",
        price: 12.99,
        description: "Golden rolled tortillas filled with seasoned chicken, topped with crema, queso fresco, lettuce, and salsa."
    },
    {
        id: 3,
        category: "Entrées",
        image: "/pork-taco.jpeg",
        title: "Al Pastor Taco",
        price: 4.99,
        description: "Marinated pork with grilled pineapple, cilantro, and onions served on a warm corn tortilla."
    },
    {
        id: 4,
        category: "Entrées",
        image: "/pork-tacos.jpeg",
        title: "Bros-Dos Tacos",
        price: 8.99,
        description: "Two authentic tacos al pastor served with fresh pineapple, cilantro, onions, and house salsa."
    },
    {
        id: 5,
        category: "Entrées",
        image: "/birria-tacos.jpg",
        title: "Birria Tacos",
        price: 19.99,
        description: "Slow-braised beef folded into crispy corn tortillas with melted cheese, onions, cilantro, and rich consommé for dipping."
    },
    {
        id: 6,
        category: "Alcohol",
        image: "/mexican-ring-of-fire.png",
        title: "Mexican Ring of Fire",
        price: 8.99,
        description: "A bold tequila cocktail with fresh lime, citrus, and a spicy chili rim for the perfect kick."
    },
    {
        id: 7,
        category: "Alcohol",
        image: "/watermelon-matador.png",
        title: "Watermelon Matador",
        price: 8.99,
        description: "Refreshing tequila, fresh watermelon, lime juice, and a hint of mint served over ice."
    },
    {
        id: 8,
        category: "Alcohol",
        image: "/sangria.jpg",
        title: "House Sangria",
        price: 9.99,
        description: "Our signature blend of red wine, fresh citrus, seasonal fruit, and a splash of Patrón."
    },
    {
        id: 9,
        category: "Alcohol",
        image: "/blue-coconut.png",
        title: "Blue Coconut",
        price: 8.99,
        description: "A tropical mix of coconut rum, blue curaçao, pineapple, and citrus for a smooth island-inspired cocktail."
    },
    {
        id: 10,
        category: "Alcohol",
        image: "/mexican-candy-shot.jpg",
        title: "Mexican Candy Shot",
        price: 5.99,
        description: "Sweet watermelon, tangy lime, and a touch of chili spice create a fun and flavorful shot."
    },
    {
        id: 11,
        category: "Alcohol",
        image: "/mango-tango.jpg",
        title: "Mango Tango",
        price: 8.99,
        description: "Juicy mango, premium tequila, fresh lime, and a Tajín rim for a sweet and spicy favorite."
    },
    {
        id: 12,
        category: "Alcohol",
        image: "/black-flag.jpg",
        title: "Black Flag",
        price: 10.99,
        description: "A smooth blend of dark rum, blackberry, citrus, and ginger beer with a bold finish."
    },
    {
        id: 13,
        category: "Alcohol",
        image: "/frozen-marg.png",
        title: "Frozen Marg",
        price: 9.99,
        description: "A frozen classic made with premium tequila, fresh lime juice, and orange liqueur."
    },
    {
        id: 14,
        category: "Alcohol",
        image: "/smoking-gun.png",
        title: "Smoking Gun",
        price: 11.99,
        description: "Mezcal, tequila, fresh citrus, and agave with a smoky finish that lingers."
    },
    {
        id: 15,
        category: "Alcohol",
        image: "/ring-of-fire.png",
        title: "Ring of Fire",
        price: 8.99,
        description: "Premium tequila, orange liqueur, lime, and jalapeño with a fiery chili-salt rim."
    },
    {
        id: 16,
        category: "Desserts",
        image: "/mexican-chocolate-cake.jpg",
        title: "Mexican Chocolate Cake",
        price: 7.99,
        description: "Rich chocolate cake infused with cinnamon and espresso, topped with silky chocolate ganache."
    },
    {
        id: 17,
        category: "Drinks",
        image: "/hibiscus-lemonade.jpeg",
        title: "Hibiscus Lemonade",
        price: 4.99,
        description: "Fresh lemonade blended with vibrant hibiscus tea for a refreshing balance of sweet and tart."
    },
    {
        id: 18,
        category: "Drinks",
        image: "/horchata.jpeg",
        title: "Horchata",
        price: 4.99,
        description: "Traditional Mexican rice drink flavored with cinnamon and vanilla, served ice cold."
    },
    {
        id: 19,
        category: "Alcohol",
        image: "/dirty-horchata.jpeg",
        title: "Dirty Horchata",
        price: 8.99,
        description: "Classic horchata with a shot of espresso and a splash of vanilla vodka for a creamy pick-me-up."
    },
    {
        id: 20,
        category: "Alcohol",
        image: "/dirty-hibiscus.jpeg",
        title: "Dirty Habiscus",
        price: 8.99,
        description: "Hibiscus lemonade mixed with tequila and fresh lime for a bright, refreshing cocktail."
    },
    {
        id: 21,
        category: "Entrées",
        image: "/green-enchiladas.jpeg",
        title: "Green Enchiladas",
        price: 14.99,
        description: "Tender chicken rolled in corn tortillas, covered with roasted tomatillo salsa, melted cheese, and crema."
    },
    {
        id: 22,
        category: "Entrées",
        image: "/taco-platter.jpeg",
        title: "Taco Platter",
        price: 14.99,
        description: "Your choice of seven authentic street tacos served with Mexican rice, refried beans, and house salsa."
    },
    {
        id: 23,
        category: "Desserts",
        image: "/flan.jpeg",
        title: "Traditional Flan",
        price: 7.99,
        description: "Silky vanilla custard topped with rich caramel sauce made fresh in-house."
    },
    {
        id: 24,
        category: "Desserts",
        image: "/arroz-con-leche.jpeg",
        title: "Arroz Con Leche",
        price: 7.99,
        description: "Creamy Mexican rice pudding simmered with cinnamon, vanilla, and sweet milk."
    },
    {
        id: 25,
        category: "Desserts",
        image: "/churros.jpeg",
        title: "Fresh Churros",
        price: 7.99,
        description: "Golden fried churros coated in cinnamon sugar and served with warm chocolate dipping sauce."
    },
    {
        id: 26,
        category: "Alcohol",
        image: "/spicy-jalapeno-mango-marg.jpeg",
        title: "Spicy Jalapeño Mango Marg",
        price: 8.99,
        description: "Sweet mango and spicy jalapeño blended with lime for a bold, refreshing margarita."
    },
    {
        id: 27,
        category: "Alcohol",
        image: "/berry-marg.jpeg",
        title: "Berry Margarita",
        price: 8.99,
        description: "A refreshing blend of juicy berries, citrus, and tequila with a sweet, vibrant finish."
    },
    {
        id: 28,
        category: "Alcohol",
        image: "/watermelon-alcohol.jpeg",
        title: "Spicy Watermelon Margarita",
        price: 8.99,
        description: "Fresh watermelon and zesty lime meet a kick of spice in this refreshing margarita."
    },
    {
        id: 29,
        category: "Entrées",
        image: "/fajitas.jpeg",
        title: "Flaming Fajitas",
        price: 14.99,
        description: "Sizzling grilled meats and vegetables served hot with warm tortillas and fresh toppings."
    },
    {
        id: 30,
        category: "Entrées",
        image: "/chicken-burrito.jpeg",
        title: "Loaded Chicken Burrito",
        price: 12.99,
        description: "A hearty flour tortilla packed with seasoned chicken, rice, beans, cheese, and fresh toppings."
    },
    {
        id: 31,
        category: "Entrées",
        image: "/pozole.jpg",
        title: "Pozole",
        price: 11.99,
        description: "A comforting Mexican hominy stew simmered with tender meat and traditional spices."
    },
    {
        id: 32,
        category: "Appetizers",
        image: "/chiles-rellenos.jpg",
        title: "Chiles Rellenos",
        price: 7.99,
        description: "Roasted peppers stuffed with savory filling and served with a flavorful Mexican-style sauce."
    },
    {
        id: 33,
        category: "Appetizers",
        image: "/salsa-platter.jpg",
        title: "Salsa Sampler",
        price: 13.99,
        description: "A colorful selection of house salsas ranging from fresh and mild to bold and spicy."
    },
]



        //      CTA     //

export interface CTAContent {
    heading: string
    description: string
    buttonText: string
    buttonLink: string
}

export const ctaContent: CTAContent = {
    heading: "Let's Taco 'Bout Your Next Event",
    description: "We bring the flavor. You bring the fiesta.",
    buttonText: "🪇 Salsa Your Way 🪇",
    buttonLink: "/menu"
}



        //      FOOTER      //

export interface NavigationLink {
    label: string
    href: string
}

export interface FooterContent {
    restaurantName: string
    address: string
    phoneNumber: string
    email: string
    businessHours: string
    copyright: string
    navigation: NavigationLink[]
}

export const footerContent: FooterContent = {
    restaurantName: "Dos Bros Tacos",
    address: "123 Turbo Dr, Austin, TX",
    phoneNumber: "+1 (800) DOS-BROS",
    email: "catering@dosbrostacos.com",
    businessHours: "Mon - Fri • 9:00 AM - 6:00 PM",
    copyright: "© 2026 Dos Bros Tacos. All rights reserved.",
    navigation: [
        {
            label: "Menu",
            href: "/menu"
        },
        {
            label: "Cart",
            href: "/cart"
        },
    ]
}



        //      CART PAGE       //

export interface OrderResponse {
    id: string
    status: "PAYMENT_PENDING" | "PAID" | "CANCELLED"
    subtotal: number
    tax: number
    total: number
    customerName: string
    customerEmail: string
    customerPhone: string
    restaurantId: number
    deliveryDate: string
    deliveryTime: string
    createdAt: string
    updatedAt: string
}

export interface PaymentResponse {
    id: string,
    orderId: string,
    status:  string,
    amount: number,
    transactionId: string | null,
    clientSecret: string | null,
    createdAt: string,
    updatedAt: string,
}