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
