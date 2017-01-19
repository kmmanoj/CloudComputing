var express = require('express');
var object = require('./routes/operations');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// create category : POST
app.post('/add_category',object.createCategory);

// delete category : DELETE
app.delete('/delete_category/:category',object.deleteCategory);

// add book : POST
app.post('/add_book',object.addBook);

// delete book : DELETE
app.delete('/delete_book/:book',object.deleteBook);

// find price : GET 
app.get('/find_price/:book',object.findPrice);

// update price : PUT
app.put('/update_price/:book',object.updatePrice);

// clean out of stock : DELETE
app.delete('/clean',object.cleanOutOfStocks);

// view books : GET
app.get('/show/:category/:offset',object.viewBooks);

// get all categories
app.get('/get_categories',object.getCategory);

//get all books
app.get('/get_all_books',object.getAllBooks);

// show the static index page
app.get('/',function(req, res){
	res.sendFile(path.join(__dirname+'/index.html'));
});

// some supporting files : such as manual css, jquery, and script files
app.get('*/node_modules/bootstrap/dist/css/bootstrap.css',function(req, res){
	res.sendFile(path.join(__dirname+'/node_modules/bootstrap/dist/css/bootstrap.css'));
});

app.get('*/node_modules/bootstrap/dist/js/bootstrap.js', function(req, res){
	res.sendFile(path.join(__dirname+'/node_modules/bootstrap/dist/js/bootstrap.js'));
});

app.get('/dist/css/bootstrap.min.css',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/css/bootstrap.min.css'));
});

app.get('/dist/css/bootstrap-select.css.map',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/css/bootstrap-select.css.map'));
});

app.get('/dist/css/style.css',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/css/style.css'));
});

app.get('/dist/css/bootstrap-select.css',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/css/bootstrap-select.css'));
});

app.get('/dist/css/bootstrap-select.min.css',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/css/bootstrap-select.min.css'));
});

app.get('/dist/js/bootstrap.min.js',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/js/bootstrap.min.js'));
});

app.get('/dist/js/bootstrap-select.js.map',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/js/bootstrap-select.js.map'));
});

app.get('/dist/js/tether.min.js',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/js/tether.min.js'));
});

app.get('/dist/js/bootstrap-select.js',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/js/bootstrap-select.js'));
});

app.get('/dist/js/jquery.min.js',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/js/jquery.min.js'));
});

app.get('/dist/js/functs.js',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/js/functs.js'));
});

app.get('dist/js/bootstrap-select.min.js',function(req, res){
	res.sendFile(path.join(__dirname+'/dist/js/bootstrap-select.min.js'));
});

// other urls : display page not found webpage
app.get('*',function(req, res){
	// display a static ' 404 Page not found '  html page
	res.sendFile(path.join(__dirname+'/pnf404.html'));
});

app.listen(7766);
console.log("Server booted up !! Listening at localhost:7766");
