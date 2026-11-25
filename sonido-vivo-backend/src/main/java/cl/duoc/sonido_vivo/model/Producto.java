package cl.duoc.sonido_vivo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, example = "1")
    private Long id;

    @NotBlank(message = "El código no debe estar vacío")
    @Column(unique = true)
    @Schema(example = "SV-GTR-013")
    private String codigo;

    @NotBlank(message = "El nombre no debe estar vacío")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    @Schema(example = "Fender Stratocaster Sunburst")
    private String nombre;

    @NotBlank(message = "La categoría no debe estar vacía")
    @Schema(example = "Guitarras")
    private String categoria;

    @NotBlank(message = "La marca no debe estar vacía")
    @Schema(example = "Fender")
    private String marca;

    @NotNull(message = "El precio no debe estar vacío")
    @Positive(message = "El precio debe ser mayor a 0")
    @Schema(example = "899990")
    private Integer precio;

    @NotNull(message = "El stock no debe estar vacío")
    @PositiveOrZero(message = "El stock no puede ser negativo")
    @Schema(example = "5")
    private Integer stock;

    @NotBlank(message = "La descripción no debe estar vacía")
    @Size(max = 300, message = "La descripción puede tener máximo 300 caracteres")
    @Schema(example = "Guitarra eléctrica de sonido versátil, clásico y definido.")
    private String descripcion;

    @Schema(example = "/img/producto-generico.png")
    private String imagen = "/img/producto-generico.png";
}