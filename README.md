# Proyecto Hotel

**Autoras:** Adriana Borja, Genesis Tito, Camila Quirola
**NRC:** 1406

Este proyecto es una aplicación web para la gestión de un hotel. Permite a los usuarios realizar reservas, gestionar habitaciones y administrar clientes.

## Características

- **Reservas**: Los usuarios pueden realizar reservas de habitaciones, seleccionando habitaciones disponibles y clientes registrados.
- **Habitaciones**: Administración del tipo y precio de las habitaciones.
- **Clientes**: Gestión de la información de los clientes.

## Funcionalidades


**Clientes**
- **Agregar clientes:** Registra un cliente nuevo proporcionando nombre, apellido y correo.
- **Actualizar clientes:** Edita los datos de un cliente existente.
- **Eliminar clientes:** Elimina un cliente del listado.
- **Validación:** Verifica que los campos estén completos y que el correo tenga un formato válido.

**Habitaciones**
- **Tipo de habitación:** Se puede escoger el tipo de habitación como: simple, doble, suit
- **Precio:** Permite establecer un costo por noche de la habitación.
- **Agregar habitaciones:** Permite añadir nuevas habitaciones especificando sus características.
- **Actualizar habitaciones:** Modifica la información de una habitación existente.
- **Eliminar habitaciones:** Elimina una habitación del sistema.

**Reservas**
- **Crear reservas:** Permite a los usuarios reservar habitaciones especificando fechas y preferencias.
- **Actualizar reservas:** Modifica los detalles de una reserva existente.
- **Cancelar reservas:** Permite cancelar una reserva previamente realizada.
- **Consultar reservas:** Muestra un listado de todas las reservas realizadas por un usuario.
- **Validación:** Verifica que la fecha de inicio de la reserva sea correcta, es decir mayor o igual a la fecha actual.
Tambien, valida si la habitacion seleccionada esta disponible en el rango de fechas establecido, caso contrario muestra un alert 
con el error.

## Instalación

1. Clona el repositorio:

   Primero git init

   git clone https://github.com/adryborja/HOTEL.git 

2. Navega al directorio del proyecto:

   cd hotel

3. Instala las dependencias con los comandos:

   npm install react-router-dom
   
   npm run dev

4. Si la instalacion fue correcta aparecera se levantara el puerto correspondiente:
  Por ejemplo: Local:   http://localhost:5175/



