
const cards = [...document.querySelectorAll(".gallery-item")];

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const counter = document.getElementById("counter");

let visibleCards = cards;
let currentIndex = 0;

// Image Filters

document.querySelectorAll(".filters button").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filters button")
        .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {

            card.style.display =
            filter === "all" ||
            card.dataset.category === filter
            ? "block" : "none";

        });

        visibleCards = cards.filter(
            card => card.style.display !== "none"
        );

    });

});

// Open Lightbox

cards.forEach(card => {

    card.addEventListener("click", () => {

        visibleCards = cards.filter(
            item => item.style.display !== "none"
        );

        currentIndex = visibleCards.indexOf(card);

        showImage(currentIndex);

        lightbox.classList.add("show");

    });

});

// Show Image

function showImage(index) {

    currentIndex =
    (index + visibleCards.length) % visibleCards.length;

    const img = visibleCards[currentIndex].querySelector("img");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    counter.textContent =
    `${currentIndex + 1} / ${visibleCards.length}`;

}

// Next Image

document.getElementById("next").onclick = () => {
    showImage(currentIndex + 1);
};

// Previous Image

document.getElementById("prev").onclick = () => {
    showImage(currentIndex - 1);
};

// Close Lightbox

document.getElementById("close").onclick = () => {
    lightbox.classList.remove("show");
};

// Close by clicking outside

lightbox.onclick = (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }

};

// Keyboard Support

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
    }

    if (event.key === "Escape") {
        lightbox.classList.remove("show");
    }

});
