package org.example.toastorderapi

class MenuItemNotFoundException(
    val menuItemId: Int
): RuntimeException()