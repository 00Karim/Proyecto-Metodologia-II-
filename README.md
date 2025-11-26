# TripMate

**_Pagina para organizar viajes colaborativos_**

### Integrantes

Karim Velez - karimveleza@gmail.com
Franco Baudrix Fernandez - francobaudrix@gmail.com
Jesica Pellegrini - jesicapellegrini@gmail.com
Federico Ruppel - federupel@gmail.com

---

### Descripcion de entidades

**Trip**
Trip va a ser la entidad que representa el viaje que planea un usuario. Otros usuarios podran unirse a este viaje. La entidad viaje va a tener los atributos suficientes para ser lo mas descriptivo posible, asi los usuarios pueden decidir con certeza si quieren participar de este viaje o no.

**User**
Va ser la entidad que vamos a usar para representar a los usuarios de la app. Uno de los atributos de el user van a ser los permisos, los cuales van a variar dependiendo del rol de el usuario dentro de un Trip. Va a haber una distincion entre usuarios que sean considerados Administradores de un Trip, participantes de un Trip y usuarios que interactuen con el software pero no con un objeto de Trip.

**Activity**
Activity es una entidad que representa una actividad dentro de un viaje. Si Pepito crea un viaje a Irak luego Pepito, o cualquier usuario que se haya unido al viaje, puede crear una actividad que se llame "Jugar al futbol" por ejemplo y esta actividad se va a agregar al viaje. Asi los otros usuarios pueden saber de que se va a tratar este viaje y que cosas van a hacer. Igualmente, para que una actividad sea agregada al Trip, va a tener que pasar por un proceso de votacion donde los participantes del Trip van a tener que llegar a un voto mayoritario a favor.

### Planeacion

**Esquema**
Como el DBML fue hecho para usarse con bases de datos relacionales y nosotros vamos a usar MongoDB (no relacional) entonces vamos a usar el Mongoose Schema para representar las entidades en vez de DBML.

```js
const Permissions = Object.freeze({
  ADMIN: [
    "eliminarParticipante",
    "agregarParticipante",
    "crearActividad",
    "borarActividad",
    "borrarTrip",
    "votar",
  ],
  PARTICIPANT: ["crearActividad", "votar"],
  USER: ["createTrip"],
});
```

```js
const User = new Schema({
  nombre: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  permisos: {
    type: [String],
    enum: Object.values(Permissions),
    default: [Permissions.USER],
    required: true,
  },
});
```

```js
const Activity = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  votos: { type: Number, min: 0 },
});
```

```js
const Trip = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    origen: {type: String, required: true},
    destino: {type: String, required: true},
    participantes:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                default: ["Sin participantes"]
            }
        ],
    administradores:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ]
    actividades:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Activity",
                default: ["Sin actividades planeadas"]
            }
        ]
})
```

**Diagrama de entidades**
<img src="./src/assets/img/diagramaUML.png">

**Patrones de diseno**
Vamos a usar los patrones de diseno, Singleton, Observer y Factory.
El patron Singleton lo vamos a usar para estructurar la conexion a la base de datos de mongoDB.
El patron Observer lo vamos a usar para proveer un servicio que mande un mail al usuario, siempre y cuando se haya suscrito a este servicio, avisandole cuando algun usuario agrego una actividad al Trip del que el forma parte. De esta forma lograremos que el proceso de votacion para la aprobacion de una actividad sea mas rapida.
El patron Factory lo vamos a aplicar en la clase Activity. Actualmente no esta diseniado, pero tenemos pensado hacer distintas clases de Activities, por ejemplo: Trekking o Tour historico. Ambos van a tener atributos muy diferentes por lo que nos parecio conveniente agregar ese detalle y aplicar ese patron.
