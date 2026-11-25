package cl.duoc.sonido_vivo.service;

import cl.duoc.sonido_vivo.model.Venta;
import cl.duoc.sonido_vivo.repository.VentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VentaService {

    private final VentaRepository ventaRepository;

    public List<Venta> obtenerTodos() {
        return ventaRepository.findAll();
    }

    public Venta buscarPorId(Long id) {
        return ventaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));
    }

    public Venta guardar(Venta venta) {
        venta.setId(null);
        if (venta.getFecha() == null) {
            venta.setFecha(java.time.LocalDate.now());
        }
        if (venta.getEstado() == null || venta.getEstado().isBlank()) {
            venta.setEstado("PAGADO");
        }
        return ventaRepository.save(venta);
    }

    public Venta actualizar(Long id, Venta datos) {
        Venta existente = buscarPorId(id);
        existente.setClienteId(datos.getClienteId());
        existente.setProductoId(datos.getProductoId());
        existente.setCantidad(datos.getCantidad());
        existente.setCuponCodigo(datos.getCuponCodigo());
        existente.setTotal(datos.getTotal());
        if (datos.getFecha() != null) {
            existente.setFecha(datos.getFecha());
        }
        if (datos.getEstado() != null && !datos.getEstado().isBlank()) {
            existente.setEstado(datos.getEstado());
        }
        return ventaRepository.save(existente);
    }

    public void eliminar(Long id) {
        buscarPorId(id);
        ventaRepository.deleteById(id);
    }
}
