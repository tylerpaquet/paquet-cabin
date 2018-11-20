// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCu7lSM-9O5sjRq_gXafoe3pToVirwqp4E",
    authDomain: "paquet-cabin.firebaseapp.com",
    databaseURL: "https://paquet-cabin.firebaseio.com",
    projectId: "paquet-cabin",
    storageBucket: "paquet-cabin.appspot.com",
    messagingSenderId: "162872543760"
  }
};
