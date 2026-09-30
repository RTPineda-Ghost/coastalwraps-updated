(() => {
    "use strict";
    const assetBase = new URL(".", document.currentScript.src);
    const config = window.COASTAL_CONFIG || {};
    const galleries = window.COASTAL_GALLERIES || {};
    const photoUrl = photo => new URL(photo.src, assetBase).href;

    // Connect Instagram only when the real business profile is configured.
    let instagramUrl = "";
    try {
        const url = new URL(config.instagramUrl);
        if (url.protocol === "https:" && /^(www\.)?instagram\.com$/i.test(url.hostname)) {
            instagramUrl = url.href;
        }
    } catch {
        // An empty URL keeps the optional Instagram links hidden.
    }
    if (instagramUrl) {
        document.querySelectorAll("[data-instagram-link]").forEach(link => {
            link.href = instagramUrl;
            link.hidden = false;
        });
        document.querySelectorAll("[data-instagram-section]").forEach(section => {
            section.hidden = false;
        });
    }

    const modal = document.getElementById("gallery-modal");
    if (modal) {
        const image = document.getElementById("gallery-modal-image");
        const caption = document.getElementById("gallery-caption");
        const counter = document.getElementById("gallery-counter");
        const previous = modal.querySelector(".gallery-modal-prev");
        const next = modal.querySelector(".gallery-modal-next");
        let photos = [];
        let index = 0;
        let trigger = null;

        function showPhoto(nextIndex) {
            if (!photos.length) return;
            index = (nextIndex % photos.length + photos.length) % photos.length;
            const photo = photos[index];
            image.src = photoUrl(photo);
            image.alt = photo.alt;
            caption.textContent = photo.caption;
            counter.textContent = (index + 1) + " / " + photos.length;
            previous.hidden = photos.length < 2;
            next.hidden = photos.length < 2;
            if (photos.length > 1) {
                const preload = new Image();
                preload.src = photoUrl(photos[(index + 1) % photos.length]);
            }
        }

        function openGallery(key, startIndex = 0) {
            const selected = galleries[key];
            if (!selected || !selected.length) return;
            photos = selected;
            trigger = document.activeElement;
            showPhoto(Number(startIndex) || 0);
            if (!modal.open) modal.showModal();
            document.body.classList.add("modal-open");
        }

        window.COASTAL_GALLERY = Object.freeze({ open: openGallery });
        document.querySelectorAll("[data-gallery]").forEach(button => {
            button.addEventListener("click", () => {
                openGallery(button.dataset.gallery, button.dataset.index);
            });
        });
        previous.addEventListener("click", () => showPhoto(index - 1));
        next.addEventListener("click", () => showPhoto(index + 1));
        modal.querySelector(".gallery-close").addEventListener("click", () => modal.close());
        modal.addEventListener("click", event => {
            if (event.target === modal) modal.close();
        });
        modal.addEventListener("keydown", event => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                showPhoto(index + (event.key === "ArrowRight" ? 1 : -1));
            }
        });
        modal.addEventListener("close", () => {
            document.body.classList.remove("modal-open");
            if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
        });
    }

    const form = document.getElementById("quote-form");
    if (!form) return;
    const submit = form.querySelector('button[type="submit"]');
    const help = document.getElementById("quote-form-help");
    const status = document.getElementById("quote-form-status");
    const emailAddress = "info@coastalwraps302.com";
    const endpoint = form.action.trim();
    const hasFormspree = endpoint.startsWith("https://formspree.io/f/");

    if (hasFormspree) {
        form.action = endpoint;
        form.method = "post";
        form.enctype = "application/x-www-form-urlencoded";
        submit.textContent = "Request a Free Quote";
        help.textContent = "We'll use your details to respond to your quote request.";
    }

    form.addEventListener("submit", async event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const data = new FormData(form);
        status.textContent = "";

        if (!hasFormspree) {
            const labels = {
                name: "Name", email: "Email", phone: "Phone", vehicle: "Vehicle or project",
                service: "Service", "contact-method": "Preferred contact method", message: "Project details"
            };
            const lines = [];
            for (const [key, label] of Object.entries(labels)) {
                let value = String(data.get(key) || "").trim();
                if (key === "service" || key === "contact-method") {
                    const select = form.elements.namedItem(key);
                    value = select.selectedOptions[0].textContent.trim();
                }
                lines.push(label + ": " + value);
            }
            const mailto = "mailto:" + emailAddress +
                "?subject=" + encodeURIComponent("Coastal Wraps quote request") +
                "&body=" + encodeURIComponent(lines.join("\r\n\r\n"));
            const link = document.createElement("a");
            link.href = mailto;
            link.textContent = "Open your prepared email request";
            status.append(
                "Your request is ready to email. Send the message in your email app to complete it. ",
                link,
                " If an email app does not open, call (302) 217-3329."
            );
            // A user click opens the email draft; this does not claim the request was sent.
            link.click();
            return;
        }

        submit.disabled = true;
        submit.textContent = "Sending...";
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
                signal: controller.signal
            });
            if (!response.ok) throw new Error("Submission failed");
            status.textContent = "Thank you! Your quote request was sent. We'll contact you using your preferred method.";
            form.reset();
        } catch {
            status.textContent = "Your request could not be sent. Please try again, call (302) 217-3329, or email " + emailAddress + ".";
        } finally {
            clearTimeout(timeout);
            submit.disabled = false;
            submit.textContent = "Request a Free Quote";
        }
    });
})();
