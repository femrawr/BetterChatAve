export default {
    canRunBind() {
        if (window.$('#message_content').val() !== '') {
            window.$('#message_content').focus();
            return false;
        }

        if (window.$('#set_user_about').is(':focus')) {
            window.$('#set_user_about').focus();
            return false;
        }

        return true;
    }
};