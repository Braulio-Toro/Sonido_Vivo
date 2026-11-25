package cl.duoc.sonido_vivo.mapper;

import cl.duoc.sonido_vivo.dto.ClienteActualizarDTO;
import cl.duoc.sonido_vivo.dto.ClienteDTO;
import cl.duoc.sonido_vivo.dto.ClienteRequestDTO;
import cl.duoc.sonido_vivo.model.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {

    /** El rol siempre es USER: nunca se acepta desde el body de registro. La contraseña se codifica en el controlador. */
    public Cliente toEntity(ClienteRequestDTO dto) {
        Cliente c = new Cliente();
        c.setRut(dto.rut().trim());
        c.setNombre(dto.nombre().trim());
        c.setCorreo(dto.correo().trim());
        c.setTelefono(dto.telefono() == null || dto.telefono().isBlank() ? null : dto.telefono().trim());
        c.setFechaNacimiento(dto.fechaNacimiento());
        c.setInstrumento(dto.instrumento());
        c.setNivel(dto.nivel());
        c.setPassword(dto.password());
        c.setRol("USER");
        return c;
    }

    /** Entidad "de paso" con los datos nuevos; ClienteService.actualizar los copia sobre el cliente existente. */
    public Cliente toEntity(ClienteActualizarDTO dto) {
        Cliente c = new Cliente();
        c.setRut(dto.rut().trim());
        c.setNombre(dto.nombre().trim());
        c.setCorreo(dto.correo().trim());
        c.setTelefono(dto.telefono() == null || dto.telefono().isBlank() ? null : dto.telefono().trim());
        c.setFechaNacimiento(dto.fechaNacimiento());
        c.setInstrumento(dto.instrumento());
        c.setNivel(dto.nivel());
        c.setRol(dto.rol());
        return c;
    }

    public ClienteDTO toDTO(Cliente c) {
        return new ClienteDTO(c.getId(), c.getRut(), c.getNombre(), c.getCorreo(), c.getTelefono(),
                c.getFechaNacimiento(), c.getInstrumento(), c.getNivel(), c.getRol());
    }
}
