package org.example.toastorderapi

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins(
                "http://localhost:3000",
                "https://dos-bros-tacos.vercel.app"
            )
            .allowedMethods(
                "GET",
                "POST",
                "PATCH",
                "OPTIONS"
            )
            .allowedHeaders("*")
    }
}