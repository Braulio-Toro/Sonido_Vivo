package cl.duoc.sonido_vivo.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Manejo central de errores. Todos los errores (salvo la validación de campos)
 * usan el mismo formato: {@link ExceptionResponse}.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<ExceptionResponse> respuesta(HttpStatus estado, String mensaje, HttpServletRequest request) {
        return ResponseEntity.status(estado)
                .body(new ExceptionResponse(LocalDateTime.now(), estado.value(), mensaje, request.getRequestURI()));
    }

    // 400: { "campo": "mensaje de validación" }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> validacion(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(e -> errores.put(e.getField(), e.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errores);
    }

    // 401: credenciales incorrectas en el login
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> credenciales(BadCredentialsException ex, HttpServletRequest request) {
        return respuesta(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos", request);
    }

    // 404 / 409 lanzados desde los servicios (ResponseStatusException)
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ExceptionResponse> estado(ResponseStatusException ex, HttpServletRequest request) {
        int codigo = ex.getStatusCode().value();
        String mensaje = ex.getReason() != null ? ex.getReason() : "Error";
        return ResponseEntity.status(ex.getStatusCode())
                .body(new ExceptionResponse(LocalDateTime.now(), codigo, mensaje, request.getRequestURI()));
    }

    // 409: datos únicos repetidos, campos obligatorios o relaciones inválidas
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> integridad(DataIntegrityViolationException ex, HttpServletRequest request) {
        return respuesta(HttpStatus.CONFLICT,
                "No se pudo guardar el registro. Revisa los campos obligatorios, las relaciones y que los datos únicos no estén repetidos.",
                request);
    }

    // 400: JSON mal formado o con tipos incorrectos
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> jsonInvalido(HttpMessageNotReadableException ex, HttpServletRequest request) {
        return respuesta(HttpStatus.BAD_REQUEST, "El cuerpo de la petición no es un JSON válido", request);
    }
}
