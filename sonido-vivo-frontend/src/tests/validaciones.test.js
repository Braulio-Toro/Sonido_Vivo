import { describe, it, expect } from 'vitest';
import {
  validarNombre, validarRut, validarCorreo, validarFono, calcularEdad,
  validarFechaNacimiento, validarPassword, limpiarFono, validarRegistro,
} from '../utils/validaciones';

describe('validaciones de formulario', () => {
  it('rechaza un nombre con números', () => {
    // Arrange
    const nombre = 'Juan123';
    // Act
    const error = validarNombre(nombre);
    // Assert
    expect(error).toBe('El nombre debe contener solo letras y espacios.');
  });

  it('acepta un RUT sin puntos ni guion y rechaza uno con formato', () => {
    // Arrange
    const valido = '19011022K';
    const invalido = '19.011.022-K';
    // Act
    const r1 = validarRut(valido);
    const r2 = validarRut(invalido);
    // Assert
    expect(r1).toBe('');
    expect(r2).not.toBe('');
  });

  it('rechaza correos con dominio no permitido', () => {
    // Arrange
    const correo = 'juan@hotmail.com';
    // Act
    const error = validarCorreo(correo);
    // Assert
    expect(error).toContain('@gmail.com');
  });

  it('el teléfono es opcional pero si se escribe debe ser +569 + 8 dígitos', () => {
    // Arrange / Act
    const vacio = validarFono('');
    const bueno = validarFono('+56912345678');
    const malo = validarFono('+5691234');
    // Assert
    expect(vacio).toBe('');
    expect(bueno).toBe('');
    expect(malo).not.toBe('');
  });

  it('limpiarFono elimina letras y signos + intermedios', () => {
    // Arrange
    const entrada = '+56a9+12';
    // Act
    const salida = limpiarFono(entrada);
    // Assert
    expect(salida).toBe('+56912');
  });

  it('calcula la edad considerando si ya cumplió años', () => {
    // Arrange
    const hoy = new Date(2026, 5, 14); // 14-jun-2026
    // Act
    const edad = calcularEdad('2000-06-15', hoy);
    // Assert
    expect(edad).toBe(25);
  });

  it('rechaza a un menor de edad en la fecha de nacimiento', () => {
    // Arrange
    const hoy = new Date(2026, 0, 1);
    // Act
    const error = validarFechaNacimiento('2015-01-01', hoy);
    // Assert
    expect(error).toMatch(/mayor de edad/);
  });

  it('valida el largo de la contraseña (4 a 10)', () => {
    // Arrange / Act / Assert
    expect(validarPassword('abc')).not.toBe('');
    expect(validarPassword('abcd')).toBe('');
    expect(validarPassword('12345678901')).not.toBe('');
  });

  it('validarRegistro exige los campos de contexto (instrumento y nivel)', () => {
    // Arrange
    const datos = { nombre: 'Ana', rut: '190110229', correo: 'ana@gmail.com', fono: '', fenac: '1995-01-01', instrumento: '', nivel: '', pass: '1234', pass2: '1234' };
    // Act
    const errores = validarRegistro(datos);
    // Assert
    expect(Object.keys(errores).sort()).toEqual(['instrumento', 'nivel']);
  });
});