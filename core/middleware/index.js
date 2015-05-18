'use strict';

require('node-jsx').install({extension: '.jsx', harmony: true});
var React = require('react/addons');
var path = require('path');
var _ = require('lodash');

/*
 * Get html from response and parse react markup
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
exports.process = function (req, res, next) {
    if (req.specData && req.specData.isJsx) {
        var pathToFile = path.join(global.app.get('user'), req.url);
        _.each(require.cache, function cleanAllJsxReferences(cacheObj, key) {
            if (path.extname(key) === '.jsx') {
                delete require.cache[key];
            }
        });
        var component = require(pathToFile);
        var factory = React.createFactory(component);
        req.specData.renderedHtml = React.renderToString(factory({}));
    }

    next();
};