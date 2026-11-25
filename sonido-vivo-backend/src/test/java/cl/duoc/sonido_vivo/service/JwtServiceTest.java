package cl.duoc.sonido_vivo.service;

import cl.duoc.sonido_vivo.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;
    private UserDetails user;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        // clave Base64 de 32 bytes solo para tests
        ReflectionTestUtils.setField(jwtService, "secret", "MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=");
        ReflectionTestUtils.setField(jwtService, "expiration", 60000L);
        user = new User("test@duoc.cl", "x", List.of(new SimpleGrantedAuthority("ROLE_CLIENTE")));
    }

    @Test
    void generarToken_DebeContenerElCorreo() {
        String token = jwtService.generateToken(user);
        assertEquals("test@duoc.cl", jwtService.extractUsername(token));
        assertTrue(jwtService.isTokenValid(token, user));
    }

    @Test
    void tokenAlterado_DebeFallar() {
        String token = jwtService.generateToken(user) + "x";
        assertThrows(Exception.class, () -> jwtService.extractUsername(token));
    }
}
