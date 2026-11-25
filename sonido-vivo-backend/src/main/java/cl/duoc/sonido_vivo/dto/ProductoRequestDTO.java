package cl.duoc.sonido_vivo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

/** Cuerpo de POST /api/productos y PUT /api/productos/{id}. No incluye el id (lo genera la base de datos). */
@Schema(name = "ProductoRequest", description = "Datos para crear o actualizar un producto")
public record ProductoRequestDTO(
        @NotBlank(message = "El código no debe estar vacío")
        @Size(max = 50, message = "El código puede tener máximo 50 caracteres")
        @Schema(example = "SV-GTR-013") String codigo,

        @NotBlank(message = "El nombre no debe estar vacío")
        @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
        @Schema(example = "Guitarra Yamaha Pacifica 112V") String nombre,

        @NotBlank(message = "La categoría no debe estar vacía")
        @Schema(example = "Guitarras") String categoria,

        @NotBlank(message = "La marca no debe estar vacía")
        @Schema(example = "Yamaha") String marca,

        @NotNull(message = "El precio no debe estar vacío")
        @Positive(message = "El precio debe ser mayor a 0")
        @Schema(example = "249990") Integer precio,

        @NotNull(message = "El stock no debe estar vacío")
        @PositiveOrZero(message = "El stock no puede ser negativo")
        @Schema(example = "8") Integer stock,

        @NotBlank(message = "La descripción no debe estar vacía")
        @Size(max = 300, message = "La descripción puede tener máximo 300 caracteres")
        @Schema(example = "Guitarra eléctrica versátil, ideal para quienes comienzan.") String descripcion,

        @Size(max = 255, message = "La imagen puede tener máximo 255 caracteres")
        @Schema(example = "/img/producto-generico.png", nullable = true, description = "Opcional: si no se envía se usa la imagen genérica") String imagen
) {}
