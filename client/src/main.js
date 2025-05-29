// GLOBALS

const apiRoot = import.meta.env.VITE_API_ROOT;

// This section manages the tab switching. ======================================================================================

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

// ==========================================================================================================================

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

  fetch(apiRoot + "add_film", {
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

  fetch(apiRoot + "add_food", {
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

  fetch(apiRoot + "add_game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  console.log(formValues);
}

videoGamesForm.addEventListener("submit", handleSubmitVideoGamesForm);

// ==========================================================================================================================

// Sundry Event Listeners/Handlers

// Clear all the results when the clear button is clicked
document.getElementById("clearBtn").addEventListener("click", (event) => {
  let divs = document.getElementsByClassName("result");

  while (divs.length > 0) {
    divs[0].parentElement.removeChild(divs[0]);
  }
  event.target.style.display = "none";
});

// The tags and the results of clicking them ==================================================================================

// Generate the tag 'clouds'

filmTagArray();
gameTagArray();
foodTagArray();

// get the film tag data

async function filmTagArray() {
  const data = await getCategoryData("get_films");
  const tags = getTags(data);
  const section = "filmTags";
  makeTagButtons(tags, "m", section);
}

// get the games tag data

async function gameTagArray() {
  const data = await getCategoryData("get_games");
  const tags = getTags(data);
  const section = "gameTags";
  makeTagButtons(tags, "g", section);
}

// get the food tag data

async function foodTagArray() {
  const data = await getCategoryData("get_food");
  const tags = getTags(data);
  const section = "foodTags";
  makeTagButtons(tags, "f", section);
}

async function getCategoryData(cat) {
  const API = apiRoot + cat;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

// get all the tags and put them together removing duplicates

function getTags(data) {
  let tagArray = [];
  data.forEach((item) => {
    tagArray = [...new Set([...tagArray, ...item.tag])];
  });
  return tagArray;
}

function makeTagButtons(tags, c, sectionId) {
  const tagArray = tags;
  const section = document.getElementById(sectionId);
  tagArray.forEach((item, index) => {
    const newTag = document.createElement("button");
    newTag.setAttribute("class", "tagBtn");
    newTag.setAttribute("id", c + item);
    newTag.textContent = item;

    section.appendChild(newTag);

    newTag.addEventListener("click", (event) => {
      tagClickHandler(event.target.id);
    });
  });
}

// when a tag is clicked we want to get any records containing that tag in the records tag collection

async function tagClickHandler(id) {
  let tag = id.slice(1, id.length);
  let cat = id.slice(0, 1);

  let queryString = "";

  switch (cat) {
    case "f":
      queryString = `get_food_select?tag=${tag}`;
      break;
    case "m":
      queryString = `get_films_select?tag=${tag}`;
      break;
    case "g":
      queryString = `get_games_select?tag=${tag}`;
      break;
  }
  const data = await getSelected(queryString);
  exportResults(data);
}

async function getSelected(query) {
  const API = apiRoot + query;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

function exportResults(dataARR) {
  document.getElementById("clearBtn").style.display = "inline-block";
  const section = document.getElementById("results");
  const clearBtn = document.getElementById("clearBtn");
  dataARR.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "result");

    for (const [key, value] of Object.entries(item)) {
      if (key !== "id") {
        let newKeyP = document.createElement("p");
        newKeyP.setAttribute("class", "key-para");
        let newValueP = document.createElement("p");
        newValueP.setAttribute("class", "value-para");
        let newSpan = document.createElement("span");
        newSpan.setAttribute("class", "result-line");

        newKeyP.textContent = capitaliseFirst(key);
        newValueP.textContent = value;

        newSpan.appendChild(newKeyP);
        newSpan.appendChild(newValueP);

        newDiv.appendChild(newSpan);
      }
    }

    // we want new tag searches to appear at the top so let's use the clear button to position them
    section.insertBefore(newDiv, clearBtn.nextSibling);
  });
}

function capitaliseFirst(string) {
  let a = string.slice(0, 1);
  let b = string.slice(1, string.length);

  let str = a.toUpperCase() + b;
  return str;
}

// Show/hide the form elements ================================================================================

// The show/hide button
const showFilmForm = document.getElementById("showFilmForm");
// film form box
const filmFormBox = document.getElementById("filmForm");

showFilmForm.addEventListener("click", function () {
  if (filmFormBox.style.display === "block") {
    filmFormBox.style.display = "none";
    showFilmForm.textContent = "Show Forms";
  } else {
    filmFormBox.style.display = "block";
    showFilmForm.textContent = "Hide Forms";
  }
});

// The show/hide button
const showFoodForm = document.getElementById("showFoodForm");
// film form box
const foodFormBox = document.getElementById("foodForm");

showFoodForm.addEventListener("click", function () {
  if (foodFormBox.style.display === "block") {
    foodFormBox.style.display = "none";
    showFoodForm.textContent = "Show Forms";
  } else {
    foodFormBox.style.display = "block";
    showFoodForm.textContent = "Hide Forms";
  }
});

// The show/hide button
const showGameForm = document.getElementById("showGameForm");
// film form box
const gameFormBox = document.getElementById("videoGamesForm");

showGameForm.addEventListener("click", function () {
  if (gameFormBox.style.display === "block") {
    gameFormBox.style.display = "none";
    showGameForm.textContent = "Show Forms";
  } else {
    gameFormBox.style.display = "block";
    showGameForm.textContent = "Hide Forms";
  }
});

document.getElementById("rndBtn").addEventListener("click", () => {
  getRandomResults();
});

async function getRandomResults() {
  let filmArr = await getCategoryData("get_films");
  let foodArr = await getCategoryData("get_food");
  let gameArr = await getCategoryData("get_games");

  filmArr = shuffleArr(filmArr);
  foodArr = shuffleArr(foodArr);
  gameArr = shuffleArr(gameArr);

  const rndArray = [...new Set([filmArr[0], foodArr[0], gameArr[0]])];
  exportResults(rndArray);
}

function shuffleArr(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
