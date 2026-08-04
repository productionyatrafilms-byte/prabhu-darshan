const btnEn = document.querySelector(".english");
const btnHi = document.querySelector(".hindi");
const btnGu = document.querySelector(".gujrati");

const DEFAULT_LANG = "English";
const LANG_KEY = "selectedLanguage";

// ================= LANDSCAPE ALERT =================

let landscapeAlertShown = false;

function checkScreenSize() {
  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isMobile && window.innerWidth < 768) {
    if (!landscapeAlertShown) {
      landscapeAlertShown = true;
      alert("Please use Landscape!");
    }
  } else {
    landscapeAlertShown = false;
  }
}

window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

let translations = {};

/* set saved language instantly to avoid English flash */
const savedLangOnStart = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

if (savedLangOnStart === "Hindi") {
  document.documentElement.lang = "Hindi";
  document.body?.setAttribute("data-lang", "hi");
} else if (savedLangOnStart === "Gujarati") {
  document.documentElement.lang = "Gujarati";
  document.body?.setAttribute("data-lang", "gu");
} else {
  document.documentElement.lang = "English";
  document.body?.setAttribute("data-lang", "en");
}

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

  localStorage.setItem(LANG_KEY, lang);
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

// load translations + apply saved language
fetch("./assets/json/data.json", { cache: "no-store" })
  .then((res) => res.json())
  .then((data) => {
    translations = data;

    const savedLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
    applyLanguage(savedLang);

    setActivePage();
  });
