//DECLARACION DE VARIABLES FUNCIONALIDAD WEB
const menuHam = document.querySelector(".nav__ham");
const linksMenu = document.querySelector(".nav__listContainer");
const closeHam = document.querySelector(".nav__closeHam");
const listMenu = document.querySelectorAll(".nav__listContainer__item");
const input = document.querySelector(".nav__search__inputContainer__input");
const blockMenu = document.querySelector(".blockMenu");
const inputModel = document.querySelector(
  ".hero__search__inputContainer__input"
);

const menuDisplayElement = document.querySelector(
  ".nav__listContainer__item__categories"
);

const containerMessageRepeatCar = document.querySelector(".alertMessage");
const buttonConfirm = document.querySelector(".alert__add");
const buttonReject = document.querySelector(".alert__reject");

const showExitMain = document.querySelector(".nav__search__buttonlogOut");

const containerMessageExitMain = document.querySelector(".exitMessage");
const buttonExit = document.querySelector(".exit__logOut");
const buttonRejectExit = document.querySelector(".exit__reject");

const buttonLogOut = document.querySelector(".exit__logOut");

const buttonLogOutReject = document.querySelector(".exit__reject");

const listCars = document.querySelector(".hero__containerList__container");

const buttonPrevious = document.querySelector(".hero__containerList__previous");
const buttonNext = document.querySelector(".hero__containerList__next");


const selectedCar=document.querySelector(".hero__selectedCar")

const textInformation=document.querySelector(".hero__titleSend")

//Templates

const templateOwnCars = document.querySelector("#OwnCars").content;
const templateSelectCar = document.querySelector("#selectCar").content;

//DECLARACION DE VARIABLES FUNCIONALIDAD DATA

const allData = []; //Almacenamiento de los datos del Fetch
let idList = [0]; //Lista de Id Utilizados, deben ser unicos
let idCounter = 0; // Id de las tarjetas
let listOwnCars = []; // Lista de vehiculos que presenta el usuario
let counter = 0; //Contador de vehiculos
let showListCars = []; // Lista de vehículos propios
let elementToShow; //Vehiculo a mostrar
let imageR = 2; // Inicio contador  imagen derecha
let imageL = 1; // Inicio contador imagen izquierda
let selectedElement = []; //Elemento seleccionado

//  INICIO ----- DATA-FETCH - IMPRESION DE LA DATA EN EL HTML

// ANIMACION ESPERA DE RESPUESTA DEL FETCH

const loadingData = (state) => {
  const loading = document.querySelector(".loading");
  if (state) {
  } else {
    loading.classList.add("disable");
  }
};

//CARGAR DATA CARROS

const fetchDataModels = async () => {
  const optionsModels = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "40b508f7f4msh76ab874cb940e38p1f9dc0jsn6fd489662cbf",
      "X-RapidAPI-Host": "all-cars.p.rapidapi.com",
    },
  };

  try {
    loadingData(true);

    const resModels = await fetch(
      "https://all-cars.p.rapidapi.com/cars",
      optionsModels
    );
    return await resModels.json();
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
    console.log("Finalizado");
  }
};



window.addEventListener("DOMContentLoaded", async () => {
  const dataModels = await fetchDataModels();
  allData.push(dataModels);
  allData.forEach((listCar) => {
    listCar.forEach((car) => {
      counter = counter + 1;
      car.id = idGenerator(idList, idCounter);
      car.number = counter;
      listOwnCars.push(car);
    });
  });

  listOwnCars = [];
  listOwnCars.push(allData[0][0]);
  listOwnCars.push(allData[0][1]);
  listOwnCars.push(allData[0][2]);
  listOwnCars.push(allData[0][3]);
  listOwnCars.push(allData[0][4]);


  if (listOwnCars.length >= 3) {
    buttonNext.classList.add("active");
    buttonPrevious.classList.add("active");
  }
  renderListCars(listOwnCars);
});

//FUNCIONALIDAD

//Generar un Id Aleatorio y no repetido

function idGenerator(list, id) {
  while (list.includes(id)) {
    id = Math.round(Math.random() * 10000);
  }
  list.push(id);
  return id;
}

window.addEventListener("resize", (e) => {
  //Cerrar Menu desplegado en Mobile en pantallas mas grandes
  if (window.innerWidth >= 768) {
    linksMenu.classList.remove("active");
    closeHam.classList.remove("active");
    menuHam.classList.remove("active");
    blockMenu.classList.remove("active");
  }
});

// //HABILITAR/DESHABILITAR MENU MOBILE
menuHam.addEventListener("click", (e) => {
  linksMenu.classList.add("active");
  closeHam.classList.add("active");
  menuHam.classList.add("active");
  blockMenu.classList.add("active");
});

//CERRAR MENU MOBILE
closeHam.addEventListener("click", (e) => {
  closeHam.classList.remove("active");
  linksMenu.classList.remove("active");
  menuHam.classList.remove("active");
  blockMenu.classList.remove("active");
});

//Evento en el Objeto Window

document.addEventListener("click", (e) => {
  if (e.target.matches(".nav__search__buttonlogOut")) {
    containerMessageExitMain.classList.add("active");

    containerMessageExitMain.addEventListener("click", (e) => {
      containerMessageExitMain.classList.remove("active");
    });
  }

  if (e.target.matches(".gg-arrow-left-o")) {
    imageR = imageR - 1; // Inicio contador  imagen derecha
    imageL = imageL - 1;

    if (listOwnCars.length % 2 == 0) {
  
      if (imageL == 0) {
        imageL = listOwnCars.length;
      }

      if (imageR == 0) {
        imageR = listOwnCars.length;
      }
    }

    if (listOwnCars.length % 2 != 0) {
      if (imageR == 0) {
        imageR = listOwnCars.length;
      }
      if (imageL == 0) {
        imageL = listOwnCars.length;
      }
    }

    renderListCars(listOwnCars);
  }

  if (e.target.matches(".gg-arrow-right-o")) {
    imageL = imageL + 1;
    imageR = imageR + 1;

    if (listOwnCars.length % 2 == 0) {
      if (imageR > listOwnCars.length) {
        imageR = 1;
      }
      if (imageL > listOwnCars.length) {
        imageL = 1;
      }
    }

    if (listOwnCars.length % 2 != 0) {
      if (imageR > listOwnCars.length) {
        imageR = 1;
      }
      if (imageL > listOwnCars.length) {
        imageL = 1;
      }
    }

    renderListCars(listOwnCars);
  }

  if (
    e.target.matches(".hero__containerList__container__carousel__element") ||
    e.target.matches(
      ".hero__containerList__container__carousel__element__img"
    ) ||
    e.target.matches(
      ".hero__containerList__container__carousel__element__text"
    ) ||
    e.target.matches(".hero__containerList__container__carousel__element__id")
  ) {
    selectedElement=[];
    listOwnCars.forEach((selected) => {
      if (selected.id == e.target.id) {
        selectedElement.push(selected);
      }
    });

    textInformation.classList.add("active")
    selectedCar.classList.add("active")
    renderShowCar(selectedElement)
  }
});

//Render listOwnCars (muestra la lista de los vehiculos)

function renderListCars(match) {
  showListCars = [];
  listCars.textContent = "";
  const fragmentListOwnCar = document.createDocumentFragment();

  match.find((matches) => {
    if (matches.number === imageL) {
      showListCars.unshift(matches);
    } else if (matches.number === imageR) {
      showListCars.push(matches);
    }
  });

  showListCars.forEach((cars) => {
    const cloneOwncar = templateOwnCars.cloneNode(true);

    cloneOwncar
      .querySelector(".hero__containerList__container__carousel__element")
      .setAttribute("id", `${cars.id}`);

    cloneOwncar
      .querySelector(".hero__containerList__container__carousel__element__img")
      .setAttribute("src", `${cars.img}`);

    cloneOwncar
      .querySelector(".hero__containerList__container__carousel__element__img")
      .setAttribute("alt", `Imagen del vehiculo ${cars.title}`);
    cloneOwncar
      .querySelector(".hero__containerList__container__carousel__element__img")
      .setAttribute("id", `${cars.id}`);

    cloneOwncar.querySelector(
      ".hero__containerList__container__carousel__element__text"
    ).textContent = `Modelo ${cars.title} `;

    cloneOwncar
      .querySelector(".hero__containerList__container__carousel__element__text")
      .setAttribute("id", `${cars.id}`);

    cloneOwncar.querySelector(
      ".hero__containerList__container__carousel__element__id"
    ).textContent = `ID: ${cars.number}  `;

    cloneOwncar
      .querySelector(".hero__containerList__container__carousel__element__id")
      .setAttribute("id", `${cars.id}`);

    fragmentListOwnCar.appendChild(cloneOwncar);
  });
  listCars.appendChild(fragmentListOwnCar);
}

//Render vehiculo seleccionado

function renderShowCar(car) {
  selectedCar.textContent="";

  const fragmentSelectCar = document.createDocumentFragment();
 

  car.forEach((elements) => {
    const cloneSelectedcar = templateSelectCar.cloneNode(true);

    cloneSelectedcar
      .querySelector(".hero__containerSelectedCar__img")
      .setAttribute("src", `${elements.img}`);

      cloneSelectedcar
      .querySelector(".hero__containerSelectedCar__img")
      .setAttribute("alt", `Foto de ${elements.title}`);

      cloneSelectedcar.querySelector(
      ".hero__containerSelectedCar__textTitle"
    ).textContent = `Modelo ${elements.title} `;
    cloneSelectedcar.querySelector(
      ".hero__containerSelectedCar__textId"
    ).textContent = `ID ${elements.id} `;

    fragmentSelectCar.appendChild(cloneSelectedcar);
  })

    selectedCar.appendChild(fragmentSelectCar);
}

// //FIN - FUNCIONALIDAD
