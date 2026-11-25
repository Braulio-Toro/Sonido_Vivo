package cl.duoc.sonido_vivo.docs;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "Enlace")
public record EnlaceDoc(@Schema(example = "http://localhost:8081/api/clientes/1") String href) {}