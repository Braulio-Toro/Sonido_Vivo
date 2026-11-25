package cl.duoc.sonido_vivo.service;

import cl.duoc.sonido_vivo.model.Producto;
import cl.duoc.sonido_vivo.repository.ProductoRepository;
import cl.duoc.sonido_vivo.util.TestDataFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    @Test
    void obtenerTodos_DebeRetornarListaDeProductosGenerados() {
        List<Producto> productos = List.of(
                TestDataFactory.crearProductoValido(1L),
                TestDataFactory.crearProductoValido(2L)
        );
        when(productoRepository.findAll()).thenReturn(productos);

        List<Producto> resultado = productoService.obtenerTodos();

        assertEquals(2, resultado.size());
        verify(productoRepository, times(1)).findAll();
    }

    @Test
    void buscarPorId_CuandoExiste_DebeRetornarProducto() {
        Producto producto = TestDataFactory.crearProductoValido(1L);
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));

        Producto encontrado = productoService.buscarPorId(1L);

        assertEquals(1L, encontrado.getId());
        assertEquals(producto.getCodigo(), encontrado.getCodigo());
        assertTrue(encontrado.getPrecio() > 0);
    }

    @Test
    void guardar_ConDatosValidosDeFaker_DebePersistirProducto() {
        Producto nuevo = TestDataFactory.crearProductoValido(null);

        when(productoRepository.save(any(Producto.class))).thenAnswer(inv -> {
            Producto p = inv.getArgument(0);
            p.setId(15L);
            return p;
        });

        Producto guardado = productoService.guardar(nuevo);

        assertNotNull(guardado.getId());
        assertTrue(guardado.getStock() >= 0);
        verify(productoRepository, times(1)).save(nuevo);
    }

    @Test
    void eliminar_CuandoExiste_DebeEliminarProducto() {
        Producto existente = TestDataFactory.crearProductoValido(1L);
        when(productoRepository.findById(1L)).thenReturn(Optional.of(existente));

        productoService.eliminar(1L);

        verify(productoRepository, times(1)).delete(existente);
    }
}