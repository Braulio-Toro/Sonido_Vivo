package cl.duoc.sonido_vivo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, example = "1")
    private Long id;

    @NotBlank(message = "El RUT no debe estar vacío")
    @Pattern(regexp = "^[0-9]{7,8}[0-9kK]$", message = "El RUT debe ser sin puntos ni guion (Ej: 19011022K)")
    @Column(unique = true)
    @Schema(example = "190110229")
    private String rut;

    @NotBlank(message = "El nombre no debe estar vacío")
    @Size(max = 100, message = "El nombre puede tener máximo 100 caracteres")
    @Schema(example = "Juan Pérez")
    private String nombre;

    @NotBlank(message = "El correo no debe estar vacío")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@(gmail\\.com|duoc\\.cl|profesor\\.duoc\\.cl)$",
            message = "El correo debe terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl")
    @Column(unique = true)
    @Schema(example = "juan.perez@gmail.com")
    private String correo;

    @Pattern(regexp = "^\\+569[0-9]{8}$", message = "El teléfono debe ser +569 seguido de 8 dígitos")
    @Schema(example = "+56912345678", nullable = true)
    private String telefono;

    @NotNull(message = "La fecha de nacimiento no debe estar vacía")
    @Past(message = "La fecha de nacimiento debe ser anterior a hoy")
    @Schema(example = "2000-05-10")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "El instrumento principal no debe estar vacío")
    @Schema(example = "Guitarra")
    private String instrumento;

    @Schema(example = "Intermedio")
    private String nivel;

    @NotBlank(message = "La contraseña no debe estar vacía")
    @Size(min = 4, max = 72, message = "La contraseña debe tener entre 4 y 72 caracteres")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Schema(example = "1234")
    private String password;

    @Schema(example = "USER", allowableValues = {"USER", "ADMIN"})
    private String rol = "USER";

    public void setPassword(String password) {
        this.password = password;
    }
}