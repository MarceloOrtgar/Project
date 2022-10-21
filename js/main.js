

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

const templatesearchModels = document.querySelector(
  "#template-categoriesSearchModels"
).content;

const templateAddCar = document.querySelector("#template-addCar").content;
const buttonAdd = document.querySelector(
  ".hero__search__inputContainer__button"
);
const heroCards = document.querySelector(".hero__cards");

const templateListCars = document.querySelector(".template-listCars").content;
const listItems = document.querySelector(
  ".nav__listContainer__item__categories"
);

let historyCars = document.querySelectorAll(".card__containerHistory");

let changeOilCars = document.querySelectorAll(
  ".card__containerHistory__element__changeOilMotor"
);

let changeTransmissionOil = document.querySelectorAll(
  ".card__containerHistory__element__changeTransmissionOil"
);

let changeDistribution = document.querySelectorAll(
  ".card__containerHistory__element__changeDistribution"
);

let carsModel = document.querySelectorAll(".card__containerText");

let selectTransmissionModel = document.querySelectorAll(".card__containerText");

let changeTransmissionModel = document.querySelectorAll(
  ".card__containerText__containerTransmission__text"
);

let changeFuelModel = document.querySelectorAll(
  ".card__containerText__containerfuel__text"
);

let changeEngineOil = document.querySelectorAll(
  ".card__containerText__containerEngineOil__text"
);

let changeTransmissionOilModel = document.querySelectorAll(
  ".card__containerText__containerEngineOil__text"
);
//DECLARACION DE VARIABLES FUNCIONALIDAD DATA

let idCounter = 0; // Id de las tarjetas
let idList = [0]; //Lista de Id Utilizados, deben ser unicos
let matchesInput = []; //Vehiculos coincidentes con el tipeo del teclado
let matchCopy; //Copia del objeto para no modificar sus valores de referencia
const allData = []; //Almacenamiento de los datos del Fetch
let eraseData; //Limpiar elementos coincidentes del Search
let selectCard = []; //Elemento seleccionado en la lista de busqueda
let listCards = []; // Array de la lista de cartas renderizadas
let condicional = false; //Condicional para Tarjetas repetidas
let lastCard; //Comparador para conocer si el vehiculo se repite
let inputOilMotor; //input del historial OilMotor
let inputTransmissionOil; //input del historial OilMotor
let inputDistribution; //input del historial OilMotor
let inputTransmissionModel; //Input del tipo de transmision del modelo de vehiculo
let inputOilMotorModel; // Input del tipo de aceite de motor del modelo de vehiculo
let inputOilTransmissionModel; // Input del tipo de transmision del modelo de vehiculo
let inputFuelModel; // Inputl del combustible del modelo de vehiculo

const regularExpressionNumber = /^[0-9]{1,7}$/; //Expresion regular para validar solo numeros
const regularExpressionString = /^[A-Za-z]*/;



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

// //ESPERA DE CARGA DE PAGINA

window.addEventListener("DOMContentLoaded", async () => {
  const dataModels = await fetchDataModels();
  allData.push(dataModels);
  allData.forEach((result) => {
    result.forEach((car) => {
      car.id = 0;
      car.oilMotor = "0 Km";
      car.oilTransmission = "0 Km";
      car.distribution = "0 Km";
      car.transmissionModel = "xxxxxx";
      car.oilMotorModel = "xxxxxx";
      car.oilTransmissionModel = "xxxxxx";
      car.fuel = "xxxxxx";
    });
  });
});

//RENDER SEARCH ELEMENTS

const listSearch = document.querySelector(
  ".hero__search__inputContainer__listSearch"
);

const renderSearchElements = (match) => {
  listSearch.textContent = "";
  const fragmentSearchElement = document.createDocumentFragment();
  match.forEach((item) => {
    const cloneSearchElement = templatesearchModels.cloneNode(true);
    cloneSearchElement
      .querySelector(
        ".hero__search__inputContainer__listSearch__categoryContainer__img"
      )
      .setAttribute("src", item.img);
    cloneSearchElement
      .querySelector(
        ".hero__search__inputContainer__listSearch__categoryContainer__img"
      )
      .setAttribute("alt", `Foto del ${item.title}`);
    cloneSearchElement.querySelector(
      ".hero__search__inputContainer__listSearch__categoryContainer__link"
    ).textContent = item.title;

    fragmentSearchElement.appendChild(cloneSearchElement);
  });

  listSearch.appendChild(fragmentSearchElement);
};

//RENDER DE LA CARTA DEL VEHICULO

function renderAddCar(match) {
  heroCards.textContent = "";
  const fragmentcarAdd = document.createDocumentFragment();

  match.forEach((cars) => {
    const clonecarAdd = templateAddCar.cloneNode(true);
    clonecarAdd.querySelector(".card").setAttribute("id", `${cars.id}`);
    clonecarAdd
      .querySelector(".card__containerDelete__imgClose")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd.querySelector(
      ".card__containerDelete__id"
    ).textContent = `El vehículo: ${cars.title} ID: ${cars.id} `;

    clonecarAdd
      .querySelector(".card__container__img")
      .setAttribute("src", cars.img);
    clonecarAdd
      .querySelector(".card__container__img")
      .setAttribute("alt", `Foto del ${cars.title}`);
    clonecarAdd.querySelector(".card__containerText__model").textContent =
      cars.title;

    clonecarAdd
      .querySelector(".card__containerText")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd
      .querySelector(".card__containerText__containerTransmission__text")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd.querySelector(
      ".card__containerText__containerTransmission__text"
    ).textContent = `Transmisión es: ${cars.transmissionModel}`;

    clonecarAdd
      .querySelector(".card__containerText__containerfuel__text")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd.querySelector(
      ".card__containerText__containerfuel__text"
    ).textContent = `Combustible es: ${cars.fuel}`;

    clonecarAdd
      .querySelector(".card__containerText__containerEngineOil__text")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd.querySelector(
      ".card__containerText__containerEngineOil__text"
    ).textContent = `Aceite de motor: ${cars.oilMotorModel}`;

    clonecarAdd
      .querySelector(".card__containerText__containerTransmissionOil__text")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd.querySelector(
      ".card__containerText__containerTransmissionOil__text"
    ).textContent = `Aceite de transmisión:: ${cars.oilTransmissionModel}`;

    clonecarAdd
      .querySelector(".card__containerHistory")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerOilMotor__label"
      )
      .setAttribute("for", `${cars.id}`);

    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerOilMotor__inputOilMotor"
      )
      .setAttribute("id", `${cars.id}`);
    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerOilMotor__buttonOilMotor"
      )
      .setAttribute("id", `${cars.id}`);
    clonecarAdd
      .querySelector(".card__containerHistory__element__changeOilMotor")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd.querySelector(
      ".card__containerHistory__element__changeOilMotor"
    ).textContent = cars.oilMotor;

    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerTransmissionOil__label"
      )
      .setAttribute("for", `${cars.id}`);

    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerTransmissionOil__inputTransmissionOil"
      )
      .setAttribute("id", `${cars.id}`);
    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerTransmissionOil__buttonTransmissionOil"
      )
      .setAttribute("id", `${cars.id}`);
    clonecarAdd
      .querySelector(".card__containerHistory__element__changeTransmissionOil")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd.querySelector(
      ".card__containerHistory__element__changeTransmissionOil"
    ).textContent = cars.oilTransmission;

    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerDistribution__inputDistribution"
      )
      .setAttribute("for", `${cars.id}`);
    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerDistribution__inputDistribution"
      )
      .setAttribute("id", `${cars.id}`);
    clonecarAdd
      .querySelector(
        ".card__containerHistory__element__inputContainerDistribution__buttonDistribution"
      )
      .setAttribute("id", `${cars.id}`);
    clonecarAdd
      .querySelector(".card__containerHistory__element__changeDistribution")
      .setAttribute("id", `${cars.id}`);

    clonecarAdd.querySelector(
      ".card__containerHistory__element__changeDistribution"
    ).textContent = cars.distribution;

    fragmentcarAdd.appendChild(clonecarAdd);
  });
  heroCards.appendChild(fragmentcarAdd);
}

//Render nombre del vehiculo en la lista de vehiculos
function renderlistCars(match) {
  listItems.textContent = "";
  const fragmentListCars = document.createDocumentFragment();
  match.forEach((cars) => {
    const cloneListCars = templateListCars.cloneNode(true);
    cloneListCars.querySelector(
      ".nav__listContainer__item__categories__element__link"
    ).textContent = `Modelo: ${cars.title} 
     ID: ${cars.id}`;

    cloneListCars
      .querySelector(".nav__listContainer__item__categories__element__link")
      .setAttribute("href", `#${cars.id}`);

    fragmentListCars.appendChild(cloneListCars);
  });
  listItems.appendChild(fragmentListCars);
}
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

//BUSQUEDA CARROS

//BUSCAR ELEMENTO ESCRITO EN EL INPUT Y ALMACENAR LOS TITULOS COINCIDENTES

function searchInput(data, search, match) {
  let arrayTitles = [];

  data.forEach((arrayCars) => {
    arrayCars.forEach((car) => {
      if (!arrayTitles.includes(car.title.toLowerCase())) {
        arrayTitles.push(car.title.toLowerCase());
      }
    });
  });

  if (search.length >= 3) {
    match = arrayTitles.filter((name) => name.includes(search));
  }

  return match;
}

//BUSCAR ELEMENTOS COINCIDENTES EN LA BASE DATOS
function searchInData(match, data) {
  matchesInput = [];

  data.forEach((arrayCars) => {
    arrayCars.forEach((car) => {
      if (match.includes(car.title.toLowerCase())) {
        matchesInput.push(car);
      }
    });
  });
  return matchesInput;
}

//Seleccionar un Elemento

inputModel.addEventListener("keyup", (e) => {
  let inputWord = e.target.value.toLowerCase().trim();
  matchesInput = [];

  if (e.target.value.length >= 3) {
    searchInput(allData, inputWord, matchesInput);
    searchInData(searchInput(allData, inputWord, matchesInput), allData);
    renderSearchElements(matchesInput);

    if (matchesInput.length >= 1) {
      listSearch.classList.add("active");
    } else {
      listSearch.classList.remove("active");
    }
  } else {
    eraseData = [];
    renderSearchElements(eraseData);
    listSearch.classList.remove("active");
  }
});

//Cambiar valores de Kilometrajes para aceite de motor, aceite de transmision y distribucion

function modifyValuesReport() {
  historyCars = document.querySelectorAll(".card__containerHistory");
  historyCars.forEach((history) => {
    history.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      //Oil Motor
      if (
        e.target.matches(
          ".card__containerHistory__element__inputContainerOilMotor__inputOilMotor"
        )
      ) {
        e.target.addEventListener("keyup", (e) => {
          e.stopImmediatePropagation();
          if (e.target.value.match(regularExpressionNumber)) {
            inputOilMotor = e.target.value.trim();
          } else {
            inputOilMotor = 0;
          }
        });
      }
      if (
        e.target.matches(
          ".card__containerHistory__element__inputContainerOilMotor__buttonOilMotor"
        )
      ) {
        changeOilCars = document.querySelectorAll(
          ".card__containerHistory__element__changeOilMotor"
        );
        if (inputOilMotor === undefined) {
          inputOilMotor = 0;
        }

        changeOilCars.forEach((changeCar) => {
          if (changeCar.id.match(history.id)) {
            changeCar.textContent = `${inputOilMotor} Km`;

            listCards.forEach((car) => {
              if (changeCar.id.match(car.id)) {
                car.oilMotor = `${inputOilMotor} Km`;
              }
            });
          }
        });
      }

      //Transmission Oil
      if (
        e.target.matches(
          ".card__containerHistory__element__inputContainerTransmissionOil__inputTransmissionOil"
        )
      ) {
        e.target.addEventListener("keyup", (e) => {
          if (e.target.value.match(regularExpressionNumber)) {
            inputTransmissionOil = e.target.value.trim();
          } else {
            inputTransmissionOil = 0;
          }
        });
      }
      if (
        e.target.matches(
          ".card__containerHistory__element__inputContainerTransmissionOil__buttonTransmissionOil"
        )
      ) {
        changeTransmissionOil = document.querySelectorAll(
          ".card__containerHistory__element__changeTransmissionOil"
        );
        if (inputTransmissionOil === undefined) {
          inputTransmissionOil = 0;
        }

        changeTransmissionOil.forEach((changeCar) => {
          if (changeCar.id.match(history.id)) {
            changeCar.textContent = `${inputTransmissionOil} Km`;

            listCards.forEach((car) => {
              if (changeCar.id.match(car.id)) {
                car.oilTransmission = `${inputTransmissionOil} Km`;
              }
            });
          }
        });
      }
      //Distribution

      if (
        e.target.matches(
          ".card__containerHistory__element__inputContainerDistribution__inputDistribution"
        )
      ) {
        e.target.addEventListener("keyup", (e) => {
          if (e.target.value.match(regularExpressionNumber)) {
            inputDistribution = e.target.value.trim();
          } else {
            inputDistribution = 0;
          }
        });
      }
      if (
        e.target.matches(
          ".card__containerHistory__element__inputContainerDistribution__buttonDistribution"
        )
      ) {
        changeDistribution = document.querySelectorAll(
          ".card__containerHistory__element__changeDistribution"
        );
        if (inputDistribution === undefined) {
          inputDistribution = 0;
        }

        changeDistribution.forEach((changeCar) => {
          if (changeCar.id.match(history.id)) {
            changeCar.textContent = `${inputDistribution} Km`;

            listCards.forEach((car) => {
              if (changeCar.id.match(car.id)) {
                car.distribution = `${inputDistribution} Km`;
              }
            });
          }
        });
      }
    });
  });
}

//Cambiar valores de Combustible, Tipo de aceite y transmisión

function modifyValuesModel() {
  carsModel = document.querySelectorAll(".card__containerText");
  carsModel.forEach((model) => {
    model.addEventListener("click", (e) => {
      //Transmission Model
      if (
        e.target.matches(
          ".card__containerText__containerTransmission__containerTextInput__inputTransmission"
        )
      ) {
        inputTransmissionModel = e.target.value;
      }

      if (
        e.target.matches(
          ".card__containerText__containerTransmission__buttonTransmission"
        )
      ) {
        if (inputTransmissionModel == undefined) {
          inputTransmissionModel = "Manual";
        } else {
          if (inputTransmissionModel === "manual") {
            inputTransmissionModel = "Manual";
          } else if (inputTransmissionModel === "automatico") {
            inputTransmissionModel = "Automático";
          } else {
            inputTransmissionModel = "Automático CVT";
          }
        }

        changeTransmissionModel = document.querySelectorAll(
          ".card__containerText__containerTransmission__text"
        );

        changeTransmissionModel.forEach((transmissionModel) => {
          if (transmissionModel.id.match(model.id)) {
            transmissionModel.textContent = `Transmisión es: ${inputTransmissionModel}`;

            listCards.forEach((car) => {
              if (transmissionModel.id.match(car.id)) {
                car.transmissionModel = `${inputTransmissionModel}`;
              }
            });
          }
        });
      }

      //Fuel Model

      if (
        e.target.matches(
          ".card__containerText__containerfuel__containerTextInput__inputFuel"
        )
      ) {
        inputFuelModel = e.target.value;
      }

      if (e.target.matches(".card__containerText__containerfuel__buttonFuel")) {
        if (inputFuelModel == undefined) {
          inputFuelModel = "Nafta";
        } else {
          if (inputFuelModel === "nafta") {
            inputFuelModel = "Nafta";
          } else if (inputFuelModel === "diesel") {
            inputFuelModel = "Diesel";
          } else if (inputFuelModel === "hibrido") {
            inputFuelModel = "Híbrido";
          } else {
            inputFuelModel = "Eléctrico";
          }
        }

        changeFuelModel = document.querySelectorAll(
          ".card__containerText__containerfuel__text"
        );

        changeFuelModel.forEach((fuelModel) => {
          if (fuelModel.id.match(model.id)) {
            fuelModel.textContent = `Combustible es: ${inputFuelModel}`;

            listCards.forEach((car) => {
              if (fuelModel.id.match(car.id)) {
                car.fuel = `${inputFuelModel}`;
              }
            });
          }
        });
      }

      //Oil Motor Model

      if (
        e.target.matches(
          ".card__containerText__containerEngineOil__containerInputButton__inputEngineOil"
        )
      ) {
        e.target.addEventListener("keyup", (e) => {
          e.stopImmediatePropagation();
          if (e.target.value.match(regularExpressionString)) {
            inputOilMotorModel = e.target.value.trim();
          } else {
            inputOilMotorModel = "xxxxxxxx";
          }
        });
      }
      if (
        e.target.matches(
          ".card__containerText__containerEngineOil__containerInputButton__buttonEngineOil"
        )
      ) {
        changeEngineOil = document.querySelectorAll(
          ".card__containerText__containerEngineOil__text"
        );

        changeEngineOil.forEach((oilModel) => {
          if (oilModel.id.match(model.id)) {
            oilModel.textContent = `Aceite de motor: ${inputOilMotorModel}`;

            listCards.forEach((car) => {
              if (oilModel.id.match(car.id)) {
                car.oilMotorModel = `${inputOilMotorModel}`;
              }
            });
          }
        });
      }

      //Oil Transmission Model

      if (
        e.target.matches(
          ".card__containerText__containerTransmissionOil__containerInputButton__inputTransmissionOil"
        )
      ) {
        e.target.addEventListener("keyup", (e) => {
          e.stopImmediatePropagation();
          if (e.target.value.match(regularExpressionString)) {
            inputOilTransmissionModel = e.target.value.trim();
          } else {
            inputOilTransmissionModel = "xxxxxxxx";
          }
        });
      }
      if (
        e.target.matches(
          ".card__containerText__containerTransmissionOil__containerInputButton__buttonTransmissionOil"
        )
      ) {
        changeTransmissionOilModel = document.querySelectorAll(
          ".card__containerText__containerTransmissionOil__text"
        );

        changeTransmissionOilModel.forEach((oilTransmissionModel) => {
          if (oilTransmissionModel.id.match(model.id)) {
            oilTransmissionModel.textContent = `Aceite de transmisión: ${inputOilTransmissionModel}`;

            listCards.forEach((car) => {
              if (oilTransmissionModel.id.match(car.id)) {
                car.oilTransmissionModel = `${inputOilTransmissionModel}`;
              }
            });
          }
        });
      }
    });
  });
}

// Deshabilitar menu desplegado sino hay vehiculos en la lista

function disableList(listCards) {
  if (listCards.length >= 1) {
    menuDisplayElement.classList.add("active");
  } else {
    menuDisplayElement.classList.remove("active");
  }
}

//Evento en el Objeto Window

document.addEventListener("click", (e) => {
  if (
    e.target.matches(".nav__listContainer__item__categories__element__link")
  ) {
    closeHam.classList.remove("active");
    linksMenu.classList.remove("active");
    menuHam.classList.remove("active");
    blockMenu.classList.remove("active");
  }

  if (e.target.matches(".nav__search__buttonlogOut")) {
    containerMessageExitMain.classList.add("active");

    containerMessageExitMain.addEventListener("click", (e) => {
      containerMessageExitMain.classList.remove("active");
    });
  }

  //Muestra los elementos coincidentes en el input de Busqueda
  if (
    e.target.matches(
      ".hero__search__inputContainer__listSearch__categoryContainer__link"
    )
  ) {
    inputModel.value = e.target.textContent;
    selectCard = matchesInput.find(
      (element) => element.title === inputModel.value
    );
    matchesInput = [];
    matchesInput.push(selectCard);
    renderSearchElements(matchesInput);
  }

  /* Al darle al boton de agregar, muestra la carta con los datos del vehiculo que coincide en el input
Consulta si hay elementos repetidos
  */

  //Elimina la carta del vehiculo
  if (e.target.matches(".card__containerDelete__imgClose")) {
    listCards = listCards.filter((car) => car.id != e.target.id);
    lastCard = listCards[listCards.length - 1];
    renderAddCar(listCards);
    renderlistCars(listCards);
    modifyValuesReport();
    modifyValuesModel();
    disableList(listCards);
  }

  if (e.target.matches(".hero__search__inputContainer__button")) {
    e.preventDefault();
    e.stopPropagation();
    if (inputModel.value.trim() === "" || matchesInput.length < 1) {
      return;
    } else {
      condicional = false;
      lastCard = matchesInput[0];

      listCards.forEach((car) => {
        if (car.title === lastCard.title) {
          condicional = true;

          return condicional;
        } else {
          if (condicional != true) {
            condicional = false;
          }
        }
      });
      if (condicional) {
        containerMessageRepeatCar.classList.add("active");

        buttonConfirm.addEventListener("click", (event) => {
          event.stopImmediatePropagation();
          matchCopy = Object.assign({}, matchesInput[0]);
          matchCopy.id = idGenerator(idList, idCounter);
          listCards.push(matchCopy);
          lastCard = listCards[listCards.length - 1];
          renderAddCar(listCards);
          renderlistCars(listCards);
          containerMessageRepeatCar.classList.remove("active");
          listSearch.classList.remove("active");
          historyCars = document.querySelectorAll(".card__containerHistory");
          modifyValuesReport();
          modifyValuesModel();
          disableList(listCards);
        });

        buttonReject.addEventListener("click", (e) => {
          containerMessageRepeatCar.classList.remove("active");
        });
      } else {
        matchCopy = Object.assign({}, matchesInput[0]);
        matchCopy.id = idGenerator(idList, idCounter);
        listCards.push(matchCopy);
        lastCard = listCards[listCards.length - 1];
        renderAddCar(listCards);
        renderlistCars(listCards);
        listSearch.classList.remove("active");
        modifyValuesReport();
        modifyValuesModel();
        disableList(listCards);
      }
    }
  } else {
    if (
      !e.target.matches(
        ".hero__search__inputContainer__listSearch__categoryContainer__link"
      ) &&
      !e.target.matches(
        ".hero__search__inputContainer__listSearch__categoryContainer__img"
      )
    ) {
      inputModel.value = "";
      matchesInput = [];
      renderSearchElements(matchesInput);
      listSearch.classList.remove("active");
    }
  }

  if (e.target.matches(".exit__logOut")) {
  }
});




// //FIN - FUNCIONALIDAD


