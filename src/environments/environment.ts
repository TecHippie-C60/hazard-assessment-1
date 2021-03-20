// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://bluerockmicro.com/api/',
  authUrl: 'https://bluerockmicro.com/auth/',
  formUrl: 'https://bluerockmicro.com/form/',

  // authUrl: 'http://localhost:9000/',
  // userUrl: 'http://localhost:9001/',
  // formUrl: 'http://localhost:9002/',
  // apiUrl: 'http://localhost:9003/',
  pinKeySecret: 'supersecret',
  pin: 111111
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
