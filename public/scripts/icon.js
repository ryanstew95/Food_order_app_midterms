document.getElementById("menu-btn").onclick = function() {
  var content = document.getElementById("dropdown-content");
  if (content.style.display === "none") {
      content.style.display = "block";
  } else {
      content.style.display = "none";
  }
}
