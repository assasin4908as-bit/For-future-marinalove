/* =========================================================
   LIVING STORY — SHARED STORY STATE
========================================================= */

(function () {
    "use strict";

    const KEY =
        "living_story_progress";


    const DEFAULT_STATE = {

        storyVisited: false,

        eventsVisited: false,

        newsVisited: false,

        memoriesVisited: false,

        togetherVisited: false,

        eventLevel: 0,

        completedEvents: [],

        achievements: [],

        scarletUnlocked: false,

        scarletCompleted: false,

        archiveUnlocked: 0,

        secretBookUnlocked: false,

        christmasUnlocked: false,

        finalUnlocked: false

    };


    /* =====================================================
       LOAD STATE
    ===================================================== */

    function load() {

        try {

            const saved =
                localStorage.getItem(KEY);

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
       SAVE STATE
    ===================================================== */

    function save(state) {

        try {

            localStorage.setItem(
                KEY,
                JSON.stringify(state)
            );

        } catch {}

    }


    /* =====================================================
       UPDATE STATE
    ===================================================== */

    function update(callback) {

        const current =
            load();

        callback(current);

        save(current);

        return current;

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function completeEvent(id) {

        return update(current => {

            if (
                !current.completedEvents
                    .includes(id)
            ) {

                current.completedEvents.push(
                    id
                );

            }

            current.eventLevel =
                current.completedEvents.length;

        });

    }


    function hasCompleted(id) {

        return load()
            .completedEvents
            .includes(id);

    }


    /* =====================================================
       ACHIEVEMENTS
    ===================================================== */

    function unlockAchievement(id) {

        return update(current => {

            if (
                !current.achievements
                    .includes(id)
            ) {

                current.achievements.push(
                    id
                );

            }

        });

    }


    function hasAchievement(id) {

        return load()
            .achievements
            .includes(id);

    }


    /* =====================================================
       SCARLET BANNER
    ===================================================== */

    function unlockScarlet() {

        return update(current => {

            current.scarletUnlocked =
                true;

        });

    }


    function completeScarlet() {

        return update(current => {

            current.scarletUnlocked =
                true;

            current.scarletCompleted =
                true;

        });

    }


    /* =====================================================
       ARCHIVE
    ===================================================== */

    function setArchiveLevel(level) {

        return update(current => {

            current.archiveUnlocked =
                Math.max(

                    current.archiveUnlocked || 0,

                    level

                );

        });

    }


    /* =====================================================
       SECRET BOOK
    ===================================================== */

    function unlockSecretBook() {

        return update(current => {

            current.secretBookUnlocked =
                true;

        });

    }


    /* =====================================================
       CHRISTMAS
    ===================================================== */

    function unlockChristmas() {

        return update(current => {

            current.christmasUnlocked =
                true;

        });

    }


    /* =====================================================
       FINAL
    ===================================================== */

    function unlockFinal() {

        return update(current => {

            current.finalUnlocked =
                true;

        });

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.LivingStory = {

        KEY,

        DEFAULT_STATE,

        load,

        save,

        update,

        completeEvent,

        hasCompleted,

        unlockAchievement,

        hasAchievement,

        unlockScarlet,

        completeScarlet,

        setArchiveLevel,

        unlockSecretBook,

        unlockChristmas,

        unlockFinal

    };


    /* =====================================================
       COMPATIBILITY API
    ===================================================== */

    window.LivingStoryProgress = {

        get() {
            return LivingStory.load();
        },

        save() {
            return LivingStory.load();
        },

        completeEvent,

        hasCompleted,

        unlockAchievement,

        hasAchievement

    };


    /* =====================================================
       PAGE VISITS
    ===================================================== */

    const page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    LivingStory.update(current => {

        if (page === "story.html") {
            current.storyVisited = true;
        }

        if (page === "events.html") {
            current.eventsVisited = true;
        }

        if (page === "news.html") {
            current.newsVisited = true;
        }

        if (page === "memories.html") {
            current.memoriesVisited = true;
        }

        if (page === "together.html") {
            current.togetherVisited = true;
        }

    });


    /* =====================================================
       EVENT COMPLETE LISTENER
    ===================================================== */

    window.addEventListener(
        "living-story:event-complete",
        function (event) {

            const id =
                event.detail &&
                event.detail.id;

            if (!id) return;

            LivingStory.completeEvent(id);

        }
    );


    /* =====================================================
       ACHIEVEMENT LISTENER
    ===================================================== */

    window.addEventListener(
        "living-story:achievement",
        function (event) {

            const id =
                event.detail &&
                event.detail.id;

            if (!id) return;

            LivingStory.unlockAchievement(id);

        }
    );

})();