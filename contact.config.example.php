<?php
declare(strict_types=1);

return [
    // cPanel example:
    // - keep the real file outside public_html when possible
    // - typical path: /home/CPANEL_USER/private/contact.config.php
    'host' => 'mail.example.com',
    'port' => 465,
    'security' => 'ssl', // Use ssl for 465 or tls for 587
    'username' => 'office@example.com',
    'password' => 'REPLACE_WITH_CPANEL_EMAIL_PASSWORD',
    'to_email' => 'office@example.com',
    'to_name' => 'San Electroterm Grup',
    'timeout' => 20,
];

