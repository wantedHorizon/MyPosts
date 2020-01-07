# MyPosts

![alt tag](https://i.ibb.co/d4gstXv/MyPost.png)


This app is a posts uploading system.
The system allows login, registration, and upload/edit posts with images.

upload is allowed only to logged-in users,
editing is restricted to the post creators.

This project was generated with Angular, Express, node.js, mongoose MongoDB.

Deployed with aws on :
`http://mean-angular-nodejs-mypost.s3-website.us-east-2.amazonaws.com/`

This app is built with angular for the frontend.

The backend uses a RESTFUL API method, deployed in a separated server built with NODE.JS.

To add your own mongoDB database plz add `MONGO_ATLAS_PW` password on  `nodemon.json`



## Development server locally

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
-- make sure to run `npm run start:server` to start the backend server on http://localhost:3000/ and verify those ports are free.



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

