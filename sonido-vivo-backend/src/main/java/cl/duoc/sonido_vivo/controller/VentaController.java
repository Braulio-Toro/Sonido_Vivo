package cl.duoc.sonido_vivo.controller;

import cl.duoc.sonido_vivo.docs.EjemplosDocs;
import cl.duoc.sonido_vivo.docs.VentaDocs;
import cl.duoc.sonido_vivo.dto.VentaDTO;
import cl.duoc.sonido_vivo.dto.VentaRequestDTO;
import cl.duoc.sonido_vivo.exception.ExceptionResponse;
import cl.duoc.sonido_vivo.mapper.VentaMapper;
import cl.duoc.sonido_vivo.service.VentaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/ventas")
@RequiredArgsConstructor
@Tag(name = "Ventas", description = "Gestión de ventas con HATEOAS en los GET. Requiere token JWT (USER o ADMIN); eliminar requiere rol ADMIN.")
public class VentaController {

    private final VentaService ventaService;
    private final VentaMapper ventaMapper;

    @GetMapping
    @Operation(summary = "Listar todas las ventas", description = "Requiere token JWT. Incluye el nombre del cliente y del producto.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de ventas obtenida correctamente",
                    content = @Content(mediaType = "application/hal+json",
                            schema = @Schema(implementation = VentaDocs.Lista.class))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content)
    })
    public ResponseEntity<CollectionModel<EntityModel<VentaDTO>>> obtenerTodos() {
        List<EntityModel<VentaDTO>> ventas = ventaService.obtenerTodos().stream()
                .map(v -> toEntityModel(ventaMapper.toDTO(v)))
                .toList();
        return ResponseEntity.ok(CollectionModel.of(ventas,
                linkTo(methodOn(VentaController.class).obtenerTodos()).withSelfRel()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar venta por ID", description = "Requiere token JWT.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Venta encontrada",
                    content = @Content(mediaType = "application/hal+json",
                            schema = @Schema(implementation = VentaDocs.Respuesta.class))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Venta no encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_VENTA)))
    })
    public ResponseEntity<EntityModel<VentaDTO>> buscarPorId(
            @Parameter(description = "ID de la venta", example = "1") @PathVariable Long id) {
        return ResponseEntity.ok(toEntityModel(ventaMapper.toDTO(ventaService.buscarPorId(id))));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registrar nueva venta", description = "Requiere token JWT. Valida cantidad (1-10) y total; la fecha la asigna el servidor.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Venta creada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = VentaDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = EjemplosDocs.VALIDACION_VENTA))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "409", description = "El cliente o el producto no existen",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.INTEGRIDAD)))
    })
    public VentaDTO crear(@Valid @RequestBody VentaRequestDTO venta) {
        return ventaMapper.toDTO(ventaService.guardar(ventaMapper.toEntity(venta)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar venta existente", description = "Requiere token JWT.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Venta actualizada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = VentaDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = EjemplosDocs.VALIDACION_VENTA))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Venta no encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_VENTA))),
            @ApiResponse(responseCode = "409", description = "El cliente o el producto no existen",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.INTEGRIDAD)))
    })
    public VentaDTO actualizar(@Parameter(description = "ID de la venta", example = "1") @PathVariable Long id,
                               @Valid @RequestBody VentaRequestDTO venta) {
        return ventaMapper.toDTO(ventaService.actualizar(id, ventaMapper.toEntity(venta)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar venta", description = "Requiere rol ADMIN.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Venta eliminada", content = @Content),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Venta no encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_VENTA)))
    })
    public void eliminar(@Parameter(description = "ID de la venta", example = "1") @PathVariable Long id) {
        ventaService.eliminar(id);
    }

    private EntityModel<VentaDTO> toEntityModel(VentaDTO v) {
        return EntityModel.of(v,
                linkTo(methodOn(VentaController.class).buscarPorId(v.id())).withSelfRel(),
                linkTo(methodOn(VentaController.class).obtenerTodos()).withRel("ventas"),
                linkTo(methodOn(ClienteController.class).buscarPorId(v.clienteId())).withRel("cliente"),
                linkTo(methodOn(ProductoController.class).buscarPorId(v.productoId())).withRel("producto"));
    }
}
