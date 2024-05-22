'use strict';

// Animation Scroll Sections 
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('hidden');
});


// Check if There is Local Storage Color Option
const mainColors = localStorage.getItem("color_option");

if (mainColors) {

    document.documentElement.style.setProperty("--main-color", mainColors);

    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        if (element.dataset.color === mainColors) element.classList.add("active");
    })
}

// Random BackGround Option
let backgroundOption = true;

// Variable Tob Control BackGround Interval
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem) {

    document.querySelector(".random-backgrounds .active").classList.remove("active");

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {

        backgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");
}

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => li.addEventListener("click", (e) => {

    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
}));

// Switch Random BackGround Option 
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach(span => span.addEventListener("click", (e) => {

    handleActive(e);

    if (e.target.dataset.background === "yes") {

        backgroundOption = true;
        localStorage.setItem("background_option", true);
        randomizeImgs();
    } else {

        backgroundOption = false;
        localStorage.setItem("background_option", false);
        clearInterval(backgroundInterval);
    }
}));

const landingPage = document.querySelector(".landing-page");

function randomizeImgs() {

    if (backgroundOption) {
        backgroundInterval = setInterval(() => {

            let randomNumber = Math.trunc(Math.random() * 5 + 1);

            landingPage.style.backgroundImage = `url(imgs/0${randomNumber}.jpg)`;
        }, 10000);

    }
}
randomizeImgs();

// Select Skills Selector
const ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    const skillsOffsetTop = ourSkills.offsetTop;

    const windowHeight = this.innerHeight;

    const windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop - windowHeight))
        document.querySelectorAll(".skill-box .skill-progress span").forEach(skill => skill.style.width = skill.dataset.progress);
}

// Greate Popup With The Image
const ourGallery = document.querySelector(".gallery");

ourGallery.addEventListener("click", (img) => {

    if (img.target.tagName === 'IMG') {

        const overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        document.body.appendChild(overlay);

        const popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.target.alt) {

            const imgHeading = document.createElement("h3");
            imgHeading.appendChild(document.createTextNode(img.target.alt));

            popupBox.appendChild(imgHeading);
        }

        const popupImg = document.createElement("img");
        popupImg.src = img.target.src;

        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        const closeButton = document.createElement("span");
        closeButton.appendChild(document.createTextNode("X"));

        closeButton.className = "close-button";

        popupBox.appendChild(closeButton);
    }
})

// Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == 'close-button') {

        e.target.parentElement.remove();

        document.querySelector(".popup-overlay").remove();
    }
});

const allLinks = document.querySelectorAll(".links a");

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSomeThing(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {

            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: "smooth" })
        })
    });
}

scrollToSomeThing(allLinks);
scrollToSomeThing(allBullets);

// Handle Active State
function handleActive(ev) {

    ev.target.parentElement.querySelector(".active").classList.remove("active");

    ev.target.classList.add("active");
}

const bulletsSpan = document.querySelector(".bullets-option");
const bulletsContainer = document.querySelector(".nav-bullets");
const bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem) {

    document.querySelector(".bullets-option .active").classList.remove("active");

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
    }

}

bulletsSpan.addEventListener("click", (span) => {

    if (span.target.dataset.display === 'yes') {

        bulletsContainer.style.display = 'block';

        localStorage.setItem("bullets_option", 'block');
    }
    else {

        bulletsContainer.style.display = 'none';

        localStorage.setItem("bullets_option", 'none');
    }

    handleActive(span);

})

// Reset Options
document.querySelector(".reset-options").onclick = function () {

    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");

    window.location.reload();
}

// Toggle Menu
const toggleBtn = document.querySelector(".toggle-menu");
const tLinks = document.querySelector(".links");

toggleBtn.onclick = function () {
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && !toggleBtn.contains(e.target) && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.remove("menu-active");
            tLinks.classList.remove("open");
        }
    }
});

tLinks.onclick = function (e) {
    e.stopPropagation();
};

// Create Clock
function showTime() {
    const date = new Date();
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();

    document.querySelector(".clock .day").textContent = days < 10 ? '0' + days : days;
    document.querySelector(".clock .hour").textContent = hours < 10 ? '0' + hours : hours;
    document.querySelector(".clock .minute").textContent = minutes < 10 ? '0' + minutes : minutes;
    document.querySelector(".clock .second").textContent = second < 10 ? '0' + second : second;
}

setInterval(showTime, 500);