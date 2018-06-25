const config = {};

config.port = 3002;
config.env = 'dev';
config.baseUrl = 'http://localhost:3002';
config.secret = 'secretkey';
config.dataKey = 'eyJhbGciOiJIUzI';

config.db = {};
config.db.name = 'project1';
config.db.uri = `mongodb://127.0.0.1:27017/${config.db.name}`;

module.exports = config;