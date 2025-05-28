// This section manages the tab switching.

// event listeners
document.getElementById("filmButton").addEventListener("click", () => {
  openTab("filmView");
});
document.getElementById("foodButton").addEventListener("click", () => {
  openTab("foodView");
});
document.getElementById("videoGameButton").addEventListener("click", () => {
  openTab("videoGameView");
});

// event handler
function openTab(viewName) {
  let i, tabs;
  // hide all the tabs
  tabs = document.getElementsByClassName("view");
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }

  // make the one we selected visible again
  document.getElementById(viewName).style.display = "block";
}

// here is the sidepanel control

document.getElementById("sideMenuBtn").addEventListener("click", () => {
  document.getElementById("sideMenu").style.width = "400px";
});

document.getElementById("closeMenuBtn").addEventListener("click", () => {
  document.getElementById("sideMenu").style.width = "0px";
});

const filmForm = document.getElementById("filmForm");
const foodForm = document.getElementById("foodForm");
const videoGamesForm = document.getElementById("videoGamesForm");

async function handleSubmitFilmForm(event) {
  event.preventDefault();
  console.log("Form submitted"); //testing purposes
  const formData = new FormData(filmForm);
  const tag = formData.get("tag");
  const title = formData.get("title");
  const description = formData.get("description");
  const year = formData.get("year");
  const actor = formData.get("actor");
  const director = formData.get("director");
  const run = formData.get("run");
  const time = formData.get("time");
  const formValues = Object.fromEntries(formData);

  fetch("http://localhost:8080/add_film", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  console.log(formValues);
}

filmForm.addEventListener("submit", handleSubmitFilmForm);

async function handleSubmitFoodForm(event) {
  event.preventDefault();
  console.log("Form submitted"); //testing purposes
  const formData = new FormData(foodForm);
  const tag = formData.get("tag");
  const title = formData.get("title");
  const description = formData.get("description");
  const time = formData.get("ingredients");
  const formValues = Object.fromEntries(formData);

  fetch("http://localhost:8080/add_food", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  console.log(formValues);
}

foodForm.addEventListener("submit", handleSubmitFoodForm);

async function handleSubmitVideoGamesForm(event) {
  event.preventDefault();
  console.log("Form submitted"); //testing purposes
  const formData = new FormData(videoGamesForm);
  const tag = formData.get("tag");
  const title = formData.get("title");
  const description = formData.get("description");
  const time = formData.get("year");
  const formValues = Object.fromEntries(formData);

  fetch("http://localhost:8080/add_game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  console.log(formValues);
}

videoGamesForm.addEventListener("submit", handleSubmitVideoGamesForm);
