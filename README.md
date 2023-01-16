# CalendarApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## (Backend) package.json scripts

- Windows
  "build": "npm-run-all clean tsc",
  "clean": "rimraf dist",
  "tsc": "tsc",
  "start": "node dist/src/index.js",
  "dev": "npm-run-all build start"
- MacOS/Linux
  "build": "npm run clean; tsc;",
  "clean": "rm -rf dist",
  "start": "node dist/src/index.js",
  "dev": "npm run build; npm start"
