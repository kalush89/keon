import { Application } from "express";
import { create, all, get, patch, remove } from "./user.controller";

import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

//For operations to get or update a single user where :id param is sent, 
//we also allow the same user to execute the operation.

//set a create handler at POST 'users'

export function userRoutesConfig(app: Application) {
    app.post('/users',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin'] }),
        create
    );
    app.get('/users', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        all
    ]);
    // get :id user
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'], allowSameUser: true }),
        get
    ]);
    // updates :id user
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager','user'], allowSameUser: true }),
        patch
    ]);
    // deletes :id user
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager', 'user'], allowSameUser: true }),
        remove
    ]);
}