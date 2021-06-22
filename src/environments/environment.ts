// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://open.faceit.com/data/v4/players?nickname=',
  apiPlayers: 'https://open.faceit.com/data/v4/players/',
  apiRank: 'https://open.faceit.com/data/v4/rankings/games/csgo/regions/',
  apiMatch: 'https://open.faceit.com/data/v4/matches/',
  apiSearch: 'https://open.faceit.com/data/v4/search/players?nickname=',
  apiKey: 'Bearer 85ede40f-85de-4297-877b-00a1a8be1f65',
  postUrl: 'http://localhost:3000/demo/upload'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
