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

filmTagArray();
gameTagArray();
foodTagArray();

// get the film tag data

async function filmTagArray() {
  const data = await getCategoryData("get_films");
  const tags = getTags(data);
  console.log(tags);
}

// get the games tag data

async function gameTagArray() {
  const data = await getCategoryData("get_games");
  const tags = getTags(data);
  console.log(tags);
}

// get the food tag data

async function foodTagArray() {
  const data = await getCategoryData("get_food");
  const tags = getTags(data);
  console.log(tags);
}

async function getCategoryData(cat) {
  const API = `http://localhost:8080/` + cat;
  const response = await fetch(API);
  const data = await response.json();
  return data;
}

function getTags(data) {
  let tagArray = [];
  data.forEach((item) => {
    tagArray = [...new Set([...tagArray, ...item.tag])];
  });
  return tagArray;
}
