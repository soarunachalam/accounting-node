var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var cons = require('consolidate');
var url = require('url');
var models = require('../app/models/');

module.exports = function (app) {
	app.use(logger('dev'));
	app.use(express.static(path.join(__dirname, '..\\public')));

	app.set('views', path.join(__dirname, '..\\views'));
	app.engine('dust', cons.dust);
	app.set('view engine', 'dust');

	jsonParser = bodyParser.json();
	urlencodedParser = bodyParser.urlencoded({ extended: true })
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(function (req, res, next) {
      models(function (err, db) {
        if (err) return next(err);

        req.models = db.models;
        req.db     = db;

        return next();
      });
    })
};