export default {
    hookCloseToReload() {
        let old = window.closeRight;

        window.closeRight = () => {
            window.prepareRight(0);
            window.userReload(1);

            window.closeRight = old;
            old = null;
        };
    }
};