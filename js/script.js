const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".topnav__links");

//JSON Data for the Reviews Section - all placed into an array. Each review is an object with the following properties: text, author, date, stars, initials, avatarBG, avatarColor. The initials property is used to create the avatar for each review, while the avatarBG and avatarColor properties are used to style the avatar's background and text color respectively. The stars property is used to display the star rating for each review.

const reviews = [
  {
    text: "I would highly recommend Lara who made a cake for my wedding in March 2024. I found a design that I liked on her Facebook page, and we adapted the design to suit my wedding theme. The cake was perfect and totally beyond what I had expected it to be. ",
    author: "Kate J.",
    date: "May 2025",
    stars: 5,
    initials: "KJ",
    avatarBG: "#f5ede9",
    avatarColor: "#9e5548"
  }, {
    text: "Wow! what can I say, but thank you so much for such a fabulous birthday cake for my mother in laws 90th birthday. It not only looked gorgeous but tasted superb. Thank you Lara, the cake was star of the show.",
    author: "Susan P.",
    date: "August 2025",
    stars: 5,
    initials: "SP",
    avatarBG: "#f5ede1",
    avatarColor: "#9e5549"
  }, {
    text: "Lara has been making birthday cakes and cookies for us for the last few years. Every one of them has been amazing. The process usually works that I have a random theme idea (Schnauzers, roller discos, camouflage, the colours in a picture I saw - I.e. nightmare customer) and Lara some how turns that in to a beautiful looking and delicious tasting cake (or cookie). The pictures don’t do them justice. I would 100% totally recommend Lara!",
    author: "Stuart N.",
    date: "May 2025",
    stars: 5,
    initials: "SN",
    avatarBG: "#f5ede1",
    avatarColor: "#9e5550"
  }, {
    text: "I requested some celebration cupcakes to give to my boyfriend to celebrate hitting a milestone with his business. The cupcakes were amazing! Honestly they tasted so so good - the best cupcakes I've ever had. Lara was super kind & helpful throughout - she also nailed the design I asked for. My boyfriend loved them. 10/10, can't recommend enough! Will be back for sure. Thank you Lara x",
    author: "Callie",
    date: "October 2025",
    stars: 5,
    initials: "C",
    avatarBG: "#f5ede1",
    avatarColor: "#9e5551"
  }, {
    text: "Lara truly amazed me with her expertise in baking as she created an absolutely beautiful cake for my mother-in-law's birthday celebration with very little notice. The cake was delivered promptly on the day of the event and was exactly what I had envisioned in terms of decoration and flavour. The cake was also much larger than I had anticipated which was a wonderful bonus. My heartiest thanks to Lara for her amazing work!", author: "Siobhan M.",
    date: "May 2024",
    stars: 5,
    initials: "SM",
    avatarBG: "#f5ede1",
    avatarColor: "#9e5552"
  }, {
    text: "Lara couldn’t have been more helpful and was a delight to deal with. The cake for my friend’s birthday was outstanding! The best lemon cake I’ve ever tasted (don’t tell my mum), and was beautifully decorated. There was plenty to go round, and we were hoping for seconds, but the recipient was having ‘posh’ guests over later and wanted to impress them. I’ve also had the pleasure of tasting Lara’s brownies which are next level and I can’t stop thinking about.",
    author: "Sarah M.",
    date: "May 2024",
    stars: 5,
    initials: "SM",
    avatarBG: "#f5ede1",
    avatarColor: "#9e5553"
  }, {
    text: "Highly recommend Lara. Lara has made many cakes for me for special family birthdays and occasions. Her cakes are always beautifully decorated and taste amazing. Always helpful, great service.",
    author: "Eva F.",
    date: "May 2025",
    stars: 5,
    initials: "EF",
    avatarBG: "#f5ede1",
    avatarColor: "#9e5554"
  }, {
    text: "The cake for our Ruby Wedding Anniversary was simply beautiful and incorporated all I had asked for. The cake itself was delicious, the size of the cake allowed for generous portions, it was ready for collection on time and the cost was very reasonable. I have used Lara before and will definitely use her again. Her cakes are fantastic and she is totally reliable.",
    author: "Linda M.",
    date: "May 2025",
    stars: 5,
    initials: "LM",
    avatarBG: "#f5ede1",
    avatarColor: "#9e5555"
  }
]
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

const track = document.getElementById("reviewsTrack");
console.log("Reviews data:", reviews);
console.log("Track element:", track);
reviews.forEach((review, index) => {
  console.log(`Processing review ${index + 1}:`, review);
  // Build the stars based on the review rating
  const stars = "★".repeat(review.stars) + "☆".repeat(5 - review.stars);

  // Create the article element (a 'card') and set its HTML
  const card = document.createElement("article");
  card.className = "review-card";
  card.setAttribute("aria-label", `Review by ${review.author}`);
  card.innerHTML = `
       <p class="review-stars" aria-label="${review.stars} out of 5 stars">${stars}</p>
       <blockquote class="review-text">"${review.text}"</blockquote>
       <footer class="review-author">
            <div class="author-avatar" 
            style="background-color: ${review.avatarBG}; color: ${review.avatarColor};" 
            aria-hidden="true">
                  ${review.initials}
            </div>
            <div class="author-meta">
                <span class="author-name">${review.author}</span>
                <span class="author-date">${review.date}</span>
            </div>
        </footer>
    `;
  track.appendChild(card);
});

/// -------CAROUSEL LOGIC-------
const cards = document.querySelectorAll(".review-card");
const viewport = document.getElementById("reviewsViewport");
const prevBtn = document.getElementById("ctrlPrev");
const nextBtn = document.getElementById("ctrlNext");
const dotsEl = document.getElementById("ctrlDots");
const label = document.getElementById("ctrlLabel");

let currentPage = 0;

//The function cardsPerPage() reads the CSS; we don't hard-code the 3 here
//At each. breakpoint, the CSS changes the number of cards per page, and this function will return the correct number based on the current viewport width.
function cardsPerPage() {
  const viewportWidth = viewport.offsetWidth;
  if (!cards.length) return 1; // Avoid division by zero
  const cardWidth = cards[0].offsetWidth;
  return Math.round(viewportWidth / cardWidth);
}

function totalPages() {
  return Math.ceil(cards.length / cardsPerPage());
}

//Navigation
function goToPage(page) {
  const pages = totalPages();

  currentPage = Math.max(0, Math.min(page, pages - 1)); // Ensure currentPage is within bounds
  //Measure card at moment of navigation, in case of viewport resize
  const cardWidth = cards[0].offsetWidth;
  const gapPx = parseFloat(getComputedStyle(track).gap); // Get the gap between cards from CSS
  const offset = currentPage * cardsPerPage() * (cardWidth + gapPx);
  track.style.transform = `translateX(-${offset}px)`;

  //Update button states
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage >= pages - 1;

  //Update dots
  document.querySelectorAll(".ctrl-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentPage);
  });

  //Update the text label
  const start = currentPage * cardsPerPage() + 1;
  const end = Math.min(start + cardsPerPage() - 1, reviews.length);
  label.textContent = `${start}-${end} of ${reviews.length} reviews`;
}

//BUILD DOTS
//
// Dots need to reflect the number of pages, which depends on the current viewport size
function buildDots() {
dotsEl.innerHTML = ""; // Clear existing dots
for (let i = 0; i < totalPages(); i++) {
  const dot = document.createElement("button");
  dot.className = "ctrl-dot" + (i === currentPage ? " active" : "");
  dot.setAttribute("aria-label", `Go to page ${i + 1}`);
  dot.addEventListener("click", () => goToPage(i));
  dotsEl.appendChild(dot);
}
}

//EVENT LISTENERS
prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
nextBtn.addEventListener("click", () => goToPage(currentPage + 1));

// Touch/swipe support
  // We record where the finger started and compare on release.
  let touchStartX = 0;

viewport.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true }); // passive: true → browser can scroll without waiting for JS

  viewport.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    // Only register as a swipe if the finger moved more than 40px
    if (Math.abs(delta) > 40) {
      goToPage(delta > 0 ? currentPage + 1 : currentPage - 1);
    }
  }, { passive: true });
 
  // Keyboard support (when focus is within the section)
  document.querySelector('.reviews-section').addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goToPage(currentPage - 1);
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
  });
 
  // Rebuild on resize so dot count and offsets stay correct
  // ResizeObserver is more efficient than a window 'resize' listener
  // because it only fires when this specific element changes size.
  const ro = new ResizeObserver(() => {
    buildDots();
    goToPage(currentPage); // recalculate offset for new width
  });
  ro.observe(viewport);
//INITIALISE
buildDots();
goToPage(0);    
