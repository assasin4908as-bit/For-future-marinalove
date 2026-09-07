/* =========================================================
   LIVING STORY — HIDDEN WORLDS
========================================================= */

(function () {
    "use strict";

    window.HiddenWorlds = {

        isUnlocked(world) {

            if (!window.LivingStory) {
                return false;
            }

            const state =
                LivingStory.load();

            switch (world) {

                case "scarlet":
                    return state.scarletUnlocked === true;

                case "secret":
                    return state.secretBookUnlocked === true;

                case "christmas":
                    return state.christmasUnlocked === true;

                case "final":
                    return state.finalUnlocked === true;

                default:
                    return false;
            }
        },


        unlock(world) {

            if (!window.LivingStory) {
                return false;
            }

            switch (world) {

                case "scarlet":

                    LivingStory.unlockScarlet();

                    break;


                case "secret":

                    LivingStory.unlockSecretBook();

                    break;


                case "christmas":

                    LivingStory.unlockChristmas();

                    break;


                case "final":

                    LivingStory.unlockFinal();

                    break;


                default:

                    return false;
            }

            return true;
        },


        go(world, url) {

            if (!this.isUnlocked(world)) {
                return false;
            }

            if (
                window.SiteEngine &&
                typeof SiteEngine.fadeTo === "function"
            ) {

                SiteEngine.fadeTo(url);

            } else {

                window.location.href = url;

            }

            return true;
        }

    };

})();