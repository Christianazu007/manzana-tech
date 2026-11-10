const mensajes = {
  'auth/invalid-credential': 'Email o contraseña incorrectos.',
  'auth/invalid-email': 'El email no es válido.',
  'auth/user-not-found': 'No existe una cuenta con ese email.',
  'auth/wrong-password': 'Email o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese email.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Probá de nuevo en unos minutos.',
  'auth/network-request-failed': 'No hay conexión. Revisá tu internet.',
  'auth/operation-not-allowed': 'El inicio de sesión con email no está habilitado en Firebase.',
  'permission-denied': 'No tenés permisos para hacer esta operación.',
  unavailable: 'No se pudo conectar con la base de datos.',
};

export const traducirError = (error) =>
  mensajes[error?.code] ?? 'Ocurrió un error inesperado. Intentá de nuevo.';
