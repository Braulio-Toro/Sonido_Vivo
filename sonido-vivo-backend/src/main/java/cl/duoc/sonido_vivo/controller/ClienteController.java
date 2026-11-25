package cl.duoc.sonido_vivo.controller;

import cl.duoc.sonido_vivo.docs.ClienteDocs;
import cl.duoc.sonido_vivo.docs.EjemplosDocs;
import cl.duoc.sonido_vivo.dto.ClienteActualizarDTO;
import cl.duoc.sonido_vivo.dto.ClienteDTO;
import cl.duoc.sonido_vivo.dto.ClienteRequestDTO;
import cl.duoc.sonido_vivo.exception.ExceptionResponse;
import cl.duoc.sonido_vivo.mapper.ClienteMapper;
import cl.duoc.sonido_vivo.model.Cliente;
import cl.duoc.sonido_vivo.service.ClienteService;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
@Tag(name = "Clientes", description = "Gestión de clientes con HATEOAS en los GET. Todos los endpoints requieren rol ADMIN.")
public class ClienteController {

    private final ClienteService clienteService;
    private final ClienteMapper clienteMapper;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    @Operation(summary = "Listar todos los clientes", description = "Requiere rol ADMIN. Devuelve la colección con enlaces HATEOAS (HAL).")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de clientes obtenida correctamente",
                    content = @Content(mediaType = "application/hal+json",
                            schema = @Schema(implementation = ClienteDocs.Lista.class))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content)
    })
    public ResponseEntity<CollectionModel<EntityModel<ClienteDTO>>> obtenerTodos() {
        List<EntityModel<ClienteDTO>> clientes = clienteService.obtenerTodos().stream()
                .map(c -> toEntityModel(clienteMapper.toDTO(c)))
                .toList();
        return ResponseEntity.ok(CollectionModel.of(clientes,
                linkTo(methodOn(ClienteController.class).obtenerTodos()).withSelfRel()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar cliente por ID", description = "Requiere rol ADMIN.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente encontrado",
                    content = @Content(mediaType = "application/hal+json",
                            schema = @Schema(implementation = ClienteDocs.Respuesta.class))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_CLIENTE)))
    })
    public ResponseEntity<EntityModel<ClienteDTO>> buscarPorId(
            @Parameter(description = "ID del cliente", example = "1") @PathVariable Long id) {
        return ResponseEntity.ok(toEntityModel(clienteMapper.toDTO(clienteService.buscarPorId(id))));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear cliente", description = "Requiere rol ADMIN. El cliente se crea con rol USER y la contraseña se guarda cifrada (BCrypt).")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Cliente creado exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ClienteDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = EjemplosDocs.VALIDACION_CLIENTE))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content),
            @ApiResponse(responseCode = "409", description = "RUT o correo ya registrados",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.INTEGRIDAD)))
    })
    public ClienteDTO crear(@Valid @RequestBody ClienteRequestDTO request) {
        Cliente cliente = clienteMapper.toEntity(request);
        cliente.setPassword(passwordEncoder.encode(request.password()));
        return clienteMapper.toDTO(clienteService.guardar(cliente));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar cliente", description = "Requiere rol ADMIN. Permite cambiar el rol (USER o ADMIN); no modifica la contraseña.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cliente actualizado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ClienteDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = EjemplosDocs.VALIDACION_CLIENTE))),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_CLIENTE))),
            @ApiResponse(responseCode = "409", description = "RUT o correo ya registrados",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.INTEGRIDAD)))
    })
    public ClienteDTO actualizar(@Parameter(description = "ID del cliente", example = "1") @PathVariable Long id,
                                 @Valid @RequestBody ClienteActualizarDTO request) {
        return clienteMapper.toDTO(clienteService.actualizar(id, clienteMapper.toEntity(request)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Eliminar cliente", description = "Requiere rol ADMIN.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Cliente eliminado", content = @Content),
            @ApiResponse(responseCode = "401", description = "No autenticado (falta el token JWT)", content = @Content),
            @ApiResponse(responseCode = "403", description = "Sin permisos (requiere rol ADMIN)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente no encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.NO_ENCONTRADO_CLIENTE))),
            @ApiResponse(responseCode = "409", description = "El cliente tiene ventas asociadas",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.INTEGRIDAD)))
    })
    public void eliminar(@Parameter(description = "ID del cliente", example = "1") @PathVariable Long id) {
        clienteService.eliminar(id);
    }

    private EntityModel<ClienteDTO> toEntityModel(ClienteDTO c) {
        return EntityModel.of(c,
                linkTo(methodOn(ClienteController.class).buscarPorId(c.id())).withSelfRel(),
                linkTo(methodOn(ClienteController.class).obtenerTodos()).withRel("clientes"),
                linkTo(methodOn(VentaController.class).obtenerTodos()).withRel("ventas"));
    }
}
