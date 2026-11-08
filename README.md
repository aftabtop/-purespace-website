# PureSpace demo website

A responsive three-page static website built with HTML, CSS and vanilla JavaScript. It has no framework, package manager or build step and can be deployed directly to Cloudflare Pages.

## Project structure

```text
purespace-website/
├── index.html
├── services.html
├── contact.html
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Preview locally

Open `index.html` in a browser, or run a local static server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before publishing for a real business

1. Replace the fictional PureSpace name and demo copy with the client's real business details.
2. Replace `hello@purespace.example` and `+91 00000 00000` throughout the three HTML files with verified contact details. `.example` is a reserved placeholder domain, not a real mailbox.
3. In `assets/js/main.js`, update `SITE_CONFIG.contactEmail` to the real business email.
4. Add the WhatsApp country code and number to `SITE_CONFIG.whatsappNumber` (digits only, for example `919876543210`). The WhatsApp link intentionally alerts while this setting is blank.
5. Replace `[Your City]`, service area text, hours and all demonstration claims with verified business information.
6. Replace the sample testimonial with genuine customer feedback or remove it. Do not publish demo testimonials as real reviews.
7. Confirm the business has permission to use its photos and replace the remote Unsplash images with approved, optimized client images where needed.
8. Test all pages, links, forms, phone links and WhatsApp links on desktop and mobile before launch.

## Contact form behavior

The contact form uses the visitor's `mailto:` handler to open an email draft addressed to `SITE_CONFIG.contactEmail`. It does not send data to a server and does not store submissions. The visitor must review and send the email themselves. For reliable lead capture without relying on the visitor's email app, connect a form endpoint or a service with an appropriate free tier.

## Cloudflare Pages deployment

This is a plain static site. When creating a Cloudflare Pages project, connect the Git repository (or use Direct Upload for a one-off deployment). No build command is required. Set the build output directory to `/` if deploying from this project root. For Git-based deployment, make sure the repository root contains `index.html`.
