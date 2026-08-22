package org.example.toastorderapi

import org.springframework.data.jpa.repository.JpaRepository

interface MenuItemRepository : JpaRepository<MenuItem, Int> {
    fun existsByTitle(title: String): Boolean
}