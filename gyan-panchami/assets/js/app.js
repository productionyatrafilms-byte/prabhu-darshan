const btnEn = document.querySelector(".english");
const btnHi = document.querySelector(".hindi");
const btnGu = document.querySelector(".gujrati");

const DEFAULT_LANG = "English";
let translations = {};

// set active button
function setActiveButton(activeBtn) {
  [btnEn, btnHi, btnGu].forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// apply language
function applyLanguage(lang) {
  const langData = translations[lang];
  if (!langData) return;

  document.documentElement.lang = lang;

  if (lang === "English") {
    document.body.setAttribute("data-lang", "en");
    setActiveButton(btnEn);
  } else if (lang === "Hindi") {
    document.body.setAttribute("data-lang", "hi");
    setActiveButton(btnHi);
  } else if (lang === "Gujarati") {
    document.body.setAttribute("data-lang", "gu");
    setActiveButton(btnGu);
  }

  // update text
  document.querySelectorAll("[data-lang-key]").forEach((el) => {
    const key = el.getAttribute("data-lang-key");
    if (langData[key]) {
      el.innerHTML = langData[key];
    }
  });
}

// set active current page
function setActivePage() {
  const currentPage = window.location.pathname.split("/").pop();
  const pageLinks = document.querySelectorAll(".pages .page");

  pageLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// button events
btnEn.addEventListener("click", () => applyLanguage("English"));
btnHi.addEventListener("click", () => applyLanguage("Hindi"));
btnGu.addEventListener("click", () => applyLanguage("Gujarati"));

// load translations + always set default language to English
fetch("./assets/json/data.json")
  .then((res) => res.json())
  .then((data) => {
    translations = data;

    applyLanguage(DEFAULT_LANG); // always English on reload/refresh
    setActivePage();
  });