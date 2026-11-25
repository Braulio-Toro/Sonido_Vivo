package cl.duoc.sonido_vivo.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

/** Datos públicos de un cliente: nunca incluye la contraseña. */
@Schema(name = "Cliente", description = "Cliente (sin contraseña)")
public record ClienteDTO(
        @Schema(example = "1") Long id,
        @Schema(example = "190110229") String rut,
        @Schema(example = "Juan Pérez") String nombre,
        @Schema(example = "juan.perez@gmail.com") String correo,
        @Schema(example = "+56912345678", nullable = true) String telefono,
        @Schema(example = "2000-05-10") LocalDate fechaNacimiento,
        @Schema(example = "Guitarra") String instrumento,
        @Schema(example = "Intermedio", nullable = true) String nivel,
        @Schema(example = "USER", allowableValues = {"USER", "ADMIN"}) String rol
) {}
