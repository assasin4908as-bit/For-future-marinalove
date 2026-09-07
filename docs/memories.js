/* =========================================================
   LIVING STORY — MEMORIES SYSTEM
========================================================= */

(function () {
    "use strict";

    const STORAGE_KEY =
        "living_story_memories";


    const DEFAULT_MEMORIES = [

        {
            id: "first-date",

            title: "THE FIRST DATE",

            date: "27 · 06 · 2026",

            text:
                "The first page of our story.",

            unlocked: true

        },


        {
            id: "second-date",

            title: "THE SECOND DATE",

            date: "18 · 07 · 2026",

            text:
                "Another day. Another memory.",

            unlocked: true

        },


        {
            id: "third-date",

            title: "THE THIRD DATE",

            date: "31 · 08 · 2026",

            text:
                "The moment everything changed.",

            unlocked: true

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
                    ...DEFAULT_MEMORIES
                ];

            }


            return JSON.parse(saved);

        } catch {

            return [
                ...DEFAULT_MEMORIES
            ];

        }

    }


    /* =====================================================
       SAVE
    ===================================================== */

    function save(memories) {

        try {

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(memories)

            );

            return true;

        } catch {

            return false;

        }

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

            memory =>
                memory.id === id

        );

    }


    /* =====================================================
       ADD MEMORY
    ===================================================== */

    function add(memory) {

        if (
            !memory ||
            !memory.id
        ) {

            return false;

        }


        const memories =
            load();


        if (
            memories.some(
                item =>
                    item.id === memory.id
            )
        ) {

            return false;

        }


        memories.push({

            unlocked: true,

            ...memory

        });


        save(memories);


        return true;

    }


    /* =====================================================
       REMOVE MEMORY
    ===================================================== */

    function remove(id) {

        const memories =
            load().filter(

                memory =>
                    memory.id !== id

            );


        save(memories);


        return memories;

    }


    /* =====================================================
       UNLOCK MEMORY
    ===================================================== */

    function unlock(id) {

        const memories =
            load();


        const memory =
            memories.find(

                item =>
                    item.id === id

            );


        if (!memory) {
            return false;
        }


        memory.unlocked =
            true;


        save(memories);


        return true;

    }


    /* =====================================================
       CHECK UNLOCKED
    ===================================================== */

    function isUnlocked(id) {

        const memory =
            get(id);


        return !!(
            memory &&
            memory.unlocked === true
        );

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.MemoriesSystem = {

        load,

        save,

        getAll,

        get,

        add,

        remove,

        unlock,

        isUnlocked

    };

})();