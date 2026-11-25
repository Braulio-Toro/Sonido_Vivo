package cl.duoc.sonido_vivo.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(title = "API Sonido Vivo", version = "2.0", description = "API REST de Sonido Vivo: CRUD con DTOs, autenticación JWT, roles USER y ADMIN, HATEOAS en los GET y migraciones Flyway. Para probar endpoints protegidos: POST /api/auth/login, copia el token y pégalo en Authorize."),
        security = @SecurityRequirement(name = "bearerAuth")
)
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP,
        scheme = "bearer", bearerFormat = "JWT")
public class OpenApiConfig {}