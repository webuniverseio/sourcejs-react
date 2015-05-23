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
        _.each(require.cache, function cleanAllJsxReferences(cacheObj, key) {
            if (path.extname(key) === '.jsx') {
                delete require.cache[key];
            }
        });
        var pathToFile = path.join(global.app.get('user'), req.url);
        var html;
        try {
            var component = React.createFactory(require(pathToFile));
            html = getHtml(component);
        } catch (ex) {
            html = getErrorAsHtml(ex);
        }
        req.specData.renderedHtml = html;
    }

    next();
};

function getHtml(component) {
    try {
        return React.renderToString(component({}));
    } catch(ex) {
        return getErrorAsHtml(ex);
    }
}

function getErrorAsHtml(ex) {
    if (global.MODE !== 'development') {
        console.error(ex);
        return 'Server error';
    }

    var error = React.createFactory(require('./error.jsx'));
    return React.renderToString(error({
        stack: ex.stack
    }));
}
