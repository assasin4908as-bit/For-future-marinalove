/* =========================================================
   LIVING STORY — SITE ENGINE
========================================================= */

(function () {
    "use strict";

    const STORAGE_PREFIX = "living_story_";

    window.SiteEngine = {

        storageKey(name) {
            return STORAGE_PREFIX + name;
        },

        get(name, fallback = null) {
            try {
                const value = localStorage.getItem(
                    this.storageKey(name)
                );

                return value === null
                    ? fallback
                    : JSON.parse(value);

            } catch {
                return fallback;
            }
        },

        set(name, value) {
            try {
                localStorage.setItem(
                    this.storageKey(name),
                    JSON.stringify(value)
                );

                return true;

            } catch {
                return false;
            }
        },

        remove(name) {
            try {
                localStorage.removeItem(
                    this.storageKey(name)
                );
            } catch {}
        },

        has(name) {
            try {
                return localStorage.getItem(
                    this.storageKey(name)
                ) !== null;

            } catch {
                return false;
            }
        },

        qs(selector, root = document) {
            return root.querySelector(selector);
        },

        qsa(selector, root = document) {
            return [...root.querySelectorAll(selector)];
        },

        sleep(ms) {
            return new Promise(resolve =>
                setTimeout(resolve, ms)
            );
        },

        pulse(
            element,
            className = "living-pulse"
        ) {
            if (!element) return;

            element.classList.remove(
                className
            );

            void element.offsetWidth;

            element.classList.add(
                className
            );
        },

        markVisited(page) {

            const visited =
                this.get(
                    "visited_pages",
                    []
                );

            if (!visited.includes(page)) {

                visited.push(page);

                this.set(
                    "visited_pages",
                    visited
                );
            }
        },

        isVisited(page) {

            return this
                .get(
                    "visited_pages",
                    []
                )
                .includes(page);
        },

        fadeTo(
            url,
            delay = 280
        ) {

            document.body.classList.add(
                "living-fade-out"
            );

            setTimeout(() => {

                window.location.href =
                    url;

            }, delay);
        }
    };


    /* =====================================================
       SHARED ANIMATION STYLES
    ===================================================== */

    const style =
        document.createElement("style");

    style.textContent = `

        body.living-fade-out {
            animation:
                livingFadeOut
                .28s
                ease
                forwards;
        }

        @keyframes livingFadeOut {

            from {
                opacity: 1;
            }

            to {
                opacity: 0;
            }

        }

        .living-pulse {
            animation:
                livingPulse
                .7s
                ease;
        }

        @keyframes livingPulse {

            0% {
                transform: scale(1);
            }

            45% {
                transform: scale(1.04);
            }

            100% {
                transform: scale(1);
            }

        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CINEMATIC LINK TRANSITIONS
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    "a[data-living-transition]"
                );

            if (!link) return;

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                link.target === "_blank"
            ) {
                return;
            }

            event.preventDefault();

            SiteEngine.fadeTo(href);

        }
    );


    /* =====================================================
       PAGE VISIT
    ===================================================== */

    SiteEngine.markVisited(
        window.location.pathname
    );

})();