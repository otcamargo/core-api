# **core-api**
Core api to handle basic stuff in the todo app 2.0 project

## **About the TODO app 2.0**

This is just a simple todo app used in various programming tutorials but with a twist. I decided to create a simple "architecture" so that it would work with a `nodejs back-end` and a `react front-end`.

## **My motivation**
I developed this in order to learn a little bit of typescript/javascript/react.

## **Basic setup**

### **dependencies**
  - `postgreSQL` (I'm using `postgreSQL 13`)
  - `typescript`
  - `npm/node`

### **How to install**

- Clone the repo using `git clone git@github.com:otcamargo/core-api.git`.
- Make sure you set the correct DB `user` and `password` in `ormconfig.json`.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the server.

### **Features**
This API has authentication implemented using `bcryptjs`, `jsonwebtoken`, `helmet`, `cors`, `body-parser`, `jsonwebtoken` and `typeorm` (handling DB interactions).

For more info, go to [this tutorial](https://js.plainenglish.io/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4).
