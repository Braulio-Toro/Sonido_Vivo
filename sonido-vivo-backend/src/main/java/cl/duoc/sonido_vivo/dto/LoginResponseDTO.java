package cl.duoc.sonido_vivo.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "LoginResponse", description = "Token JWT y datos públicos del usuario")
public record LoginResponseDTO(
        @Schema(example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBkdW9jLmNsIiwicm9sIjoiUk9MRV9BRE1JTiJ9.firma") String token,
        ClienteDTO usuario
) {}
