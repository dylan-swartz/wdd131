// ── MENU ──────────────────────────────────────────────
const menuButton = document.querySelector(".menu-button");

function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("hide");
}

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 700) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}

menuButton.addEventListener("click", toggleMenu);
handleResize();
window.addEventListener("resize", handleResize);


// ── MODAL VIEWER ──────────────────────────────────────
function viewerTemplate(pic, alt) {
    return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img class="big-img" src="${pic}" alt="${alt}">
    </div>`;
}

function viewHandler(event) {
    // Only respond to clicks on gallery images
    if (!event.target.classList.contains("gallery-img")) return;

    const clickedImage = event.target;

    // Split src on "-" and rebuild with "-full.jpg"
    // e.g. "norris-sm.jpg" -> ["norris", "sm.jpg"] -> "norris-full.jpg"
    const imageSrc = clickedImage.src;
    const imageParts = imageSrc.split("-");
    const fullImageSrc = `${imageParts[0]}-full.jpg`;
    console.log(fullImageSrc); // fixed: was logging the string literal, not the value

    const imageAlt = clickedImage.alt;

    // FIX: 'afterbegin' inserts inside <body> at the top.
    // The original 'beforebegin' inserted BEFORE the <body> tag — outside the document!
    document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullImageSrc, imageAlt));

    // Wire up close button
    const closeButton = document.querySelector(".close-viewer");
    closeButton.addEventListener("click", closeViewer);

    // Close when clicking the dark overlay (but not the image itself)
    const viewer = document.querySelector(".viewer");
    viewer.addEventListener("click", function (e) {
        if (e.target === viewer) {
            closeViewer();
        }
    });

    // Close with Esc key
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
    if (event.key === "Escape") {
        closeViewer();
    }
}

function closeViewer() {
    const viewer = document.querySelector(".viewer");
    if (viewer) viewer.remove();
    // Always remove the keydown listener so it doesn't stack up
    document.removeEventListener("keydown", handleKeyDown);
}

// Use event delegation on the gallery section so all images work
const gallerySection = document.querySelector(".gallery");
gallerySection.addEventListener("click", viewHandler);