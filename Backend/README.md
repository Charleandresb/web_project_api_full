# Tripleten web_project_around_express

Proyecto para crear una base de datos para Around USA.

Se utilizó el servicio de MongoDB Atlas para crear una
base de datos llamada "aroundb" alojada en la web.

Conexión establecida al servidor de MongoDB a través de
mongoose con el método connect en el archivo de entrada
de la aplicación app.js.

Se crearon esquemas y modelos para la creación de usuarios
y cartas:

Esquema y modelo de usuarios:
Tres campos obligatorios de tipo sting, uno para el nombre,
uno para la información y otro para el avatar. El campo
avatar cuenta con una lógica de validación, la cual emplea
la escritura de una expresión regular que valida un string
de opciones de url. El modelo de este esquema fue nombrado
y exportado como "user".

Esquema y modelo de cartas:
Dos campos de tipo string obligatorios para el nombre y el
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

Implementación de controladores de ruta:

Usuarios:
Cinco funciones para los controladores de ruta para los
usuarios, cada una con un método especifico del modelo User.
Estos controladores pueden obtener la lista de usuarios,
encontrar un usuario por su id, crear un usuario en la base
de datos, editar el nombre y ocupación del usuario creado,
y actualizar su avatar.

Cartas:
Cinco funciones para los controladores de ruta para las
cartas, cada una con un método especifico del modelo Card.
Estos controladores pueden obtener la lista de cartas,
encontrar una carta por su id, crear una carta en la base
de datos, registrar un id de usuario en el array del campo
likes del esquema de cartas, como también removerlo.

Cada una de estas funciones de los controladores de ruta
cuenta con su manejo de errores correspondiente. Las
funciones encargadas de encontrar usuarios o cartas por su
id y ejecutar una acción de acuerdo a ellas, cuentan con el
método ayudante para el manejo de errores llamado orFail,
el cual optimiza el código al ejecutarse cuando no se
encuentra dicho id, arrojando una instancia del objeto Error
e impidiendo que then devuelva null con un estado 200 ok,
pasando directamente al bloque catch que muestra el
correspondiente código de estado de error y su mensaje.

Solución para la autorización temporal:

Se implementó un middleware en app.js, el cual agrega un
objeto user a las peticiones haciendo hadcoding en el
id de usuario que aparecerá como autor de las cartas
en la base de datos, el campo owner de las cartas tendrá
esta id sin importar quien las haya creado de verdad.

![alt text](<Captura de pantalla 2024-10-17 141408.png>)

Como ves en la captura de pantalla, yo si puedo correr
el proyecto con npm run dev que ejecuta nodemon. También
comprobé que funcionaran las request de las rutas antes
de enviar el proyecto a revisión. La verdad no se como
corregir el error que me dices, quizás podrías darme
alguna sugerencia de como hacerlo.

Solución:
MongoDB Atlas, netwwork access 0.0.0.0/0 (IP Global)

env:

DIREC_AROUND_MONGODB_ATLAS="mongodb+srv://charlesb:50lD0mil%40@cluster0.t5jkb.mongodb.net/aroundb?retryWrites=true&w=majority&appName=Cluster0"

SECRET_KEY="227e1fc3185ce3033f7d10209412fb64194b2831fe7eb92c5dfd970168c24722"
