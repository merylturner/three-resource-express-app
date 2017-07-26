<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Three
Express Single Resources
===

## Description

This assignment has you practice creating full CRUD for a resource using ExpressJS and Mongoose.

Pick three (independent for now) resources, for example `movies`, `actors`, and `studios`.

Create a single overall express app that uses a `lib` folder with a `models` and `routes` folder.

For _each_ of the three resources:

* Create a model: 
    * Pick at least one validation that the model will have. 
    * Unit test the model showing the model failing validation and test a successful model.
    * Implement the validation
    * For at least one of your models:
        * Include a complex object property (a property that has subfields, like an address with city, state, zip)
    * For at least one of your models:
        * Include an array property (a property that holds zero or more of some values)
* Create HTTP REST routes:
    * Write E2E API tests for all of the exposed routes
    * Create a `Router` for the resource that exposes the following routes for the resource:
        * `GET /resources` list ([]) of all the resources
        * `GET /resources/:id` return single resource object with that id (or 404 if doesn't exist)
        * `POST /resources` add a new resource and return new entity from db with _id
        * `DELETE /resource/:id` Delete the resource with that id. Return `{ removed: <result> }` where `<result>`
        is `true` if it was deleted, otherwise `false`.
        * `PUT /resource/:id` The resources is updated, meaning the old document content is entirely replaced with the new
        content from the request body. 

## Bonus

Create static html/css/js files that allow you to exercise soe of your API (start with `/GET`)

#### Rubric:

* Three resource *9pts* 
    * Model and Unit Test *1pt* each
    * Route and E2E Test *2pts* each
* Express App: *1pt*
