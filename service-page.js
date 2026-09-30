(() => {
    "use strict";
    const assetBase = new URL(".", document.currentScript.src);
    const key = document.body.dataset.service;
    const photos = (window.COASTAL_GALLERIES || {})[key];
    const image = document.getElementById("slideshow-image");
    if (!photos || !photos.length || !image) return;

    const caption = document.getElementById("slide-caption");
    const current = document.getElementById("slide-current");
    const total = document.getElementById("slide-total");
    const previous = document.querySelector(".slide-button.prev");
    const next = document.querySelector(".slide-button.next");
    const expand = document.getElementById("expand-slide");
    const slideshow = document.querySelector(".project-slideshow");
    let index = 0;

    function showPhoto(nextIndex) {
        index = (nextIndex % photos.length + photos.length) % photos.length;
        const photo = photos[index];
        image.src = new URL(photo.src, assetBase).href;
        image.alt = photo.alt;
        caption.textContent = photo.caption;
        current.textContent = index + 1;
        total.textContent = photos.length;
        expand.setAttribute("aria-label", "View " + photo.caption + " photo full size");
        if (photos.length > 1) {
            const preload = new Image();
            preload.src = new URL(photos[(index + 1) % photos.length].src, assetBase).href;
        }
    }

    previous.disabled = next.disabled = photos.length < 2;
    previous.addEventListener("click", () => showPhoto(index - 1));
    next.addEventListener("click", () => showPhoto(index + 1));
    slideshow.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            showPhoto(index + (event.key === "ArrowRight" ? 1 : -1));
        }
    });
    expand.addEventListener("click", () => {
        if (window.COASTAL_GALLERY) window.COASTAL_GALLERY.open(key, index);
    });
    showPhoto(0);
})();
