package cl.duoc.sonido_vivo.mapper;

import cl.duoc.sonido_vivo.dto.ProductoDTO;
import cl.duoc.sonido_vivo.dto.ProductoRequestDTO;
import cl.duoc.sonido_vivo.model.Producto;
import org.springframework.stereotype.Component;

@Component
public class ProductoMapper {

    public Producto toEntity(ProductoRequestDTO dto) {
        Producto p = new Producto();
        p.setCodigo(dto.codigo().trim());
        p.setNombre(dto.nombre().trim());
        p.setCategoria(dto.categoria());
        p.setMarca(dto.marca().trim());
        p.setPrecio(dto.precio());
        p.setStock(dto.stock());
        p.setDescripcion(dto.descripcion().trim());
        if (dto.imagen() != null && !dto.imagen().isBlank()) {
            p.setImagen(dto.imagen());
        }
        return p;
    }

    public ProductoDTO toDTO(Producto p) {
        return new ProductoDTO(p.getId(), p.getCodigo(), p.getNombre(), p.getCategoria(), p.getMarca(),
                p.getPrecio(), p.getStock(), p.getDescripcion(), p.getImagen());
    }
}
