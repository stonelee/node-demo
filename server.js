var express = require('express'),
  fs = require('fs'),
  env = process.env.NODE_ENV || 'development',
  config = require('./config')[env],
  mongoose = require('mongoose');

mongoose.connect(config.db);

var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
  require(models_path + '/' + file);
});
