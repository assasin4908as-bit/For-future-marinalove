/* =========================================================
   LIVING STORY — CINEMATIC TRANSITIONS
========================================================= */

(function () {
    "use strict";


    function createOverlay() {

        let overlay =
            document.getElementById(
                "livingTransition"
            );

        if (overlay) {
            return overlay;
        }


        overlay =
            document.createElement("div");

        overlay.id =
            "livingTransition";


        overlay.innerHTML = `
            <div class="living-transition-line"></div>
            <div class="living-transition-title"></div>
        `;


        const style =
            document.createElement("style");


        style.textContent = `

            #livingTransition {

                position: fixed;

                inset: 0;

                z-index: 99999;

                pointer-events: none;

                opacity: 0;

                background: #020207;

                transition:
                    opacity .35s ease;

            }


            #livingTransition.active {

                opacity: 1;

            }


            .living-transition-line {

                position: absolute;

                left: -10%;

                top: 50%;

                width: 120%;

                height: 2px;

                transform:
                    rotate(-4deg)
                    scaleX(0);

                transform-origin: center;

                background: #ff244f;

                box-shadow:
                    0 0 8px #ff244f,
                    0 0 25px rgba(255,36,79,.65);

                transition:
                    transform .45s ease;

            }


            #livingTransition.active
            .living-transition-line {

                transform:
                    rotate(-4deg)
                    scaleX(1);

            }


            .living-transition-title {

                position: absolute;

                left: 50%;

                top: 50%;

                transform:
                    translate(-50%, -50%);

                width: 90%;

                text-align: center;

                font-size:
                    clamp(22px, 5vw, 48px);

                letter-spacing:
                    .22em;

                color:
                    rgba(255,255,255,.9);

                opacity: 0;

                transition:
                    opacity .35s ease .25s;

            }


            #livingTransition.show-title
            .living-transition-title {

                opacity: 1;

            }

        `;


        document.head.appendChild(style);

        document.body.appendChild(
            overlay
        );

        return overlay;
    }


    window.LivingTransition = {

        play(title, callback) {

            const overlay =
                createOverlay();


            const titleElement =
                overlay.querySelector(
                    ".living-transition-title"
                );


            titleElement.textContent =
                title || "";


            overlay.classList.add(
                "active"
            );


            setTimeout(() => {

                overlay.classList.add(
                    "show-title"
                );

            }, 300);


            setTimeout(() => {

                if (
                    typeof callback ===
                    "function"
                ) {

                    callback();

                }

            }, 950);

        },


        go(title, url) {

            this.play(
                title,
                () => {

                    window.location.href =
                        url;

                }
            );

        }

    };

})();