"use client"

import React, { createContext, ReactNode, useState } from "react";
import { MenuItem } from "../lib/content";

export interface CartItem extends MenuItem {
    quantity: number
}

interface CartContextValue {
    cartItems: CartItem[]
    addItem: (menuItem: MenuItem) => void
    removeItem: (menuItem: MenuItem) => void
    clearCart: () => void
}

interface CartProviderProps {
    children: ReactNode
}



export const CartContext = createContext<CartContextValue | null>(null)



export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])


    function addItem(menuItem: MenuItem) {
        setCartItems(currentItems => {
            
            const existingItem = currentItems.find (
                item => item.id === menuItem.id
            )

            if (existingItem) {
                return currentItems.map(item =>
                    item.id === menuItem.id

                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
                )
            }

            return [
                ...currentItems,
                {
                    ...menuItem,
                    quantity: 1
                }
            ]

        })
    }


    function removeItem(menuItem: MenuItem) {
        setCartItems(currentItems => {

            const existingItem = currentItems.find ( item =>
                item.id === menuItem.id
            )

            if (!existingItem) {
                return currentItems
            }

            if (existingItem.quantity > 1) {
                return currentItems.map(item =>
                    item.id === menuItem.id

                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
                )
            }

            return currentItems.filter(item =>
                item.id !== menuItem.id
            )
        })
    }
    

    function clearCart() {
        setCartItems([])
    }






    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            removeItem,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )

}