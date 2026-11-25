package cl.duoc.sonido_vivo.docs;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public final class ClienteDocs {
    private ClienteDocs() {}

    @Schema(name = "ClienteLinks")
    public record Links(EnlaceDoc self, EnlaceDoc clientes, EnlaceDoc ventas) {}

    @Schema(name = "ClienteHal", description = "Cliente (ClienteDTO) con enlaces HATEOAS; la contraseña nunca se devuelve")
    public record Respuesta(
            @Schema(example = "1") Long id,
            @Schema(example = "190110229") String rut,
            @Schema(example = "Juan Pérez") String nombre,
            @Schema(example = "juan@gmail.com") String correo,
            @Schema(example = "+56912345678", nullable = true) String telefono,
            @Schema(example = "2000-05-10", type = "string", format = "date") String fechaNacimiento,
            @Schema(example = "Guitarra") String instrumento,
            @Schema(example = "Intermedio") String nivel,
            @Schema(example = "USER", allowableValues = {"USER", "ADMIN"}) String rol,
            @JsonProperty("_links") Links links) {}

    @Schema(name = "ClienteEmbedded")
    public record Embedded(List<Respuesta> clienteList) {}

    @Schema(name = "ClienteListaResponse", description = "Colección de clientes (HAL)")
    public record Lista(
            @JsonProperty("_embedded") Embedded embedded,
            @JsonProperty("_links") ListaLinksDoc links) {}
}