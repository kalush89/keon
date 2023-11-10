import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { userRoutesConfig } from './users/user.routes-config';

//Initialize the firebase-admin SDK module
admin.initializeApp();

//Get express instance
const app = express();

//to parse JSON formatted requests
app.use(bodyParser.json());

// make requests from any URL
app.use(cors({ origin: true }));

//configure routes that app will handle
userRoutesConfig(app);

//Set an Express app as the handler of our api https endpoint
export const api = functions.https.onRequest(app);