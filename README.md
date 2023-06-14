# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build and serve locally

Run `npm run start-pwa` to build and run app with PWA support.

## Service Worker Overview

A Service Worker is like background daemon process that sits between our web application and the network, intercepting all HTTP requests made by the application.

The Service Worker does not have access direct access to the DOM. Actually, the same Service Worker instance is shared across multiple tabs of the same application and can intercept the requests from all those tabs.

Note that for security reasons the Service Worker cannot see requests made by other web applications running in the same browser, and only works over HTTPS (except on localhost, for development purposes).

In summary: a Service Worker is a network proxy, running inside the browser itself!
to read more follow this link : https://blog.angular-university.io/service-workers/


