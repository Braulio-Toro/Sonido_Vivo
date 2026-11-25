package cl.duoc.sonido_vivo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/** Cuerpo de PUT /api/clientes/{id} (solo ADMIN). No cambia la contraseña; sí permite cambiar el rol. */
@Schema(name = "ClienteActualizar", description = "Datos para actualizar un cliente (solo ADMIN)")
public record ClienteActualizarDTO(
        @NotBlank(message = "El RUT no debe estar vacío")
        @Pattern(regexp = "^[0-9]{7,8}[0-9kK]$", message = "El RUT debe ser sin puntos ni guion (Ej: 19011022K)")
        @Schema(example = "190110229") String rut,

        @NotBlank(message = "El nombre no debe estar vacío")
        @Size(max = 100, message = "El nombre puede tener máximo 100 caracteres")
        @Schema(example = "Juan Pérez") String nombre,

        @NotBlank(message = "El correo no debe estar vacío")
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@(gmail\\.com|duoc\\.cl|profesor\\.duoc\\.cl)$",
                message = "El correo debe terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl")
        @Schema(example = "juan.perez@gmail.com") String correo,

        @Pattern(regexp = "^\\+569[0-9]{8}$", message = "El teléfono debe ser +569 seguido de 8 dígitos")
        @Schema(example = "+56912345678", nullable = true) String telefono,

        @NotNull(message = "La fecha de nacimiento no debe estar vacía")
        @Past(message = "La fecha de nacimiento debe ser anterior a hoy")
        @Schema(example = "2000-05-10") LocalDate fechaNacimiento,

        @NotBlank(message = "El instrumento principal no debe estar vacío")
        @Schema(example = "Guitarra") String instrumento,

        @Schema(example = "Intermedio", nullable = true) String nivel,

        @NotBlank(message = "El rol no debe estar vacío")
        @Pattern(regexp = "^(USER|ADMIN)$", message = "El rol debe ser USER o ADMIN")
        @Schema(example = "USER", allowableValues = {"USER", "ADMIN"}) String rol
) {}
