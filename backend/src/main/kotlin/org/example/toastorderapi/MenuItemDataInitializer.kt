package org.example.toastorderapi

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.math.BigDecimal

@Component
class MenuItemDataInitializer(
    private val menuItemRepository: MenuItemRepository
) : CommandLineRunner {

    private fun ensureMenuItemExists(menuItem: MenuItem) {

        val exists = menuItemRepository.existsByTitle(menuItem.title)

        if (!exists) {
            menuItemRepository.save(menuItem)
        }
    }


    private fun seedMenuItems(menuItems: List<MenuItem>) {

        for (menuItem in menuItems) {
            ensureMenuItemExists(menuItem)
        }
    }


    override fun run(vararg args: String) {
        seedMenuItems(menuItems)
    }



    private val menuItems = listOf(
        MenuItem(
            id = 1,
            title = "Signature Ceviche",
            price = BigDecimal("12.99")
        ),
        MenuItem(
            id = 2,
            title = "House Chicken Flautas",
            price = BigDecimal("12.99"),
        ),
        MenuItem(
            id = 3,
            title = "Al Pastor Taco",
            price = BigDecimal("4.99"),
        ),
        MenuItem(
            id = 4,
            title = "Bros-Dos Tacos",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 5,
            title = "Birria Tacos",
            price = BigDecimal("19.99"),
        ),
        MenuItem(
            id = 6,
            title = "Mexican Ring of Fire",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 7,
            title = "Watermelon Matador",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 8,
            title = "House Sangria",
            price = BigDecimal("9.99"),
        ),
        MenuItem(
            id = 9,
            title = "Blue Coconut",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 10,
            title = "Mexican Candy Shot",
            price = BigDecimal("5.99"),
        ),
        MenuItem(
            id = 11,
            title = "Mango Tango",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 12,
            title = "Black Flag",
            price = BigDecimal("10.99"),
        ),
        MenuItem(
            id = 13,
            title = "Frozen Marg",
            price = BigDecimal("9.99"),
        ),
        MenuItem(
            id = 14,
            title = "Smoking Gun",
            price = BigDecimal("11.99"),
        ),
        MenuItem(
            id = 15,
            title = "Ring of Fire",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 16,
            title = "Mexican Chocolate Cake",
            price = BigDecimal("7.99"),
        ),
        MenuItem(
            id = 17,
            title = "Hibiscus Lemonade",
            price = BigDecimal("4.99"),
        ),
        MenuItem(
            id = 18,
            title = "Horchata",
            price = BigDecimal("4.99"),
        ),
        MenuItem(
            id = 19,
            title = "Dirty Horchata",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 20,
            title = "Dirty Habiscus",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 21,
            title = "Green Enchiladas",
            price = BigDecimal("14.99"),
        ),
        MenuItem(
            id = 22,
            title = "Taco Platter",
            price = BigDecimal("14.99"),
        ),
        MenuItem(
            id = 23,
            title = "Traditional Flan",
            price = BigDecimal("7.99"),
        ),
        MenuItem(
            id = 24,
            title = "Arroz Con Leche",
            price = BigDecimal("7.99"),
        ),
        MenuItem(
            id = 25,
            title = "Fresh Churros",
            price = BigDecimal("7.99"),
        ),
        MenuItem(
            id = 26,
            title = "Spicy Jalapeño Mango Marg",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 27,
            title = "Berry Margarita",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 28,
            title = "Spicy Watermelon Margarita",
            price = BigDecimal("8.99"),
        ),
        MenuItem(
            id = 29,
            title = "Flaming Fajitas",
            price = BigDecimal("14.99"),
        ),
        MenuItem(
            id = 30,
            title = "Loaded Chicken Burrito",
            price = BigDecimal("12.99"),
        ),
        MenuItem(
            id = 31,
            title = "Pozole",
            price = BigDecimal("11.99"),
        ),
        MenuItem(
            id = 32,
            title = "Chiles Rellenos",
            price = BigDecimal("7.99"),
        ),
        MenuItem(
            id = 33,
            title = "Salsa Sampler",
            price = BigDecimal("13.99"),
        ),
    )
}