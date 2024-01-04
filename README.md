
# Luquiando Barber

Es un proyecto creado con NextJs y Prisma. En esta aplicacion web se puede :

- Registrar usuarios
- Iniciar sesion
- Reservar
- Pagar la Reserva con Mercado Pago

Cuando uno Paga el turno ya es reservado y el horario que solicito se deshabilita en la aplicación


## Tecnologias que se utilizaron
Para este proyecto se uso :
- NextJs
- Prisma con postgresql para el manejo de la base de datos y almacenamiento de la informacion
- NextAuth para el manejo de autenticacion a traves de creedenciales y un middleware para proteger las rutas, en donde si o si hay que estar autenticado para ingresar.
- NextUi para el manejo de componentes
- Mercado Pago para pagar las reservas
- React calendar para seleccionar las fechas
- React hook form para manejar los formularios de registro y login
- TailwindCss para el diseño de la aplicacion


## Como usar la aplicacion en localhost

Para correr este proyecto primero debes clonarlo, luego de clonarlo debes instalar todas las dependencias con npm install.

Las variables de entorno que debes utilizar son: 

`DATABASE_URL` esta variable es para la base de datos postgresql

`MERCADOPAGO_ACCESSTOKEN` para poder usar la api de prueba de mercado pago

`NEXTAUTH_URL` es la url de tu proyecto por ejemplo : http://localhost:3000

`NEXTAUTH_SECRET` hace referencia a una contraseña.