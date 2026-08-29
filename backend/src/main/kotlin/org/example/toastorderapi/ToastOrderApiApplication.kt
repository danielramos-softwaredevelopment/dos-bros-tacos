package org.example.toastorderapi

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class ToastOrderApiApplication

fun main(args: Array<String>) {
    runApplication<ToastOrderApiApplication>(*args)
}
