export default function Validation(values) {
    const errors = {};
  
    // Validación del nombre
    if (!values.nombre) {
      errors.nombre = 'El nombre es requerido';
    } else if (values.nombre.length < 1) {
      errors.nombre = 'El nombre debe tener al menos una letra';
    } else if (values.nombre.length > 30) {
      errors.nombre = 'El nombre no puede tener más de 30 letras';
    }
  
    // Validación del email
    if (!values.email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'El email es inválido';
    }
  
    // Agrega aquí las validaciones para los demás campos...
  
    return errors;
  }