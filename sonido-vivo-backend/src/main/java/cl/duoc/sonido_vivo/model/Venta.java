package cl.duoc.sonido_vivo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "ventas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, example = "1")
    private Long id;

    @NotNull(message = "El cliente no debe estar vacío")
    @Schema(example = "2")
    private Long clienteId;

    @NotNull(message = "El producto no debe estar vacío")
    @Schema(example = "1")
    private Long productoId;

    @NotNull(message = "La cantidad no debe estar vacía")
    @Min(value = 1, message = "La cantidad mínima es 1")
    @Max(value = 10, message = "La cantidad máxima es 10")
    @Schema(example = "2")
    private Integer cantidad;

    @Schema(example = "SONIDO10", nullable = true)
    private String cuponCodigo;

    @NotNull(message = "El total no debe estar vacío")
    @Positive(message = "El total debe ser mayor a 0")
    @Schema(example = "809991")
    private Integer total;

    @Column(nullable = false)
    @Schema(example = "2026-11-20")
    private LocalDate fecha = LocalDate.now();

    @PrePersist
    public void prepararAntesDeGuardar() {
        if (fecha == null) {
            fecha = LocalDate.now();
        }
        if (estado == null || estado.isBlank()) {
            estado = "PAGADO";
        }
    }

    @NotBlank(message = "El estado no debe estar vacío")
    @Schema(example = "PAGADO")
    private String estado = "PAGADO";
}