let nombre;
let caminos = [
  {
    id: 0,
    descripcion: `¡Una cordial bienvenida!\n\nPara comenzar, introduce tu nombre aquí debajo. ¡No te preocupes! No estarás firmando ningún contrato...\nPor ahora.`,
    categoria: "Intro",
    input: true,
    cantidadOpciones: 0,
    nextid: [0.1, 0.3],
  },
  {
    id: 0.1,
    descripcion: `¡No quieras escaparte! Necesito tu nombre, prometo que no es para realizar un hechizo.\n\nPor favor, introduce tu nombre.`,
    categoria: "Intro",
    input: true,
    cantidadOpciones: 0,
    nextid: [0.1, 0.11, 0.2],
  },
  {
    id: 0.11,
    descripcion: `Parece que no confias en mi, no empezamos bien entonces. Te llamaré de ahora en más, Sir ${nombre}`,
    categoria: "Intro",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.3],
  },
  {
    id: 0.2,
    descripcion: `Sir ${nombre}, ¡un gusto conocerte! Has llegado en el momento indicado, necesitamos tu ayuda.\n\nDebes saber que en nuestro reino, Javascra, una terrible amenaza acecha en el temible castillo que tenemos delante.\n\nMira, te mostraré. Sígueme.`,
    categoria: "Intro",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.3],
  },
  {
    id: 0.3,
    descripcion: `Espera, antes que lo olvide, si en cualquier momento deseas salir del juego, solo escribe '13'. Recuerda ese número mágico, ya que no lo mencionaré más adelante. Es un número que en el reino de Javascra ha traido mucha mala suerte, y creemos que el dragón está aquí por ese mismo número.\n\nEspero que no tengas que usarlo. ¡Confío en ti!`,
    categoria: "Intro",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.4],
  },
  {
    id: 0.4,
    descripcion: `Presta mucha atención.\n\nVerás, el castillo que ves en el camino de adelante, es custodiado por un enorme dragón que lo ha invadido, y ha sacado a todos con su temible fuego hace algunas lunas llenas atrás. El castillo contaba con un puente que cruza el río, pero el fuego del dragón lo ha deshecho. Si tomas ese camino, no podrás regresar. ¡Pero necesitamos que vayas a por él! No estamos apurados, debo confesarte, pero nos gustaria que nos puedas ayudar.\n\nPor otro lado, en el camino de la izquierda, tienes el bosque encantado. Puedes descubrir algún que otro encanto en él, podrías investigarlo, y siempre puedes regresar aquí... Si no mueres en el intento, claro. En el bosque hay criaturas que pueden atentar contra ti.\n\nPor último, en este camino que tienes a la derecha, irás al muelle, donde se encuentra un pequeño poblado, ahí se han refugiado la mayoría de los sirvientes del castillo. El rey y la reina se encuentran seguros en un lugar que no puedo decirte...\n\nEn fin, Sir ${nombre}, ¡necesitamos de tu ayuda!`,
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
    descripcion: `Sigues la dulce voz, y a medida que te adentras esdoin el bosque, te da un poco de sueño.\n\nTe duermes sin darte cuenta. Algo te picotea en el brazo. Pierdes 1 de vida.\n\nAl despertarte, te encuentras nuevamente frente a los tres caminos.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [0.5],
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
    descripcion: `Debes escoger tu acción. \n\n0. Huir \n1. Pelear.`,
    input: true,
    cantidadOpciones: 2,
    nextid: [],
  },
  {
    id: 1.4,
    descripcion: `Exploras la cocina, encuentras, en una alacena, un pequeño cofre.\n\nLo abres... ¡Dentro hay 10 monedas! Las guardas antes que nadie te vea.`,
    categoria: "Bosque",
    input: false,
    cantidadOpciones: 0,
    nextid: [1.21],
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
    nextid: [2.2, 2.3],
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
  },
];

let index = 0;
let id = 0;
let chequeoInput;

function inputChecker(arrayInput) {
  chequeoInput = false;
  if (arrayInput[index].input) {
    while (!chequeoInput) {
      ingreso = Number(prompt(arrayInput[index].descripcion));
      if (id[0] === 0.5 && ingreso != 13) {
        ingreso = ingreso - 1;
      }
      for (let i = 0; i < arrayInput[index].cantidadOpciones; i++) {
        if (ingreso == i || ingreso == 13) {
          chequeoInput = true;
          break;
        } else {
          chequeoInput = false;
        }
      }
    }
    if (ingreso != 13) {
      id = arrayInput[index].nextid;
      nextIndex(arrayInput, ingreso);
      inputChecker(arrayInput);
    }
  } else {
    alert(arrayInput[index].descripcion);
    id = arrayInput[index].nextid;
    nextIndex(arrayInput, 0);
    inputChecker(arrayInput);
  }
}

function nextIndex(arrayInput, numeroID) {
  index = arrayInput.findIndex((camino) => {
    return camino.id === id[numeroID];
  });
}

index = 5;
id = 0.4;
inputChecker(caminos);

console.log(chequeoInput);
console.log(index);
console.log(id);
console.log(caminos[index].especial);
