package cl.duoc.sonido_vivo.controller;

import cl.duoc.sonido_vivo.docs.EjemplosDocs;
import cl.duoc.sonido_vivo.dto.ClienteDTO;
import cl.duoc.sonido_vivo.dto.ClienteRequestDTO;
import cl.duoc.sonido_vivo.dto.LoginRequestDTO;
import cl.duoc.sonido_vivo.dto.LoginResponseDTO;
import cl.duoc.sonido_vivo.exception.ExceptionResponse;
import cl.duoc.sonido_vivo.mapper.ClienteMapper;
import cl.duoc.sonido_vivo.model.Cliente;
import cl.duoc.sonido_vivo.repository.ClienteRepository;
import cl.duoc.sonido_vivo.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Registro de usuarios y generación de tokens JWT (endpoints públicos)")
public class AuthController {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final ClienteMapper clienteMapper;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registrar usuario", description = "Crea un cliente nuevo. El rol siempre queda como USER y la contraseña se guarda cifrada (BCrypt).")
    @SecurityRequirements
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Usuario registrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ClienteDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = EjemplosDocs.VALIDACION_CLIENTE))),
            @ApiResponse(responseCode = "409", description = "El correo o el RUT ya están registrados",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.CORREO_REPETIDO)))
    })
    public ClienteDTO register(@Valid @RequestBody ClienteRequestDTO request) {
        if (clienteRepository.existsByCorreo(request.correo()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El correo ya está registrado");
        if (clienteRepository.existsByRut(request.rut()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El RUT ya está registrado");

        Cliente cliente = clienteMapper.toEntity(request);   // rol USER, nunca el del body
        cliente.setPassword(passwordEncoder.encode(request.password()));
        return clienteMapper.toDTO(clienteRepository.save(cliente));
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Valida las credenciales y devuelve un token JWT (1 hora) junto a los datos públicos del usuario. Copia el token y pégalo en el botón Authorize.")
    @SecurityRequirements
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Login correcto",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = LoginResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Faltan el correo o la contraseña",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "401", description = "Correo o contraseña incorrectos",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExceptionResponse.class),
                            examples = @ExampleObject(value = EjemplosDocs.CREDENCIALES)))
    })
    public LoginResponseDTO login(@Valid @RequestBody LoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.correo(), request.password()));
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.correo());
        Cliente cliente = clienteRepository.findByCorreo(request.correo())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado"));
        return new LoginResponseDTO(jwtService.generateToken(userDetails), clienteMapper.toDTO(cliente));
    }
}
