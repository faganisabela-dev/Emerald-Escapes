const applyButton = document.getElementById("apply-filters");

const categoryFilter = document.getElementById("category-filter");

const priceFilter = document.getElementById("price-filter");

const destinationCards = document.querySelectorAll(".destination-card");

const noResults = document.getElementById("no-results");

function filterDestination() {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;
    let visibleCount = 0;

    destinationCards.forEach(function(card) {
        const cardCategory = card.dataset.category;
        const cardPrice = Number(card.dataset.price);

        const categoryMatches = 
        selectedCategory === "all" ||
        cardCategory === selectedCategory;

        const priceMatches = 
        selectedPrice === "all" ||
        (selectedPrice === "under-100" && cardPrice < 100) ||
        (selectedPrice === "100-150" && cardPrice >= 100 && cardPrice <= 150) ||
        (selectedPrice === "over-150" && cardPrice > 150);

        const shouldShow = categoryMatches && priceMatches;
        card.style.display = shouldShow ? "" : "none";
        if (shouldShow) {
            visibleCount++;
        }
    });
    noResults.style.display = visibleCount === 0 ? "block" : "none";
}

if (applyButton) {
    applyButton.addEventListener("click", filterDestination);
}



if (categoryFilter) {
    categoryFilter.addEventListener("change", filterDestination);
}



if (priceFilter) {
    priceFilter.addEventListener("change", filterDestination);
}


const bookingForm = document.getElementById("booking-form");
const formFeedback = document.getElementById("form-feedback");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
}
        
formFeedback.textContent =
    "Thank you for contacting Emerald Escapes! Your enquiry has been received.";
    bookingForm.reset();

    });
}
// Emerald Escapes destination carousel
const destinationSlides = document.querySelectorAll(".destination-slide");
const previousDestination = document.getElementById("previous-destination");
const nextDestination = document.getElementById("next-destination");
const destinationCounter = document.querySelector(".carousel-counter");

let currentDestination = 0;

function showDestination(index) {
    if (destinationSlides.length === 0) {
        return;
    }

    destinationSlides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    destinationSlides[index].classList.add("active");
    currentDestination = index;
    if (destinationCounter) {
    destinationCounter.textContent =
        String(currentDestination + 1).padStart(2, "0") +
        " / " +
        String(destinationSlides.length).padStart(2, "0");
}
}
if (nextDestination) {
    nextDestination.addEventListener("click", function() {
        let nextIndex = (currentDestination + 1) % destinationSlides.length;
        showDestination(nextIndex);
    });
}
if (previousDestination) {
    previousDestination.addEventListener("click", function() {
        let previousIndex =
            (currentDestination - 1 + destinationSlides.length) % destinationSlides.length;

        showDestination(previousIndex);
    });
}
