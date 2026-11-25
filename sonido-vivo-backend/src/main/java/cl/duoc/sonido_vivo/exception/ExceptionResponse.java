package cl.duoc.sonido_vivo.exception;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/** Formato único de error para toda la API (equivale al ExceptionResponse de AURAMED). */
@Schema(name = "ExceptionResponse", description = "Respuesta de error")
public record ExceptionResponse(
        @Schema(example = "2026-11-21T12:00:00") LocalDateTime timestamp,
        @Schema(example = "404") int status,
        @Schema(example = "Producto no encontrado", description = "Mensaje legible del error") String error,
        @Schema(example = "/api/productos/99") String path
) {}
