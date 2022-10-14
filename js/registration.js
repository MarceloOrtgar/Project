const loadingData = (state) => {
  const loading = document.querySelector(".loading");
  if (state) {
  } else {
    loading.classList.add("disable");
  }
};

loadingData(true);

setTimeout(() => {
  //Formulario

  const form = document.querySelector(".form");

  //Boton formulario
  const button = document.querySelector(".form__button");

  //Expresiones Regulares

  const regex__name__lastname = /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/;
  const regex_email =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const regexp_password =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

  //Elementos a validar del HTML

  const name = document.querySelector(
    ".form__container__subcontainer__inputName"
  );
  const lastname = document.querySelector(
    ".form__container__subcontainer__inputLastname"
  );
  const email = document.querySelector(
    ".form__container__subcontainer__inputEmail"
  );
  const password = document.querySelector(
    ".form__container__subcontainer__inputPassword"
  );

  //Condiciones de contraseña

  const conditions = document.querySelector(".conditions");

  //Errores
  const warningName = document.querySelector(
    ".form__container__subcontainer__alert__name"
  );
  const warningLastname = document.querySelector(
    ".form__container__subcontainer__alert__lastname"
  );
  const warningEmail = document.querySelector(
    ".form__container__subcontainer__alert__email"
  );
  const warningPassword = document.querySelector(
    ".form__container__subcontainer__alert__password"
  );

  button.addEventListener("click", (e) => {
    warningName.classList.remove("active");
    warningLastname.classList.remove("active");
    warningEmail.classList.remove("active");
    warningPassword.classList.remove("active");
    conditions.classList.remove("active");

    if (
      !regex__name__lastname.test(name.value) ||
      !regex__name__lastname.test(lastname.value) ||
      !regex_email.test(email.value) ||
      !regexp_password.test(password.value)
    ) {
      e.preventDefault();
    }

    if (!regex__name__lastname.test(name.value)) {
      warningName.classList.add("active");
    }
    if (!regex__name__lastname.test(lastname.value)) {
      warningLastname.classList.add("active");
    }
    if (!regex_email.test(email.value)) {
      warningEmail.classList.add("active");
    }
    if (!regexp_password.test(password.value)) {
      warningPassword.classList.add("active");
      conditions.classList.add("active");
    }
  });

  loadingData(false);
}, 2000);
