'use strict';
/*************************
 *  Why this demo app?
 *  To Explain how easy some of the "hard" parts of building an app can be combining Tabris.js with Backendless
 *  1. User Management - Register, Login, Persist session, Personal data, Social login (TODO)
 *  2. Data CRUD - Create, Read, Update, Delete assets.
 *  3. File management - Upload images taken on the device. Scale on Server (TODO).
 *  4. Realtime communication between clients via Pubsub
 *  5. Push notifications? (TODO)
 *
 *
 *  Note: while this app conveys some security rules - for instance only you can delete your posts (not other users),
 *  You also have to enforce security permissions in Backendless
 *
 */
import {guid} from './../utils';

/*******************
 * Setup Backendless
 */
const Backendless = require('backendless');
const APPLICATION_ID = '20B6BCEC-3854-082A-FFEB-62B6E777F500',
  SECRET_KEY = '13731232-AB6B-639F-FF0A-213A0E8B2700',
  VERSION = 'v1'; //default application version;

Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
Backendless.enablePromises();

export default Backendless;

/*******************
 * Saving Images
 */

export function saveFile(fileContent){
  /****************
   * I decided to use the Rest option instead of the SDK which depends on browser capabilities.
   */
  return new Promise(function(resolve, reject) {
    let xhr = new tabris.XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if(xhr.status === 200){
          resolve(JSON.parse(xhr.responseText));
        }
        else {
          reject({error: "Something went wrong uploading to backendless.com. Status: "+xhr.status+ " Error: " + xhr.responseText});
        }
      }
    };
    xhr.open("PUT", `https://api.backendless.com/${VERSION}/files/binary/savedFiles/${guid()}.jpg?overwrite=false`, true);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.setRequestHeader("application-id", APPLICATION_ID);
    xhr.setRequestHeader("secret-key", SECRET_KEY);
    xhr.setRequestHeader("application-type", "REST");
    xhr.send(fileContent);
  });
}
