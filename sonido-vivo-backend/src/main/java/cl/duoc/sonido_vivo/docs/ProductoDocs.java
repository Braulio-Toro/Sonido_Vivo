package cl.duoc.sonido_vivo.docs;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public final class ProductoDocs {
    private ProductoDocs() {}

    @Schema(name = "ProductoLinks")
    public record Links(EnlaceDoc self, EnlaceDoc productos) {}

    @Schema(name = "ProductoHal", description = "Producto (ProductoDTO) con enlaces HATEOAS")
    public record Respuesta(
            @Schema(example = "1") Long id,
            @Schema(example = "SV-GTR-001") String codigo,
            @Schema(example = "Fender Stratocaster Sunburst") String nombre,
            @Schema(example = "Guitarras") String categoria,
            @Schema(example = "Fender") String marca,
            @Schema(example = "899990") Integer precio,
            @Schema(example = "5") Integer stock,
            @Schema(example = "Guitarra eléctrica de sonido versátil, clásico y definido.") String descripcion,
            @Schema(example = "/img/producto-generico.png") String imagen,
            @JsonProperty("_links") Links links) {}

    @Schema(name = "ProductoEmbedded")
    public record Embedded(List<Respuesta> productoList) {}

    @Schema(name = "ProductoListaResponse", description = "Colección de productos (HAL)")
    public record Lista(
            @JsonProperty("_embedded") Embedded embedded,
            @JsonProperty("_links") ListaLinksDoc links) {}
}
