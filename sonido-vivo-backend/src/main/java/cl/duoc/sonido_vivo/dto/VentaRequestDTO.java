package cl.duoc.sonido_vivo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

/** Cuerpo de POST /api/ventas y PUT /api/ventas/{id}. La fecha la asigna el servidor. */
@Schema(name = "VentaRequest", description = "Datos para registrar o actualizar una venta")
public record VentaRequestDTO(
        @NotNull(message = "El cliente no debe estar vacío")
        @Schema(example = "2") Long clienteId,

        @NotNull(message = "El producto no debe estar vacío")
        @Schema(example = "1") Long productoId,

        @NotNull(message = "La cantidad no debe estar vacía")
        @Min(value = 1, message = "La cantidad mínima es 1")
        @Max(value = 10, message = "La cantidad máxima es 10")
        @Schema(example = "2") Integer cantidad,

        @Schema(example = "SONIDO10", nullable = true, description = "Cupón aplicado en el carrito (opcional)") String cuponCodigo,

        @NotNull(message = "El total no debe estar vacío")
        @Positive(message = "El total debe ser mayor a 0")
        @Schema(example = "809991") Integer total,

        @Pattern(regexp = "^(PAGADO|PENDIENTE|CANCELADO)$", message = "El estado debe ser PAGADO, PENDIENTE o CANCELADO")
        @Schema(example = "PAGADO", nullable = true, allowableValues = {"PAGADO", "PENDIENTE", "CANCELADO"},
                description = "Opcional: si no se envía queda como PAGADO") String estado
) {}
