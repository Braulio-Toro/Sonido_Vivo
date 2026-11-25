package cl.duoc.sonido_vivo.docs;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public final class VentaDocs {
    private VentaDocs() {}

    @Schema(name = "VentaLinks")
    public record Links(EnlaceDoc self, EnlaceDoc ventas, EnlaceDoc cliente, EnlaceDoc producto) {}

    @Schema(name = "VentaHal", description = "Venta (VentaDTO) con enlaces a su cliente y producto")
    public record Respuesta(
            @Schema(example = "1") Long id,
            @Schema(example = "2") Long clienteId,
            @Schema(example = "Cliente Demo") String clienteNombre,
            @Schema(example = "1") Long productoId,
            @Schema(example = "Fender Stratocaster Sunburst") String productoNombre,
            @Schema(example = "2") Integer cantidad,
            @Schema(example = "SONIDO10", nullable = true) String cuponCodigo,
            @Schema(example = "809991") Integer total,
            @Schema(example = "2026-11-20", type = "string", format = "date") String fecha,
            @Schema(example = "PAGADO") String estado,
            @JsonProperty("_links") Links links) {}

    @Schema(name = "VentaEmbedded")
    public record Embedded(List<Respuesta> ventaList) {}

    @Schema(name = "VentaListaResponse", description = "Colección de ventas (HAL)")
    public record Lista(
            @JsonProperty("_embedded") Embedded embedded,
            @JsonProperty("_links") ListaLinksDoc links) {}
}