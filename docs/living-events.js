/* =========================================================
   LIVING STORY — EVENT SYSTEM
========================================================= */

(function () {
    "use strict";

    const STORAGE_KEY =
        "living_events_progress";


    const DEFAULT_STATE = {

        completed: [],

        achievements: [],

        level: 0

    };


    /* =====================================================
       LOAD
    ===================================================== */

    function load() {

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!saved) {

                return {
                    ...DEFAULT_STATE
                };

            }

            return {

                ...DEFAULT_STATE,

                ...JSON.parse(saved)

            };

        } catch {

            return {
                ...DEFAULT_STATE
            };

        }

    }


    /* =====================================================
       SAVE
    ===================================================== */

    function save(state) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

        } catch {}

    }


    /* =====================================================
       COMPLETE EVENT
    ===================================================== */

    function complete(eventId) {

        const state =
            load();


        if (
            !state.completed.includes(
                eventId
            )
        ) {

            state.completed.push(
                eventId
            );

        }


        state.level =
            state.completed.length;


        save(state);


        /* Sync with main story system */

        if (
            window.LivingStory &&
            typeof LivingStory.completeEvent
                === "function"
        ) {

            LivingStory.completeEvent(
                eventId
            );

        }


        window.dispatchEvent(

            new CustomEvent(
                "living-event-complete",
                {
                    detail: {
                        id: eventId
                    }
                }
            )

        );


        return state;

    }


    /* =====================================================
       CHECK EVENT
    ===================================================== */

    function isComplete(eventId) {

        return load()
            .completed
            .includes(eventId);

    }


    /* =====================================================
       ACHIEVEMENT
    ===================================================== */

    function unlockAchievement(
        achievementId
    ) {

        const state =
            load();


        if (
            !state.achievements
                .includes(achievementId)
        ) {

            state.achievements.push(
                achievementId
            );

        }


        save(state);


        /* Sync with main story system */

        if (
            window.LivingStory &&
            typeof LivingStory.unlockAchievement
                === "function"
        ) {

            LivingStory.unlockAchievement(
                achievementId
            );

        }


        window.dispatchEvent(

            new CustomEvent(
                "living-achievement",
                {
                    detail: {
                        id: achievementId
                    }
                }
            )

        );


        return state;

    }


    /* =====================================================
       CHECK ACHIEVEMENT
    ===================================================== */

    function hasAchievement(
        achievementId
    ) {

        return load()
            .achievements
            .includes(achievementId);

    }


    /* =====================================================
       GET LEVEL
    ===================================================== */

    function getLevel() {

        return load().level;

    }


    /* =====================================================
       GET COMPLETED EVENTS
    ===================================================== */

    function getCompleted() {

        return [
            ...load().completed
        ];

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.LivingEvents = {

        load,

        save,

        complete,

        isComplete,

        unlockAchievement,

        hasAchievement,

        getLevel,

        getCompleted

    };

})();