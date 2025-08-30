# TripMate  
***Pagina para organizar viajes colaborativos***
### Integrantes
Karim Velez - karimveleza@gmail.com
Franco Baudrix - 
Jesica Pellegrini - jesicapellegrini@gmail.com
Federico Ruppel - federupel@gmail.com
---

### Descripcion de entidades

**User** 
User va a representar a los distintos usuarios de la pagina. Con la entidad usuario vamos a poder conectar a distintas personas en el sitio y darles las herramientas para crear y organizar sus viajes, para unirse a otros viajes, etc.

**Trip**
Trip va a ser la entidad que representa el viaje que planea un usuario. Otros usuarios podran unirse a este viaje. La entidad viaje va a tener los atributos suficientes para ser lo mas descriptivo posible, asi los usuarios pueden decidir con certeza si quieren participar de este viaje o no. 

**Activity** 
Activity es una entidad que representa una actividad dentro de un viaje. Si Pepito crea un viaje a Irak luego Pepito, o cualquier usuario que se haya unido al viaje, puede crear una actividad que se llame "Jugar al futbol" por ejemplo y esta actividad se va a agregar al viaje. Asi los otros usuarios pueden saber de que se va a tratar este viaje y que cosas van a hacer.

### Planeacion

**Esquema**
Como el DBML fue hecho para usarse con bases de datos relacionales y nosotros vamos a usar MongoDB (no relacional) entonces vamos a usar el Mongoose Schema para representar las entidades en vez de DBML.

```js
const User = new Schema({
    nombre: {type: String, required: true},
    mail: {type: String, required: true},
    contrasenia: {type: String, required: true}
})
```

```js
const Activity = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    votos: {type: Number, min: 0}
})
```

```js
const Trip = new Schema({
    origen: {type: String, required: true},
    destino: {type: String, required: true},
    participantes: [
        {
            type: Schema.Types.ObjectId, 
            ref: "User",
            default: ["Sin participantes"]
        }
    ],
    actividades: [
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


**Diseno del front**

