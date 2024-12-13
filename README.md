# Aplicación

## Interfaz de usuario

- El cliente se puede registrar con su correo electrónico y una
  contraseña. Una vez registrado exitosamente puede iniciar sesión.

- La página renderiza el correo electrónico del usuario a la derecha
  del encabezado.

- Por defecto el perfil lleva como nombre "Jacques Cousteau", como
  descripción "Explorador" y como avatar una foto de este famoso
  personaje. El usuario conectado puede editar y guardar su perfil
  ingresando su nombre y descripción, también cambiar su avatar a
  través de los popup's de edición de perfil correspondientes.

- Esta aplicación se trata de crear tarjetas de los lugares que el
  usuario ha explorado. El botón para crear una tarjeta abre un
  popup donde el usuario puede ingresar la url de la fotografía
  que desee junto con el título de la tarjeta.

- Las tarjetas creadas tienen un corazón para que los usuarios
  puedan dar un "me gusta" a la tarjeta. También hay un botón para
  eliminar la tarjeta creada por el usuario, el cual de renderiza
  únicamente para el usuario dueño de la tarjeta; los usuarios no
  pueden borrar las tarjetas que no hayan sido creadas por ellos.

- A la derecha del encabezado de página, junto al correo del usuario,
  hay un botón para que el usuario pueda cerrar sesión. Mientras no
  se cierre la sesión, no habrá necesidad de volver a iniciar sesión
  durante una semana.

## Funcionalidad

### Enrutamiento:

- Se ha instalado e importado la última versión de react-router-dom
  que proporciona el componente integrado Routes para envolver las rutas,
  comparándolas de manera exclusiva y renderizando sólo una de ellas en
  cada ruta.

- El componente integrado Route se utiliza tres veces, una para cada
  componente creado, Main, login y register. Cada ruta con su
  respectivo endpoint.

- Se creó el componente ProtectedRoute que, como bien dice su nombre,
  protege la ruta raíz que contiene toda la interfaz principal de la
  página y su funcionalidad en el componente Main. ProtectedRoute hace
  uso del componente integrado Navigate que redirige al usuario a
  iniciar sesión si no lo ha hecho aún, dependiendo de la variable de
  estado loggedIn. El children de ProtectedRoute es Main, junto con
  los componentes encargados de renderizar sus popups.

- Debido a la creación de componentes funcionales, también se utiliza
  el hook useNavigate para dirigir a los usuarios a las diferentes rutas.
  Por ejemplo: Cuando un usuario se registra exitosamente, se abre un
  popup con un mensaje de éxito; al cerrar este popup, se redirige
  al usuario a la ruta login para que inicie sesión.

### Registro e inicio de sesión:

- El componente Register, a través de sus variables de estado y
  manejadores de cambio en los inputs, se encarga de que los usuarios
  puedan registrarse ingresando su correo y contraseña.
  Una vez registrados los usuarios correctamente, pueden iniciar sesión
  en el componente Login, que también a través de las variables de
  estado y manejadores correspondientes permiten el correcto
  inicio de sesión, de lo contrario se otorga un mensaje de error
  en ambos componentes.

- En caso de que el usuario tenga éxito o no al registrarse, el
  componente InfoToolTips tiene un par de childrens que consisten
  en ventanas modales que muestran un mensaje correspondiente.

### Autenticación:

Se ha creado un archivo en el directorio utils llamado auth.js, el
cual contiene las peticiones fetchs al backend para el registro,
el inicio de sesión que guarda en el almacenamiento local el token
proporcionado por el backend en la respuesta exitosa. También hay
un fetch que envía el Bearer token al backend para que lo revise
y de la autorización al usuario de ingresar a la página web sin
tener que iniciar sesión nuevamente. En caso de que el token sea
inválido se redirige al usuario a la vista de inicio de sesión.

### Validación de formularios:

Validación de formularios a través de la librería React Hook Form.
El hook useForm contiene un registro para los inputs, un manejo
de errores, un controlador de envío y un resetéo de ser necesario.
La función yupResolver maneja las reglas para cada una de las
entradas de los inputs establecidas en sus esquemas correspondientes,
estas reglas se especifican dentro del objeto yup.object. El mensaje
de error se renderiza debajo de los inputs.

## Herramientas y tecnologías:

React, React router dom, React hook form, Yup.

## Dominio:

https://aroundnat.jumpingcrab.com

# Servidor

Se utilizó el servicio de MongoDB Atlas para crear una
base de datos llamada "aroundb" alojada en la web.

Conexión establecida al servidor de MongoDB a través de
mongoose con el método connect en el archivo de entrada
de la aplicación app.js.

## Esquemas y modelos

### 1. Esquema y modelo de usuarios:

- Dos campos obligatorios de tipo sting, uno para el correo
  y otro para la contraseña, ambos son requeridos para el
  registro e inicio de sesión del cliente. Los campos "name",
  "about" y "avatar" tienen valores por defecto que luego el
  usuario podrá actualizar. El campo avatar cuenta con una
  lógica de validación, la cual emplea la escritura de una
  expresión regular que valida un string de opciones de url.
  El campo email utiliza la validación de la librería
  "Validator". El modelo de este esquema fue nombrado y
  exportado como "user".

### 2. Esquema y modelo de cartas:

- Dos campos de tipo string obligatorios para el nombre y el
  link de las cartas. El tercer campo requerido es owner que
  es de tipo ObjectId, almacena el id del usuario que creó la
  carta haciendo referencia al esquema del modelo user.
  El campo likes es un array también de tipo ObjectId que
  contiene los id de los usuarios que han dado "like" a la
  carta, su valor por defecto es un array vacío.
  Por último el campo createdAt es de tipo Date valor por
  defecto Date.now que indica la fecha y hora en que la
  carta fue creada. El modelo de este esquema fue nombrado
  y exportado como "card".

## Controladores de ruta:

### 1. Usuarios:

- Siete funciones para los controladores de ruta para los
  usuarios, cada una con un método especifico del modelo User.
  Estos controladores pueden obtener la lista de usuarios,
  encontrar un usuario por su id, crear un usuario en la base
  de datos, obtener la información del usuario creado, iniciar
  sesión con los datos del usuario registrado, editar el nombre
  y ocupación del usuario creado, y actualizar su avatar.

### 2. Cartas:

- Cinco funciones para los controladores de ruta para las
  cartas, cada una con un método especifico del modelo Card.
  Estos controladores pueden obtener la lista de cartas,
  encontrar una carta por su id, crear una carta en la base
  de datos, registrar un id de usuario en el array del campo
  likes del esquema de cartas, como también removerlo.

## Manejo de errores:

Cada una de estas funciones de los controladores de ruta
cuenta con su manejo de errores personalizado. Las
funciones encargadas de encontrar usuarios o cartas por su
id y ejecutar una acción de acuerdo a ellas, cuentan con el
método ayudante para el manejo de errores llamado orFail,
el cual optimiza el código al ejecutarse cuando no se
encuentra dicho id, arrojando una instancia del error
correspondiente e impidiendo que then devuelva null con un
estado 200 ok. Cada función tiene su manejo de error
personalizado, el cual si ocurre se deriva al bloque catch
donde next lo espera para ser delegado al middleware de
errores que gestiona cada uno de ellos.

## Autorización:

- La función que crea un usuario recibe el correo y la
  contraseña del cliente. Al registrarse exitosamente se
  crea el usuario y queda guardado en la base de datos, su
  contraseña se guarda encriptada gracias al uso de bcrypt.

- El esquema del modelo "user" contiene una función que
  cuando el usuario inicia sesión, se comprueba que su email
  esté registrado en la base de datos, si lo está, entonces
  bcrypt compara la contraseña ingresada en la solicitud con
  la contraseña del usuario registrado, si estas coinciden, se
  habrá iniciado sesión.

- Cuando el usuario inicia sesión exitosamente se activa
  una función que genera un token, el cual es enviado al
  navegador para que lo guarde en su almacenamiento local.
  Este token es administrado por la aplicación que luego
  lo envía de vuelta al servidor para su verificación.

- Se implementó un middleware de autorización el cual recibe
  el token enviado en el encabezado de la solicitud para
  verificar su validez. Si el token es válido se guarda en la
  variable "playload" la cual se asigna a "req.user" que
  contiene el id del usuario que inició sesión, este se asigna
  a las funciones que requieren el id del usuario para saber
  cual de ellos fue quien editó su perfil, creó cartas y les
  dio "me gusta". Este middleware se ubica en app.js justo
  después de los middlewares de registro e inicio de sesión y
  antes de los que permiten las solicitudes para editar el
  perfil del usuario y la creación de cartas. Esto asegura
  que únicamente los usuarios autorizados puedan iniciar
  sesión y tener acceso a la interfaz de la página web.

## CORS:

Esta tecnología evita que nuestro servidor reciba
solicitudes de dominios que no están permitidos.
Se especifican en un array los dominios que podrán enviar
solicitudes al servidor. En el middleware correspondiente
se gestionan las solicitudes simples y preliminares, donde
los métodos y encabezados permitidos dan paso a una
respuesta exitosa.

## Celebrate:

Una librería de validación que permite que las solicitudes
a las rutas tengan validez antes de pasar a los controladores,
si la solicitud no pasa la validación el controlador no se
activa en absoluto. Esto evita la sobrecarga de recursos.

## Registros:

Se ha implementado la tecnología de winston y express winston
para gestionar un registro para cada solicitud que entra al
servidor, así como también para cada error que pueda ocurrir.
Esto nos da la opción de llevar una guía para la solución
de posibles problemas con el funcionamiento de la api.

## Herramientas y tecnologías:

Express, Node, Mongodb Atlas, Nodemon, Bcrypt, Celebrate, Cors,
Dotenv, Winston, Jsonwebtoken, Validator, Eslint.

# Instalación

1. Clonar el repositorio de Github:

```bash
   git clone git@github.com:Charleandresb/web_project_api_full.git
```

2. Cambiar de directorio:

```bash
   cd Backend
```

```bash
   cd Frontend
```

3. Instalar paquetes:

```bash
   npm install
```
