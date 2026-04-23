const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".topnav__links");

hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked");
    console.log("Current classes on hamburger:", hamburger.className);
    console.log("Current classes on navLinks:", navLinks.className);
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    console.log("Updated classes on hamburger:", hamburger.className);
    console.log("Updated classes on navLinks:", navLinks.className);
});

document.querySelectorAll(".topnav__links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

const mq = window.matchMedia('(min-width: 768px)');

mq.addEventListener('change', (e) => {
  if (e.matches) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    // run your code
  }
});

