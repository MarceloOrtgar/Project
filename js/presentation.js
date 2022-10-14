const loadingData = (state) => {
  const loading = document.querySelector(".loading");
  if (state) {
  } else {
    loading.classList.add("disable");
  }
};

loadingData(true);

setTimeout(()=>{
  const signIn = document.querySelector(".signIn");
  const blockMenu = document.querySelector(".blockMenu");

  //Manejo del os input
  const inputUser = document.querySelector(".signIn__form__inputUser");
  const inputPassword = document.querySelector(
    ".signIn__form__containerPassword__inputPassword"
  );

  //Expresiones regulares
  const regex_user =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const regexp_password =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

  //Datos erroneos
  const wrongUser = document.querySelector(".signIn__form__alert__user");
  const wrongPassword = document.querySelector(
    ".signIn__form__alert__password"
  );

  //Mostrar/Ocultar Contraseña

  const showHidepasswordContainer = document.querySelector(
    ".signIn__form__containerPassword__containerShow"
  );
  const showHidepassword = document.querySelector(
    ".signIn__form__containerPassword__containerShow__text"
  );

  //Abrir pestaña del ingreso al perfil

  window.addEventListener("click", (e) => {
    console.log(e.target);

    if (e.target.matches(".navIndex__search__buttonSign")) {
      signIn.classList.remove("disable");
      blockMenu.classList.add("active");
    }

    if (e.target.matches(".blockMenu")) {
      signIn.classList.add("disable");
      blockMenu.classList.remove("active");
    }

    if (e.target.matches(".signIn__form__button")) {
      if (
        regex_user.test(inputUser.value) &&
        regexp_password.test(inputPassword.value)
      ) {
        console.log("Hermano plomooo");
      } else {
        e.preventDefault();
        if (!regex_user.test(inputUser.value)) {
          wrongUser.classList.add("active");
        } else {
          wrongUser.classList.remove("active");
        }
        if (!regexp_password.test(inputPassword.value)) {
          wrongPassword.classList.add("active");
        } else {
          wrongPassword.classList.remove("active");
        }
      }
    }

    if (
      e.target.matches(".signIn__form__containerPassword__containerShow__text")
    ) {
      if (inputPassword.type == "password") {
        inputPassword.type = "text";
        showHidepasswordContainer.classList.add("active");
      } else {
        inputPassword.type = "password";
        showHidepasswordContainer.classList.remove("active");
      }
    }
  });

  loadingData(false);
},2000)


