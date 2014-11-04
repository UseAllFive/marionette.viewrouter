(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['backbone', 'underscore', 'marionette'], function(Backbone, _, Marionette) {
            return factory(Backbone, _, Marionette);
        });
    } else if (typeof exports !== 'undefined') {
        var Backbone = require('backbone');
        var _ = require('underscore');
        var Marionette = require('marionette');
        module.exports = factory(Backbone, _, Marionette); // jshint ignore:line
    } else {
        factory(root.Backbone, root._);
    }
}(this, function(Backbone, _, Marionette) {
    'use strict';

    Marionette.ViewRouter = Backbone.Router.extend({
        initialize: function(options) {
            var fn;
            var showMethod;

            if (options.region && options.region instanceof Marionette.Region) {
                this._region = options.region;

                // User may have defined a custom show method on their region
                if (options.showMethod) {
                    showMethod = options.showMethod;

                    if (_.isString(showMethod)) {
                        // If passed a string, look up the method on the region
                        fn = this._region[showMethod];
                        if (!_.isFunction(fn)) {
                            throw new Error(showMethod + ' is not a function');
                        }
                        this._showMethod = fn;
                    } else if (_.isFunction(showMethod)) {
                        // Function name passed directly
                        this._showMethod = showMethod;
                    }
                } else {
                    // Default to region.show
                    this._showMethod = this._region.show;
                }
            }
        },
        execute: function(callback, args) {
            var view;

            if (callback)  {
                view = callback.apply(this, args);
                if (view instanceof Backbone.View && this._region) {
                    this._showMethod.call(this._region, view);
                }
            }
        }
    });

    return Marionette.ViewRouter;
}));
