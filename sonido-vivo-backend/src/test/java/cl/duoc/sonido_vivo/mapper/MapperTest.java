package cl.duoc.sonido_vivo.mapper;

import cl.duoc.sonido_vivo.dto.ClienteDTO;
import cl.duoc.sonido_vivo.dto.ClienteRequestDTO;
import cl.duoc.sonido_vivo.dto.ProductoDTO;
import cl.duoc.sonido_vivo.dto.ProductoRequestDTO;
import cl.duoc.sonido_vivo.dto.VentaDTO;
import cl.duoc.sonido_vivo.dto.VentaRequestDTO;
import cl.duoc.sonido_vivo.model.Cliente;
import cl.duoc.sonido_vivo.model.Producto;
import cl.duoc.sonido_vivo.model.Venta;
import cl.duoc.sonido_vivo.repository.ClienteRepository;
import cl.duoc.sonido_vivo.repository.ProductoRepository;
import cl.duoc.sonido_vivo.util.TestDataFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MapperTest {

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private ProductoRepository productoRepository;

    @Test
    void productoMapper_RequestAEntidadYDTO() {
        ProductoMapper mapper = new ProductoMapper();
        ProductoRequestDTO request = new ProductoRequestDTO(
                " SV-TST-001 ", " Guitarra de prueba ", "Guitarras", " Marca ", 1000, 3, " Descripción ", null);

        Producto entidad = mapper.toEntity(request);
        entidad.setId(7L);
        ProductoDTO dto = mapper.toDTO(entidad);

        assertEquals("SV-TST-001", dto.codigo());
        assertEquals("Guitarra de prueba", dto.nombre());
        assertEquals(7L, dto.id());
        assertEquals(1000, dto.precio());
        assertEquals("/img/producto-generico.png", dto.imagen());   // imagen genérica por defecto
    }

    @Test
    void clienteMapper_RegistroSiempreQuedaComoUser() {
        ClienteMapper mapper = new ClienteMapper();
        ClienteRequestDTO request = new ClienteRequestDTO("190110229", "Juan Pérez", "juan@gmail.com",
                "", LocalDate.of(2000, 5, 10), "Bajo", "Intermedio", "1234");

        Cliente entidad = mapper.toEntity(request);

        assertEquals("USER", entidad.getRol());
        assertNull(entidad.getTelefono());          // teléfono vacío se guarda como null
        assertEquals("1234", entidad.getPassword()); // el controlador lo cifra antes de guardar
    }

    @Test
    void clienteMapper_DTOnoExponeLaContrasena() {
        ClienteMapper mapper = new ClienteMapper();
        Cliente cliente = TestDataFactory.crearClienteValido(5L);

        ClienteDTO dto = mapper.toDTO(cliente);

        assertEquals(5L, dto.id());
        assertEquals(cliente.getCorreo(), dto.correo());
        assertEquals("USER", dto.rol());
        for (var componente : ClienteDTO.class.getRecordComponents()) {
            assertNotEquals("password", componente.getName());
        }
    }

    @Test
    void ventaMapper_IncluyeNombreDeClienteYProducto() {
        Cliente cliente = TestDataFactory.crearClienteValido(2L);
        Producto producto = TestDataFactory.crearProductoValido(1L);
        when(clienteRepository.findById(2L)).thenReturn(Optional.of(cliente));
        when(productoRepository.findById(1L)).thenReturn(Optional.of(producto));
        VentaMapper mapper = new VentaMapper(clienteRepository, productoRepository);

        Venta venta = TestDataFactory.crearVentaValida(9L);
        venta.setClienteId(2L);
        venta.setProductoId(1L);
        VentaDTO dto = mapper.toDTO(venta);

        assertEquals(9L, dto.id());
        assertEquals(cliente.getNombre(), dto.clienteNombre());
        assertEquals(producto.getNombre(), dto.productoNombre());
    }

    @Test
    void ventaMapper_RequestUsaEstadoPagadoPorDefectoYFechaDeHoy() {
        VentaMapper mapper = new VentaMapper(clienteRepository, productoRepository);
        VentaRequestDTO request = new VentaRequestDTO(2L, 1L, 2, " ", 5000, null);

        Venta venta = mapper.toEntity(request);

        assertEquals("PAGADO", venta.getEstado());
        assertEquals(LocalDate.now(), venta.getFecha());
        assertNull(venta.getCuponCodigo());
    }
}
