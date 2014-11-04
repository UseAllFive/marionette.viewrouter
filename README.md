Marionette.ViewRouter
===================

`Marionette.ViewRouter` borrows its philosophy from the traditional HTTP request / response paradigm; insofar that a routing event should return a `response`.

Traditionally, a response contains the payload for a requested resource (as well as header metadata; not important here) which the browser renders to your screen. This definition has been adapted in terms of a 'single page' Javascript application such that a matched route should invoke a function whose returned `Backbone.View` will be rendered into a `Marionette.Region` (naturally, this works with any `Marionette.View` since they are valid `Backbone.View`s).

Philosophy writeup still developing...

### Example

**Router definition**
```javascript
// web/js/apps/example_app/router.js

define([
    './controller',
    'marionette.viewrouter'
], function(HomeController, ViewRouter) {
    return ViewRouter.extend({
        routes: {
            '': 'home'
        },
        home: function() {
            var controller;

            // Every controller should implement a `getView()`
            // function
            controller = new HomeController();
            return controller.getView();
        }
    });
});

```

**App definition**
```javascript
// web/js/app.js

define([
    'marionette'
], function(Marionette) {
    // Start up a new Marionette Application
    var app = new Marionette.Application();
    // Using this pattern, apps should have one main app
    // region.
    // Sub modules/applications should define their own
    // layouts/regions to properly leverage the functionality
    // of the routing system
    app.addRegions({
        appRegion: '#app'
    });

    App.on('start', function() {
        // Initialize all routers before history starts
        require([
            'apps/example_app/router'
        ], function(ExampleAppRouter) {
            new ExampleAppRouter({
                region: app.appRegion
            });

            if (Backbone.history) {
                Backbone.history.start();
            }
        });
    });
});

```
