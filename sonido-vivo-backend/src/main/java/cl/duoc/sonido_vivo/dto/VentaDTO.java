package cl.duoc.sonido_vivo.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

/** Venta con el nombre del cliente y del producto (igual que CitaDTO en AURAMED). */
@Schema(name = "Venta", description = "Venta registrada, con el nombre del cliente y del producto")
public record VentaDTO(
        @Schema(example = "1") Long id,
        @Schema(example = "2") Long clienteId,
        @Schema(example = "Cliente Demo") String clienteNombre,
        @Schema(example = "1") Long productoId,
        @Schema(example = "Fender Stratocaster Sunburst") String productoNombre,
        @Schema(example = "2") Integer cantidad,
        @Schema(example = "SONIDO10", nullable = true) String cuponCodigo,
        @Schema(example = "809991") Integer total,
        @Schema(example = "2026-11-20") LocalDate fecha,
        @Schema(example = "PAGADO") String estado
) {}
