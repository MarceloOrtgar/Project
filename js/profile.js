import { data } from "./data.js";

const loadingData = (state) => {
  const loading = document.querySelector(".loading");
  if (state) {
  } else {
    loading.classList.add("disable");
  }
};

loadingData(true);

setTimeout(() => {
  //DECLARACION DE VARIABLES FUNCIONALIDAD WEB

  const userData = document.querySelectorAll(
    ".heroContainerProfile__aside__text"
  );
  const userInputs = document.querySelectorAll(
    ".heroContainerProfile__aside__form__input"
  );

  const errorName = document.querySelector(
    ".heroContainerProfile__aside__form__alert__name"
  );
  const errorUsername = document.querySelector(
    ".heroContainerProfile__aside__form__alert__username"
  );
  const carsBrands = document.querySelector(
    ".heroContainerProfile__aside__form__carsBrands"
  );

  const searchBrands = document.querySelector(
    ".heroContainerProfile__aside__form__search__input"
  );

  let listBrands = document.querySelectorAll(
    ".heroContainerProfile__aside__form__carsBrands__container__checkbox"
  );

  const FavoriteListBrands = document.querySelector(
    ".heroContainerProfile__aside__list"
  );

  //EXPRESIONES REGULARES
  const regularExpressionName = /^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$/;
  const regularExpressionUsername = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;

  //TEMPLATES

  const templatesearchModels = document.querySelector(
    "#template-carsBrands"
  ).content;

  const templatefavoriteBrands = document.querySelector(
    "#template-favoriteBrands"
  ).content;
  // VARIABLES UTILIDADES

  let inputValueName; // Valor introducido en name
  let inputValueUsername; // Valor introducido en username
  let inputValueSearch; // Valor introducido en buscador para las marcas
  let ListMatchesSearch = []; // Valores coincidentes con el buscador
  let matchesInput = []; //Vehiculos coincidentes con el tipeo del teclado
  let elementChecked = []; //Marcas seleccionadas
  let CopyElementsChecked = []; //Marcas seleccionadas copia

  //Funciones

  //BUSCA EL ELEMENTO COINCIDENTE

  function searchInputCar(data, search, match) {
    let arrayTitles = [];

    data.forEach((car) => {
      if (!arrayTitles.includes(car.name.toLowerCase())) {
        arrayTitles.push(car.name.toLowerCase());
      }
    });

    if (search.length >= 1) {
      match = arrayTitles.filter((name) => name.includes(search));
    }
    return match;
  }

  //BUSCAR ELEMENTOS COINCIDENTES EN LA BASE DATOS
  function searchCarInData(match, data) {
    matchesInput = [];

    data.forEach((car) => {
      if (match.includes(car.name.toLowerCase())) {
        matchesInput.push(car);
      }
    });
    return matchesInput;
  }

  function brandsChecked() {
    listBrands = document.querySelectorAll(
      ".heroContainerProfile__aside__form__carsBrands__container__checkbox"
    );
    listBrands.forEach((brand) => {
      elementChecked.forEach((brandcheck) => {
        if (brand.id === brandcheck) {
          brand.checked = true;
        }
      });
    });
  }

  //EVENTOS

  //Toma del valor introducido en el input name
  userInputs[0].addEventListener("keyup", (e) => {
    inputValueName = e.target.value.trim();
  });

  //Toma del valor introducido en el input username
  userInputs[1].addEventListener("keyup", (e) => {
    inputValueUsername = e.target.value.trim();
  });

  //Mostrar lista de marcas de vehículos

  const showListBrandsCars = (data) => {
    carsBrands.textContent = "";
    const fragmentCarsBrand = document.createDocumentFragment();
    data.forEach((item) => {
      const cloneSearchModels = templatesearchModels.cloneNode(true);

      cloneSearchModels
        .querySelector(
          ".heroContainerProfile__aside__form__carsBrands__container__Img"
        )
        .setAttribute("src", item.image.original);

      cloneSearchModels
        .querySelector(
          ".heroContainerProfile__aside__form__carsBrands__container__Img"
        )
        .setAttribute("alt", `Logo de la marca ${item.name}`);

      cloneSearchModels.querySelector(
        ".heroContainerProfile__aside__form__carsBrands__container__labelCheck"
      ).textContent = item.name;

      cloneSearchModels
        .querySelector(
          ".heroContainerProfile__aside__form__carsBrands__container__labelCheck"
        )
        .setAttribute("for", item.name);

      cloneSearchModels
        .querySelector(
          ".heroContainerProfile__aside__form__carsBrands__container__checkbox"
        )
        .setAttribute("id", item.name);

      cloneSearchModels
        .querySelector(
          ".heroContainerProfile__aside__form__carsBrands__container__checkbox"
        )
        .setAttribute("value", item.name);

      fragmentCarsBrand.appendChild(cloneSearchModels);
    });

    carsBrands.appendChild(fragmentCarsBrand);
  };

  showListBrandsCars(data);

  //Mostrar marcas favoritas

  const showFavoriteBrandsCars = (elementChecked) => {
    FavoriteListBrands.textContent = "";
    const fragmentFavoriteListBrands = document.createDocumentFragment();
    data.forEach((item) => {
      const clonefavoriteBrands = templatefavoriteBrands.cloneNode(true);

      elementChecked.forEach((checked) => {
        if (checked === item.name) {
          clonefavoriteBrands
            .querySelector(".heroContainerProfile__aside__list__element__image")
            .setAttribute("src", item.image.original);

          clonefavoriteBrands
            .querySelector(".heroContainerProfile__aside__list__element__image")
            .setAttribute("alt", `Logo de la marca ${item.name}`);

          fragmentFavoriteListBrands.appendChild(clonefavoriteBrands);
        }
      });
    });

    FavoriteListBrands.appendChild(fragmentFavoriteListBrands);
  };

  //Buscar elementos coinciden del buscador
  searchBrands.addEventListener("keyup", (e) => {
    brandsChecked();
    if (e.target.value.length > 1) {
      inputValueSearch = e.target.value.trim().toLowerCase();
      searchInputCar(data, inputValueSearch, ListMatchesSearch);
      searchCarInData(
        searchInputCar(data, inputValueSearch, ListMatchesSearch),
        data
      );
      showListBrandsCars(matchesInput);
      brandsChecked();
    } else {
      showListBrandsCars(data);
      brandsChecked();
    }
  });

  window.addEventListener("click", (e) => {
    if (
      e.target.matches(
        ".heroContainerProfile__aside__form__carsBrands__container__checkbox"
      )
    ) {
      if (e.target.checked) {
        elementChecked.push(e.target.value);
      } else {
        CopyElementsChecked = [...elementChecked];
        elementChecked = [];
        CopyElementsChecked.forEach((brand) => {
          if (brand !== e.target.value) {
            elementChecked.push(brand);
          }
        });
      }
    }


    if(e.target.matches(".heroContainerProfile__aside__form__button")){
      e.preventDefault();
    errorName.classList.remove("active");
    errorUsername.classList.remove("active");
  
      if (
        regularExpressionName.test(inputValueName) &&
        regularExpressionUsername.test(inputValueUsername) &&
        inputValueName != undefined &&
        inputValueUsername != undefined
      ) {
        userData[0].textContent = `Nombre: ${inputValueName}`;
        userData[1].textContent = `Username: ${inputValueUsername}`;
        showFavoriteBrandsCars(elementChecked);
        userInputs[0].value=""
        userInputs[1].value=""
        elementChecked=[]
        searchBrands.value="";
        listBrands = document.querySelectorAll(".heroContainerProfile__aside__form__carsBrands__container__checkbox")
        listBrands.forEach(brand=>{
          brand.checked=false
        })
        inputValueName=undefined
        inputValueUsername=undefined
        showListBrandsCars(data);
      } else {
        brandsChecked();
        if (
          !regularExpressionName.test(inputValueName) ||
          inputValueName == undefined
        ) {
          errorName.classList.add("active");
        }
        if (
          !regularExpressionUsername.test(inputValueUsername) ||
          inputValueUsername == undefined
        ) {
          errorUsername.classList.add("active");
        }
      }
  
    }

  });

  loadingData(false);
}, 2000);
