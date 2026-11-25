package cl.duoc.sonido_vivo.security;

import cl.duoc.sonido_vivo.model.Cliente;
import cl.duoc.sonido_vivo.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final ClienteRepository clienteRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Cliente cliente = clienteRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Cliente no encontrado: " + correo));

        String roleName = "ROLE_" + cliente.getRol().toUpperCase();
        return new User(
                cliente.getCorreo(),
                cliente.getPassword(),
                List.of(new SimpleGrantedAuthority(roleName))
        );
    }
}