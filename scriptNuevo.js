let bandera = 0;
let espada = 0;
let salir = false;
let muerte = false;
let victoria = false;
let logrosTotales = 0;
let puntaje = 0;
let turnoContador = 0;
let turno = "";
let nombre = prompt(
  "¡Una cordial bienvenida!\n\nPara comenzar, introduce tu nombre aquí debajo. ¡No te preocupes! No estarás firmando ningún contrato...\nPor ahora."
);
let logBruja = [];
let logDragon = [];

let logros = [`\n- *`, `\n- *`, `\n- *`, `\n- *`, `\n- *`, `\n- *`];
let logrosID = [false, false, false, false, false, false];

while ((nombre == "" || nombre == null) && bandera < 2) {
  nombre = prompt(
    "¡No quieras escaparte! Necesito tu nombre, prometo que no es para realizar un hechizo.\n\nPor favor, introduce tu nombre."
  );
  bandera++;
}
if (bandera == 2) {
  nombre = "Anónimo";
  registroLogro("Nombre");

  alert(
    `Parece que no confias en mi, no empezamos bien entonces. Te llamaré de ahora en más, Sir ${nombre}.`
  );
}

let inventario = {
  nombre: `Sir ${nombre}`,
  health: 10,
  iniciativa: 2,
  combat: 5,
  defensa: 3,
  coins: 0,
};
let bruja = {
  nombre: "Bruja",
  health: 2,
  iniciativa: 5,
  combat: 10,
  defensa: 1,
};

let dragon = {
  nombre: "Dragón",
  health: 2,
  iniciativa: 5,
  combat: 10,
  defensa: 1,
};

let caminos = [
  {
    id: 0,
    descripcion: `Sir ${nombre}, ¡un gusto conocerte! Has llegado en el momento indicado, necesitamos tu ayuda.\n\nDebes saber que en nuestro reino, Javascra, una terrible amenaza acecha en el temible castillo que tenemos delante.\n\nMira, te mostraré. Sígueme.`,
    categoria: "Intro",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.1],
  },
  {
    id: 0.1,
    descripcion: `Espera, antes que lo olvide, si en cualquier momento deseas salir del juego, solo escribe '13'. Recuerda ese número mágico, ya que no lo mencionaré más adelante. Es un número que en el reino de Javascra ha traido mucha mala suerte, y creemos que el dragón está aquí por ese mismo número.\n\nEspero que no tengas que usarlo. ¡Confío en ti!`,
    categoria: "Intro",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.2],
  },
  {
    id: 0.2,
    descripcion: `Presta mucha atención.\n\nVerás, el castillo que ves en el camino de adelante, es custodiado por un enorme dragón que lo ha invadido, y ha sacado a todos con su temible fuego hace algunas lunas llenas atrás. El castillo contaba con un puente que cruza el río, pero el fuego del dragón lo ha deshecho. Si tomas ese camino, no podrás regresar. ¡Pero necesitamos que vayas a por él! No estamos apurados, debo confesarte, pero nos gustaria que nos puedas ayudar.`,
    categoria: "Intro",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.3],
  },
  {
    id: 0.3,
    descripcion: `Por otro lado, en el camino de la izquierda, tienes el bosque encantado. Puedes descubrir algún que otro encanto en él, podrías investigarlo, y siempre puedes regresar aquí... Si no mueres en el intento, claro. En el bosque hay criaturas que pueden atentar contra ti.\n\nPor último, en este camino que tienes a la derecha, irás al muelle, donde se encuentra un pequeño poblado, ahí se han refugiado la mayoría de los sirvientes del castillo. El rey y la reina se encuentran seguros en un lugar que no puedo decirte...`,
    categoria: "Intro",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.4],
  },
  {
    id: 0.4,
    descripcion: `En fin, Sir ${nombre}, ¡necesitamos de tu ayuda!`,
    categoria: "Intro",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.5],
  },
  {
    id: 0.5,
    descripcion: `¡Debes escoger tu camino! Ingresa debajo el número donde deseas dirigirte:\n\n1. Bosque.\n2. Castillo (¡Importante! No podrás regresar).\n3. Muelle`,
    categoria: "Intro",
    input: true,
    cantidadOpciones: 3,
    nextid: [1, 2, 3],
  },
  {
    id: 1,
    descripcion: `'El Bosque Encantado: Donde los árboles susurran secretos y la magia cobra vida.'\nLo cierto es que nunca escuché a un árbol susurrar, pero igualmente, deberías tener cuidado.\n\nSir ${nombre}, encuentras a tu izquierda la continuación del bosque. Una dulce voz te llama la atención. A tu derecha, sin embargo, una lúgubre cabaña te invita a pasar.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [1.01],
  },
  {
    id: 1.01,
    descripcion: `Debes escoger tu camino. \n\n0. Regresar al comienzo\n1. Adentrarte más en el bosque.\n2. Entrar a la cabaña..`,
    categoria: "Bosque",
    input: true,
    cantidadOpciones: 3,
    nextid: [0.5, 1.1, 1.2],
  },
  {
    id: 1.1,
    descripcion: `Sigues la dulce voz, y a medida que te adentras en el bosque, te da un poco de sueño.\n\nTe duermes sin darte cuenta. Algo te picotea en el brazo. Pierdes 1 de vida.\n\nAl despertarte, te encuentras nuevamente frente a los tres caminos.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.5, 1.11],
    especial: "Voces",
  },
  {
    id: 1.11,
    descripcion: `¡Te has quedado sin puntos de vida!\n\nFIN DEL JUEGO.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [10],
  },
  {
    id: 1.2,
    descripcion: `Entras a la cabaña ya sin pensarlo nuevamente. Sientes un frío importante, te tiembla el cuerpo. Sientes miedo, y sabes que no eres la única persona ahí dentro.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [1.21],
  },
  {
    id: 1.21,
    descripcion: `Debes escoger tu camino. \n\n0. Volver hacia atrás.\n1. Bajar al sótano.\n2. Explorar la cocina.`,
    categoria: "Bosque",
    input: true,
    cantidadOpciones: 3,
    nextid: [1.01, 1.3, 1.4],
  },
  {
    id: 1.3,
    descripcion: `Una horrible figura te observa desde una esquina. Observa que sus manos está haciendo movimientos extraños. ¡Deberás derrotar a la bruja!`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [1.31],
  },
  {
    id: 1.31,
    descripcion: `Debes escoger tu acción. \n\n0. Huir \n1. Pelear`,
    categoria: "Bosque",
    input: true,
    cantidadOpciones: 2,
    nextid: [1.21, 1.32],
    especial: "Log Bruja",
  },
  {
    id: 1.32,
    descripcion: `¡Esto se torna personal! Le das batalla a la bruja.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [1.31, 1.33, 1.34],
    especial: "Combate Bruja",
  },
  {
    id: 1.33,
    descripcion: `¡La bruja te ha derrotado! Te has quedado sin vida.\n\nFIN DEL JUEGO.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [10],
  },
  {
    id: 1.34,
    descripcion: `¡Has derrotado a la bruja!\n\nSubes de nivel, tienes más combate.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [1.21],
  },
  {
    id: 1.4,
    descripcion: `Exploras la cocina, encuentras, en una alacena, un pequeño cofre.\n\nLo abres... ¡Dentro hay 10 monedas! Las guardas antes que nadie te vea.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [1.21],
    especial: "Monedas",
  },
  {
    id: 2,
    descripcion: `Ya estamos en la recta final de la aventura. Recuerda, no hay vuelta atrás. De aquí salimos con la victoria o con la muerte, ¡pero a no desesperar, Sir ${nombre}! Confio plenamente en ti y en tus habilidades.`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [2.1],
  },
  {
    id: 2.1,
    descripcion: `El castillo se encuentra a lo lejos, lo ves que está a unas leguas de distancia. El puente roto está frente a ti ahora, y debes cruzarlo.`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [2.3, 2.2],
    especial: "Puente",
  },
  {
    id: 2.2,
    descripcion: `¡Fuiste lo suficientemente astuto como para traer la soga contigo! Cruzas con tu soga sin problema y pasas por las puertas del castillo.`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [2.4],
  },
  {
    id: 2.3,
    descripcion: `Cruzar por el río provocó que te cansaras y que te hicieras algo de daño en el proceso. Aún así, llegas a las puertas del castillo y entras.`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [2.4],
  },
  {
    id: 2.4,
    descripcion: `Un gran salón se impone frente a ti. El enorme dragón se encuentra ahí, te ve llegar y abre la boca para escupir fuego. ¡Debes hacer algo al respecto!`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [2.5],
  },
  {
    id: 2.5,
    descripcion: `Debes escoger tu camino. \n\n1. Enfrentar al dragón.\n2. Escapar del dragón.`,
    categoria: "Castillo",
    input: true,
    cantidadOpciones: 2,
    nextid: [2.6, 2.8],
  },
  {
    id: 2.6,
    descripcion: `El dragón se ve feroz, ¡pero nada como la valentía de Sir ${nombre} para enfrentarlo! Te preparas para la gran batalla final.`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [2.7],
  },
  {
    id: 2.7,
    descripcion: `Debes escoger tu acción. \n\n0. Huir \n1. Pelear`,
    categoria: "Castillo",
    input: true,
    cantidadOpciones: 2,
    nextid: [2.8, 2.72],
    especial: "Log Dragón",
  },
  {
    id: 2.72,
    descripcion: `¡Esto se torna personal! Le das batalla al dragón. ¡El fuego se vuelve insoportable!`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [2.7, 2.73, 2.74],
    especial: "Combate Dragón",
  },
  {
    id: 2.73,
    descripcion: `¡El dragón te ha derrotado! Te has quedado sin vida.\n\nFIN DEL JUEGO.`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [10],
  },
  {
    id: 2.74,
    descripcion: `¡Has derrotado al dragón! La gloria será por siempre tuya. ¡Felicidades! El reino de Javastra te debe tu vida. Vivirás el resto de tus días siendo honrado y tienes un honorifico título. ¡Hurra Sir ${nombre}!\n\nFIN DEL JUEGO.`,
    categoria: "Castillo",
    input: false,
    cantidadOpciones: 0,
    nextid: [10],
  },

  {
    id: 3,
    descripcion: `'Muelle Javastra: Venga a nuestro hermoso mercado.'\nSir ${nombre}, te encuentras frente a una gran cantidad de tiendas que te llaman la atención. \n\nEn uno de los puestos de tu izquierda, un hombre te saluda efusivamente para que te acerques. A tu derecha, tienes el muelle en todo su esplendor.`,
    categoria: "Muelle",
    input: false,
    cantidadOpciones: 0,
    nextid: [3.1],
  },

  {
    id: 3.1,
    descripcion: `Debes escoger tu camino. \n\n0. Volver hacia atrás.\n1. Ir con el vendendor.\n2. Ir al muelle.`,
    categoria: "Muelle",
    input: true,
    cantidadOpciones: 3,
    nextid: [0.5, 3.2, 3.5],
  },
  {
    id: 3.2,
    descripcion: `'¡Buenos días! Tengo hoy en oferta esta hermosa soga que le permitirá atravesar hasta los más temibles obstáculos. ¡Solo 10 monedas! ¡Es una oferta de tiempo limitado!`,
    categoria: "Muelle",
    input: false,
    cantidadOpciones: 0,
    nextid: [3.3, 3.4],
    especial: "Vendedor",
  },
  {
    id: 3.3,
    descripcion: `"Me parece que usted no tiene monedas suficientes para esta maravillosa soga. Lamento decirle que no puedo rebajarle el precio."`,
    categoria: "Muelle",
    input: false,
    cantidadOpciones: 0,
    nextid: [3.1],
  },
  {
    id: 3.4,
    descripcion: `'¡Muchas gracias! Sir ${nombre}, usted ha hecho una fantástica compra! Vuelva pronto.'`,
    categoria: "Muelle",
    input: false,
    cantidadOpciones: 0,
    nextid: [3.1],
    especial: "Soga",
  },
  {
    id: 3.5,
    descripcion: `Un hermoso cuerpo de agua se encuentra frente a ti.\n\nDebes escoger tu acción.\n\n0. Volver hacia atrás.\n1. Seguir mirando el agua.`,
    categoria: "Muelle",
    input: true,
    cantidadOpciones: 2,
    nextid: [3.1, 3.6],
  },
  {
    id: 3.6,
    descripcion: `"El agua está muy tranquila, no parece suceder nada.`,
    categoria: "Muelle",
    input: false,
    cantidadOpciones: 0,
    nextid: [3.5],
    especial: "Espada",
  },
  {
    id: 3.7,
    descripcion: `¡Has conseguido salir del agua! ¡Y con una espada en la mano! Aumentan tu combate, ahora eres todo un guerrero.`,
    categoria: "Muelle",
    input: false,
    cantidadOpciones: 0,
    nextid: [3.1],
    especial: "Log Espada",
  },

  {
    id: 10,
    descripcion: `Haz perdido, aquí tus logros, tu nombre, tu puntaje, etc`,
    categoria: "Fin",
    input: false,
    cantidadOpciones: 0,
    nextid: [11],
    especial: "Fin",
  },
];

let index = 0;
let id = 0;
let chequeoInput;

index = 0;
id = 0;

inputChecker(caminos);

function inputChecker(arrayInput) {
  console.log("salir" + salir);
  console.log("undex" + index);
  console.log("id actual" + arrayInput[index].id);
  idACambiar = -1;
  chequeoInput = false;
  eliminar = false;
  antesDeLogica = false;
  descripcionEspecial = "";
  if (arrayInput[index].especial != undefined) {
    switch (arrayInput[index].especial) {
      case "Voces":
        inventario.health = inventario.health - 1;
        registroLogro("Voces");
        if (inventario.health <= 0) {
          arrayInput[index].nextid[0] = arrayInput[index].nextid[1];
        }
        break;
      case "Monedas":
        inventario.coins = inventario.coins + 10;
        descripcionEspecial = `Ya exploraste este lugar, te recomiendo que busques en otro lado.`;
        idACambiar = arrayInput[index].id;
        eliminar = true;
        console.log("id a Eliminar" + idACambiar);

        break;
      case "Combate Bruja":
        combate(bruja);
        logBruja.push(turno);
        if (muerte) {
          arrayInput[index].nextid[0] = arrayInput[index].nextid[1];
        } else if (victoria) {
          arrayInput[index].nextid[0] = arrayInput[index].nextid[2];
          victoria = false;
          registroLogro("Bruja");
          eliminar = true;
          idACambiar = 1.3;
          descripcionEspecial = `Ya has derrotado a la bruja, no hay nada más que ver aquí`;
          modificarNextId(arrayInput, idACambiar, [1.21]);
          turno = "";
          turnoContador = 0;

          //FALTA SUBIR DE NIVEL
        }
        break;
      case "Log Bruja":
        antesDeLogica = true;
        descripcionEspecial = arrayInput[index].descripcion + `\n` + turno;
        idACambiar = arrayInput[index].id;
        break;
      case "Vendedor":
        if (inventario.coins == 10) {
          arrayInput[index].nextid[0] = arrayInput[index].nextid[1];
          registroLogro("Soga");
          inventario.coins = inventario.coins - 10;
        }
        break;
      case "Soga":
        idACambiar = 3.2;
        descripcionEspecial = `'Buenos días, Sir ${nombre}, recuerde que ya no tengo nada para ofrecerle. Solo quería entablar una conversación con usted.`;
        eliminar = true;
        modificarNextId(arrayInput, idACambiar, [3.1]);
        inventario.soga = true;
        break;
      case "Espada":
        espada++;
        console.log(espada);
        if (espada == 2) {
          idACambiar = 3.5;

          modificarNextId(arrayInput, idACambiar, [3.1, 3.7]);
        }
        break;
      case "Log Espada":
        registroLogro("Espada");
        idACambiar = 3.6;
        descripcionEspecial = `Ya no hay nada que ver aquí, puedes regresar.`;
        eliminar = true;
        modificarNextId(arrayInput, idACambiar, [3.1]);
        modificarNextId(arrayInput, 3.5, [3.1, 3.6]);
        alert(
          "¡Hay algo en el agua! Un brillo, un artefacto extraño. Te lanzas al agua sin pensarlo."
        );
        alert("Te zambulles. Aguantas la respiración.");
        alert("Todavía no llegas, aguanta un poco más.");
        alert("¡Estira la mano! ¡Ya casi!");
        alert("...");
        alert("...");
        alert("...");
        //FALTA INCREMENTO DE FUERZA
        break;
      case "Puente":
        if (inventario.soga) {
          arrayInput[index].nextid[0] = arrayInput[index].nextid[1];
        } else {
          inventario.health = inventario.health - 3;
        }
        break;
      case "Combate Dragón":
        combate(dragon);
        logDragon.push(turno);
        console.log(turno);
        console.log(muerte);
        console.log(victoria);
        if (muerte) {
          arrayInput[index].nextid[0] = arrayInput[index].nextid[1];
        } else if (victoria) {
          arrayInput[index].nextid[0] = arrayInput[index].nextid[2];
          registroLogro("Dragón");
        }
        break;
      case "Log Dragón":
        antesDeLogica = true;
        descripcionEspecial = arrayInput[index].descripcion + `\n` + turno;
        idACambiar = arrayInput[index].id;
        break;
      case "Fin":
        salir = true;
        chequeoInput = true;
        break;
    }
  }
  if (antesDeLogica) {
    descripcionChecker(arrayInput, eliminar, idACambiar);
  }

  if (arrayInput[index].input) {
    while (!chequeoInput) {
      ingreso = Number(
        prompt(arrayInput[index].descripcion + "/n" + inventario.health)
      );
      console.log(id);
      if (
        (arrayInput[index].id == 0.5 || arrayInput[index].id == 2.5) &&
        ingreso != 13
      ) {
        ingreso = ingreso - 1;
      }
      console.log(ingreso);
      for (let i = 0; i < arrayInput[index].cantidadOpciones; i++) {
        if (ingreso == i || ingreso == 13) {
          chequeoInput = true;
          if (ingreso != 13 && !salir) {
            if (!antesDeLogica) {
              descripcionChecker(arrayInput, eliminar, idACambiar);
            }
            nextIndex(arrayInput, ingreso);
            inputChecker(arrayInput);
          }
          break;
        }
      }
    }
  } else {
    alert(arrayInput[index].descripcion);

    if (!salir) {
      if (!antesDeLogica) {
        descripcionChecker(arrayInput, eliminar, idACambiar);
      }
      nextIndex(arrayInput, 0);
      inputChecker(arrayInput);
    }
  }
}

function nextIndex(arrayInput, numeroID) {
  id = arrayInput[index].nextid;
  index = arrayInput.findIndex((camino) => {
    return camino.id === id[numeroID];
  });
}

function descripcionChecker(arrayInput, eliminarEspecial, idACambiar) {
  i = arrayInput.findIndex((camino) => {
    return camino.id == idACambiar;
  });

  if (descripcionEspecial != "") {
    arrayInput[i].descripcion = descripcionEspecial;
    if (eliminarEspecial) {
      delete arrayInput[i].especial;
    }
  }
}

function modificarNextId(arrayInput, nextIDacambiar, nextID) {
  i = arrayInput.findIndex((camino) => {
    return camino.id == nextIDacambiar;
  });
  arrayInput[i].nextid = nextID;
}

function combate(oponente) {
  //tirada de iniciativa
  iniciativaPropia = Math.ceil(Math.random() * inventario.iniciativa);
  iniciativaOponente = Math.ceil(Math.random() * oponente.iniciativa);
  if (iniciativaPropia > iniciativaOponente) {
    primero = inventario;
    ini = true;
    segundo = oponente;
  } else {
    primero = oponente;
    ini = false;
    segundo = inventario;
  }
  danoASegundo =
    Math.ceil(Math.random() * primero.combat) -
    Math.ceil(Math.random() * segundo.combat);
  if (danoASegundo <= 1) {
    danoASegundo = 1;
  }
  segundo.health = segundo.health - danoASegundo;
  if (segundo.health <= 0) {
    if (ini) {
      victoria = true;
    } else {
      muerte = true;
    }
  } else {
    danoAPrimero =
      Math.ceil(Math.random() * segundo.combat) -
      Math.ceil(Math.random() * primero.combat);
    if (danoAPrimero <= 1) {
      danoAPrimero = 1;
    }
    primero.health = primero.health - danoAPrimero;
  }
  if (primero.health <= 0) {
    if (ini) {
      muerte = true;
    } else {
      victoria = true;
    }
  }
  turnoContador++;
  if (ini) {
    turno = `Turno ${turnoContador}: Iniciativa: ${primero.nombre}. Daño Hecho: ${danoASegundo}. Daño Recibido: ${danoAPrimero}.`;
  } else {
    turno = `Turno ${turnoContador}: Iniciativa: ${primero.nombre}. Daño Hecho: ${danoAPrimero}. Daño Recibido: ${danoASegundo}.`;
  }
}

function registroLogro(id) {
  switch (id) {
    case "Nombre":
      indice = 0;
      textoLogro = `No diste tu nombre al comienzo de la aventura`;
      puntajeLogro = -5;
      break;
    case "Voces":
      indice = 1;
      textoLogro = `Has seguido las voces del bosque.`;
      puntajeLogro = 5;
      break;
    case "Bruja":
      indice = 2;
      textoLogro = `Has derrotado a la bruja de la cabaña.`;
      puntajeLogro = 20;
      break;
    case "Espada":
      indice = 2;
      textoLogro = `Encontraste la espada secreta en el fondo del lago.`;
      puntajeLogro = 20;
      break;
    case "Puente":
      indice = 3;
      textoLogro = `Lograste cruzar el puente sin recibir daño.`;
      puntajeLogro = 10;
      break;
    case "Dragón":
      indice = 4;
      textoLogro = `Derrotaste exitósamente al dragón.`;
      puntajeLogro = 35;
      break;
  }
  if (!logrosID[indice]) {
    logros[indice] = logros[indice].replace(`*`, textoLogro);
    logrosTotales++;
    puntaje = puntaje + puntajeLogro;
    logrosID[indice] = true;
  }
}
