# App

Hazard Assessment is a mobile-ready app used to help assess the risk of harm with respect to work-place conditions. The app presents a ready-to-use form for the submission of assessment information which is gathered in a central database. Collected forms can be accessed from the app for further analysis and proceessing.

There are several ways to deploy the app.
1. Run it from a sub-domain on your website
2. Embed it on a page on your website
3. Use the formloco designer to add it to a form

To see the app in action check out https://hazard-assessment.formloco.com

## Deployment

The fastest way to get up and running is to copy the `/dist/forms` folder into a web server directory. The app will run when you hit the web url in your browser.

The formloco frontend is written in Angular, you can fork or clone the repo to your local machine and use the Angular CLI to run it at `localhost:4200`.

Both these scenarios will run against the formloco API by default.

For information on how to deploy formloco to your own server or cloud service check out https://github.com/formloco/formloco/wiki/Deployment.

## Docs

https://github.com/formloco/hazard-assessment/wiki
​
## License & copyright

Licensed under the [MIT License](LICENSE).