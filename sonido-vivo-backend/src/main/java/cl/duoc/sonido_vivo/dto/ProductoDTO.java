package cl.duoc.sonido_vivo.dto;

import io.swagger.v3.oas.annotations.media.Schema;

/** Producto tal como lo devuelve la API. */
@Schema(name = "Producto", description = "Producto del catálogo")
public record ProductoDTO(
        @Schema(example = "1") Long id,
        @Schema(example = "SV-GTR-001") String codigo,
        @Schema(example = "Fender Stratocaster Sunburst") String nombre,
        @Schema(example = "Guitarras") String categoria,
        @Schema(example = "Fender") String marca,
        @Schema(example = "899990") Integer precio,
        @Schema(example = "5") Integer stock,
        @Schema(example = "Guitarra eléctrica de sonido versátil, clásico y definido.") String descripcion,
        @Schema(example = "/img/producto-generico.png") String imagen
) {}
