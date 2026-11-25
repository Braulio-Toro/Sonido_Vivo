package cl.duoc.sonido_vivo.service;

import cl.duoc.sonido_vivo.model.Cliente;
import cl.duoc.sonido_vivo.repository.ClienteRepository;
import cl.duoc.sonido_vivo.util.TestDataFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    @Test
    void obtenerTodos_DebeRetornarListaDeClientesGenerados() {
        List<Cliente> clientes = List.of(
                TestDataFactory.crearClienteValido(1L),
                TestDataFactory.crearClienteValido(2L)
        );
        when(clienteRepository.findAll()).thenReturn(clientes);

        List<Cliente> resultado = clienteService.obtenerTodos();

        assertEquals(2, resultado.size());
        verify(clienteRepository, times(1)).findAll();
    }

    @Test
    void buscarPorId_CuandoExiste_DebeRetornarCliente() {
        Cliente cliente = TestDataFactory.crearClienteValido(1L);
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        Cliente encontrado = clienteService.buscarPorId(1L);

        assertEquals(1L, encontrado.getId());
        assertEquals(cliente.getRut(), encontrado.getRut());
        assertEquals(cliente.getCorreo(), encontrado.getCorreo());
    }

    @Test
    void guardar_ConDatosValidosDeFaker_DebePersistirCliente() {
        Cliente nuevo = TestDataFactory.crearClienteValido(null);

        when(clienteRepository.save(any(Cliente.class))).thenAnswer(inv -> {
            Cliente c = inv.getArgument(0);
            c.setId(10L);
            return c;
        });

        Cliente guardado = clienteService.guardar(nuevo);

        assertNotNull(guardado.getId());
        assertTrue(guardado.getCorreo().matches("^[a-zA-Z0-9._%+-]+@(gmail\\.com|duoc\\.cl|profesor\\.duoc\\.cl)$"));
        assertTrue(guardado.getTelefono().matches("^\\+569[0-9]{8}$"));
        verify(clienteRepository, times(1)).save(nuevo);
    }

    @Test
    void eliminar_CuandoExiste_DebeEliminarCliente() {
        Cliente existente = TestDataFactory.crearClienteValido(1L);
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(existente));

        clienteService.eliminar(1L);

        verify(clienteRepository, times(1)).deleteById(1L);
    }
}