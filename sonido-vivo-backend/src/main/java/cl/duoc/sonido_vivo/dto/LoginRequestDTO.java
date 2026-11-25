package cl.duoc.sonido_vivo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "LoginRequest", description = "Credenciales de acceso")
public record LoginRequestDTO(
        @NotBlank(message = "El correo no debe estar vacío")
        @Schema(example = "admin@duoc.cl") String correo,

        @NotBlank(message = "La contraseña no debe estar vacía")
        @Schema(example = "admin123") String password
) {}
