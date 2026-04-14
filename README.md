# San Electroterm Grup Website

Presentation website for **San Electroterm Grup**, built as a lightweight static frontend with a PHP contact endpoint for email delivery over SMTP.

The public site content is in Romanian. The codebase is simple to deploy on shared hosting or cPanel because it does not require a build step, package manager, or framework runtime.

## Stack

- HTML5 for page structure
- CSS for layout, typography, and responsive styling
- Vanilla JavaScript for navigation, validation, and async form submission
- PHP for the contact form backend
- SMTP for sending contact emails

## Project Structure

```text
.
├── index.html                   # Main landing page
├── about.html                   # About page
├── styles.css                   # Site styling
├── app.js                       # Navigation, form validation, popup feedback, async submit
├── contact.php                  # Contact form endpoint with SMTP client
├── contact.config.example.php   # SMTP config template
├── assets/                      # Images, icons, certificates, portfolio media
├── marquee.js                   # Standalone marquee helper
└── main.js                      # Empty placeholder file
```

## Features

- Responsive landing page and company presentation page
- Service, portfolio, certifications, management, and contact sections
- Embedded Google Map in the contact section
- Client-side Romanian validation messages
- Async contact form submission with success/error modal feedback
- SMTP-based email delivery without external PHP libraries

## Local Development

Use PHP's built-in web server so both the static pages and `contact.php` work locally:

```bash
php -S localhost:8000
```

Then open:

- `http://localhost:8000/index.html`
- `http://localhost:8000/about.html`

## Important Local Testing Note

Do **not** use Live Server if you want to test the contact form. Live Server serves HTML/CSS/JS, but it does not execute PHP, so `contact.php` will not return the JSON response expected by `app.js`.

## Contact Form Setup

The contact form sends a `POST` request to `contact.php` with these fields:

- `name`
- `phone`
- `email`
- `message`

The backend expects an SMTP configuration file. Start from the example:

```bash
cp contact.config.example.php contact.config.php
```

Then update the credentials and recipient settings.

### Supported Config Locations

`contact.php` looks for the config file in this order:

1. Path provided through the `CONTACT_CONFIG_PATH` environment variable
2. `../private/contact.config.php`
3. `./contact.config.php`

### Example Config

```php
<?php
return [
    'host' => 'mail.example.com',
    'port' => 465,
    'security' => 'ssl', // ssl for 465, tls for 587
    'username' => 'office@example.com',
    'password' => 'your-email-password',
    'to_email' => 'office@example.com',
    'to_name' => 'San Electroterm Grup',
    'timeout' => 20,
];
```

Optional keys also supported by the backend:

- `from_email`
- `from_name`

If `from_email` is omitted, the script falls back to `username`.

## Deployment

This project is suited to standard PHP hosting, including cPanel.

Recommended deployment approach:

1. Upload the site files to the public web root.
2. Keep the real SMTP config outside the public directory when possible.
3. Point `CONTACT_CONFIG_PATH` to that private config file, or place it in a sibling `private/` directory.
4. Verify that the mail account credentials and SMTP port/security match the hosting provider settings.

## Backend Behavior

`contact.php`:

- accepts `POST` requests only
- validates required fields and email format
- limits message length
- returns JSON responses
- opens an SMTP socket directly
- supports `ssl` and `tls`
- logs SMTP failures through PHP `error_log`

## Notes

- No build process is required.
- The frontend assumes `contact.php` returns JSON.
- The site loads Google Fonts from `fonts.googleapis.com` and `fonts.gstatic.com`.
- The contact section embeds a Google Maps iframe.
