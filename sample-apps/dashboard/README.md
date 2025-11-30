# Dashboard Sample App

A comprehensive dashboard application with login flow, perfect for building and testing complex UI scenarios with Vizwright.

## Pages

- `index.html` - Login page with email/password form
- `dashboard.html` - Protected dashboard page showing user info

## Test Credentials

**Regular User:**

- Email: `user@example.com`
- Password: `user123`

**Admin User:**

- Email: `admin@example.com`
- Password: `admin123`

## Features

- Clean, modern UI with gradient background
- Form validation
- Error messages for invalid credentials
- Session management using `sessionStorage`
- Protected dashboard route
- Responsive design
- Test-friendly attributes (`data-testid`)

## Running

The app runs as static HTML files with no build step required. Simply open `index.html` in a browser
or serve via a local web server.

For Vizwright testing, the backend can serve these files directly.
