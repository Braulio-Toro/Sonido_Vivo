package cl.duoc.sonido_vivo.util;

import cl.duoc.sonido_vivo.model.Cliente;
import cl.duoc.sonido_vivo.model.Producto;
import cl.duoc.sonido_vivo.model.Venta;
import net.datafaker.Faker;

import java.time.LocalDate;
import java.util.List;

public class TestDataFactory {

    private static final Faker faker = new Faker();
    private static final List<String> DOMINIOS = List.of("gmail.com", "duoc.cl", "profesor.duoc.cl");
    private static final List<String> INSTRUMENTOS = List.of("Guitarra", "Bajo", "Batería", "Teclado", "Violín");

    public static Cliente crearClienteValido(Long id) {
        Cliente c = new Cliente();
        c.setId(id);
        c.setRut(generarRut());
        c.setNombre(faker.name().firstName() + " " + faker.name().lastName());
        c.setCorreo(faker.internet().username().replaceAll("[^a-zA-Z0-9._]", "")
                + faker.number().digits(3) + "@" + DOMINIOS.get(faker.number().numberBetween(0, DOMINIOS.size())));
        c.setTelefono("+569" + faker.number().digits(8));
        c.setFechaNacimiento(faker.timeAndDate().birthday(18, 60));
        c.setInstrumento(INSTRUMENTOS.get(faker.number().numberBetween(0, INSTRUMENTOS.size())));
        c.setPassword("Clave" + faker.number().digits(4));
        c.setRol("USER");
        return c;
    }

    public static Producto crearProductoValido(Long id) {
        Producto p = new Producto();
        p.setId(id);
        p.setCodigo("PRD-" + faker.number().digits(6));
        p.setNombre(faker.commerce().productName());
        p.setCategoria(faker.commerce().department());
        p.setMarca(faker.company().name());
        p.setPrecio(faker.number().numberBetween(1000, 500000));
        p.setStock(faker.number().numberBetween(0, 100));
        p.setDescripcion(faker.lorem().sentence());
        return p;
    }

    public static Venta crearVentaValida(Long id) {
        Venta v = new Venta();
        v.setId(id);
        v.setClienteId(1L);
        v.setProductoId(1L);
        v.setCantidad(faker.number().numberBetween(1, 11));
        v.setTotal(faker.number().numberBetween(1000, 1000000));
        v.setFecha(LocalDate.now());
        v.setEstado("PAGADO");
        return v;
    }

    // RUT chileno con dígito verificador válido
    private static String generarRut() {
        int numero = faker.number().numberBetween(10_000_000, 25_000_000);
        int suma = 0, mult = 2, tmp = numero;
        while (tmp > 0) {
            suma += (tmp % 10) * mult;
            mult = mult == 7 ? 2 : mult + 1;
            tmp /= 10;
        }
        int resto = 11 - (suma % 11);
        String dv = resto == 11 ? "0" : resto == 10 ? "K" : String.valueOf(resto);
        return numero + "-" + dv;
    }
}