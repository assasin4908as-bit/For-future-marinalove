/* =========================================================
   LIVING STORY — NEWS SYSTEM
========================================================= */

(function () {
    "use strict";

    const STORAGE_KEY =
        "living_story_news";


    const DEFAULT_NEWS = [

        {
            id: "welcome",

            title: "WELCOME",

            date: "31 · 08 · 2026",

            text:
                "A new chapter of the story has begun.",

            read: false

        },


        {
            id: "events",

            title: "EVENTS",

            date: "01 · 09 · 2026",

            text:
                "The Events world is now open.",

            read: false

        },


        {
            id: "scarlet",

            title: "THE SCARLET BANNER",

            date: "06 · 09 · 2026",

            text:
                "Something red has appeared beyond the ordinary events.",

            read: false

        }

    ];


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

                return [
                    ...DEFAULT_NEWS
                ];

            }

            return JSON.parse(saved);

        } catch {

            return [
                ...DEFAULT_NEWS
            ];

        }

    }


    /* =====================================================
       SAVE
    ===================================================== */

    function save(news) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(news)
            );

        } catch {}

    }


    /* =====================================================
       GET ALL
    ===================================================== */

    function getAll() {

        return load();

    }


    /* =====================================================
       GET ONE
    ===================================================== */

    function get(id) {

        return load().find(
            item =>
                item.id === id
        );

    }


    /* =====================================================
       UNREAD
    ===================================================== */

    function unread() {

        return load().filter(
            item =>
                item.read !== true
        );

    }


    /* =====================================================
       MARK READ
    ===================================================== */

    function markRead(id) {

        const news =
            load();


        const item =
            news.find(
                entry =>
                    entry.id === id
            );


        if (!item) {
            return false;
        }


        item.read = true;


        save(news);


        return true;

    }


    /* =====================================================
       MARK ALL READ
    ===================================================== */

    function markAllRead() {

        const news =
            load();


        news.forEach(
            item => {

                item.read = true;

            }
        );


        save(news);

    }


    /* =====================================================
       ADD NEWS
    ===================================================== */

    function add(item) {

        if (
            !item ||
            !item.id
        ) {

            return false;

        }


        const news =
            load();


        if (
            news.some(
                existing =>
                    existing.id === item.id
            )
        ) {

            return false;

        }


        news.unshift({

            read: false,

            ...item

        });


        save(news);


        return true;

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.NewsSystem = {

        getAll,

        get,

        unread,

        markRead,

        markAllRead,

        add,

        save

    };

})();