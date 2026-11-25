package cl.duoc.sonido_vivo.mapper;

import cl.duoc.sonido_vivo.dto.VentaDTO;
import cl.duoc.sonido_vivo.dto.VentaRequestDTO;
import cl.duoc.sonido_vivo.model.Cliente;
import cl.duoc.sonido_vivo.model.Producto;
import cl.duoc.sonido_vivo.model.Venta;
import cl.duoc.sonido_vivo.repository.ClienteRepository;
import cl.duoc.sonido_vivo.repository.ProductoRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class VentaMapper {

    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;

    public VentaMapper(ClienteRepository clienteRepository, ProductoRepository productoRepository) {
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }

    public Venta toEntity(VentaRequestDTO dto) {
        Venta v = new Venta();
        v.setClienteId(dto.clienteId());
        v.setProductoId(dto.productoId());
        v.setCantidad(dto.cantidad());
        v.setCuponCodigo(dto.cuponCodigo() == null || dto.cuponCodigo().isBlank() ? null : dto.cuponCodigo().trim());
        v.setTotal(dto.total());
        v.setFecha(LocalDate.now());
        v.setEstado(dto.estado() == null || dto.estado().isBlank() ? "PAGADO" : dto.estado());
        return v;
    }

    /** Incluye el nombre del cliente y del producto (si alguno ya no existe, queda en null). */
    public VentaDTO toDTO(Venta v) {
        String clienteNombre = clienteRepository.findById(v.getClienteId()).map(Cliente::getNombre).orElse(null);
        String productoNombre = productoRepository.findById(v.getProductoId()).map(Producto::getNombre).orElse(null);
        return new VentaDTO(v.getId(), v.getClienteId(), clienteNombre, v.getProductoId(), productoNombre,
                v.getCantidad(), v.getCuponCodigo(), v.getTotal(), v.getFecha(), v.getEstado());
    }
}
