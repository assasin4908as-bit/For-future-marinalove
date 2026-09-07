/* =========================================================
   LIVING STORY — TOGETHER COUNTER
========================================================= */

(function () {
    "use strict";


    /*
       The day we became "us".
    */

    const START_DATE =
        new Date(
            "2026-08-31T00:00:00"
        );


    /* =====================================================
       CALCULATE TIME
    ===================================================== */

    function calculate() {

        const now =
            new Date();


        let years =
            now.getFullYear()
            - START_DATE.getFullYear();


        let months =
            now.getMonth()
            - START_DATE.getMonth();


        let days =
            now.getDate()
            - START_DATE.getDate();


        if (days < 0) {

            months--;


            const previousMonth =
                new Date(

                    now.getFullYear(),

                    now.getMonth(),

                    0

                );


            days +=
                previousMonth.getDate();

        }


        if (months < 0) {

            years--;

            months += 12;

        }


        const milliseconds =
            Math.max(

                0,

                now.getTime()
                -
                START_DATE.getTime()

            );


        const totalDays =
            Math.floor(

                milliseconds
                /
                86400000

            );


        return {

            years,

            months,

            days,

            totalDays

        };

    }


    /* =====================================================
       RENDER
    ===================================================== */

    function render(container) {

        if (!container) {
            return;
        }


        function update() {

            const time =
                calculate();


            container.innerHTML = `

                <div class="together-years">

                    ${time.years}

                </div>


                <div class="together-label">

                    YEARS

                </div>


                <div class="together-detail">

                    ${time.months}
                    months
                    ·
                    ${time.days}
                    days

                </div>


                <div class="together-total">

                    ${time.totalDays}
                    days together

                </div>

            `;

        }


        update();


        /*
           Keep the counter alive while
           the page remains open.
        */

        setInterval(

            update,

            60000

        );

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.TogetherSystem = {

        START_DATE,

        calculate,

        render

    };


    /* =====================================================
       AUTOMATIC RENDER
    ===================================================== */

    document.addEventListener(

        "DOMContentLoaded",

        function () {

            const container =
                document.getElementById(
                    "togetherCounter"
                );


            if (container) {

                render(container);

            }

        }

    );

})();