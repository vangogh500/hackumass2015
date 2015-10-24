module.exports = function(app) {
  // home page
  app.get('/', function(req, res){
    res.sendFile('./index.html');
  });
  // 404 page
  app.use(function(req, res){ res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
  });
  
  // 500 page
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
  });
};