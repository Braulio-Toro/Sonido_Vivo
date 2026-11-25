package cl.duoc.sonido_vivo.controller;

import cl.duoc.sonido_vivo.docs.EjemplosDocs;
import cl.duoc.sonido_vivo.docs.ProductoDocs;
import cl.duoc.sonido_vivo.dto.ProductoDTO;
import cl.duoc.sonido_vivo.dto.ProductoRequestDTO;
import cl.duoc.sonido_vivo.exception.ExceptionResponse;
import cl.duoc.sonido_vivo.mapper.ProductoMapper;
import cl.duoc.sonido_vivo.service.ProductoService;
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
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@Tag(name = "Productos", description = "Gestión de productos con HATEOAS en los GET. Los GET son públicos; crear, editar y eliminar requieren rol ADMIN.")
public class ProductoController {

    private final ProductoService productoService;
    private final ProductoMapper productoMapper;

    @GetMapping
    @Operation(summary = "Listar todos los productos", description = "Público. Devuelve la colección con enlaces HATEOAS (HAL).")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de productos obtenida correctamente",
                    content = @Content(mediaType = "application/hal+json",
                            schema = @Schema(implementation = ProductoDocs.Lista.class)))
    })
    public ResponseEntity<CollectionModel<EntityModel<ProductoDTO>>> obtenerTodos() {
        List<EntityModel<ProductoDTO>> productos = productoService.obtenerTodos().stream()
                .map(p -> toEntityModel(productoMapper.toDTO(p)))
                .toList();
        return ResponseEntity.ok(CollectionModel.of(productos,
                linkTo(methodOn(ProductoController.class).obtenerTodos()).withSelfRel()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar producto por ID", description = "Público.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Producto encontrado",
                    content = @Content(mediaType = "application/hal+json",
                            schema = @Schema(implementation = ProductoDocs.Respuesta.class))),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_PRODUCTO)))
    })
    public ResponseEntity<EntityModel<ProductoDTO>> buscarPorId(
            @Parameter(description = "ID del producto", example = "1") @PathVariable Long id) {
        return ResponseEntity.ok(toEntityModel(productoMapper.toDTO(productoService.buscarPorId(id))));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear producto", description = "Requiere rol ADMIN.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Producto creado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProductoDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos inválidos",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = EjemplosDocs.VALIDACION_PRODUCTO))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content),
            @ApiResponse(responseCode = "409", description = "Código de producto repetido",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.INTEGRIDAD)))
    })
    public ProductoDTO crear(@Valid @RequestBody ProductoRequestDTO producto) {
        return productoMapper.toDTO(productoService.guardar(productoMapper.toEntity(producto)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto", description = "Requiere rol ADMIN.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Producto actualizado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProductoDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos inválidos",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = EjemplosDocs.VALIDACION_PRODUCTO))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_PRODUCTO))),
            @ApiResponse(responseCode = "409", description = "Código de producto repetido",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.INTEGRIDAD)))
    })
    public ProductoDTO actualizar(@Parameter(description = "ID del producto", example = "1") @PathVariable Long id,
                                  @Valid @RequestBody ProductoRequestDTO producto) {
        return productoMapper.toDTO(productoService.actualizar(id, productoMapper.toEntity(producto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar producto", description = "Requiere rol ADMIN.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Producto eliminado", content = @Content),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_PRODUCTO))),
            @ApiResponse(responseCode = "409", description = "El producto tiene ventas asociadas",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.INTEGRIDAD)))
    })
    public void eliminar(@Parameter(description = "ID del producto", example = "1") @PathVariable Long id) {
        productoService.eliminar(id);
    }

    private EntityModel<ProductoDTO> toEntityModel(ProductoDTO p) {
        return EntityModel.of(p,
                linkTo(methodOn(ProductoController.class).buscarPorId(p.id())).withSelfRel(),
                linkTo(methodOn(ProductoController.class).obtenerTodos()).withRel("productos"));
    }
}
