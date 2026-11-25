package cl.duoc.sonido_vivo.service;

import cl.duoc.sonido_vivo.model.Venta;
import cl.duoc.sonido_vivo.repository.VentaRepository;
import cl.duoc.sonido_vivo.util.TestDataFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VentaServiceTest {

    @Mock private VentaRepository ventaRepository;
    @InjectMocks private VentaService ventaService;

    @Test
    void obtenerTodos_DebeRetornarLista() {
        when(ventaRepository.findAll()).thenReturn(List.of(
                TestDataFactory.crearVentaValida(1L), TestDataFactory.crearVentaValida(2L)));
        assertEquals(2, ventaService.obtenerTodos().size());
    }

    @Test
    void buscarPorId_CuandoNoExiste_DebeLanzar404() {
        when(ventaRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ResponseStatusException.class, () -> ventaService.buscarPorId(99L));
    }

    @Test
    void guardar_DebePersistirVenta() {
        Venta nueva = TestDataFactory.crearVentaValida(null);
        when(ventaRepository.save(any(Venta.class))).thenAnswer(inv -> {
            Venta v = inv.getArgument(0);
            v.setId(5L);
            return v;
        });
        Venta guardada = ventaService.guardar(nueva);
        assertNotNull(guardada.getId());
        assertTrue(guardada.getCantidad() >= 1 && guardada.getCantidad() <= 10);
    }

    @Test
    void eliminar_CuandoExiste_DebeEliminar() {
        when(ventaRepository.findById(1L)).thenReturn(Optional.of(TestDataFactory.crearVentaValida(1L)));
        ventaService.eliminar(1L);
        verify(ventaRepository, times(1)).deleteById(1L);
    }
}