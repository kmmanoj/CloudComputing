var express = require('express');
var object = require('./routes/operations.js');
var app = express();

// create category : POST
app.post('/add_category/:category',object.createCategory);

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

var path = require('path');

app.get('*/node_modules/bootstrap/dist/css/bootstrap.css',function(req, res){
	// the url callback for the bootstrap code
	res.sendFile(path.join(__dirname+'/node_modules/bootstrap/dist/css/bootstrap.css'));
});

app.get('*/node_modules/bootstrap/dist/js/bootstrap.js', function(req, res){
	// the url callback for the jquery code
	res.sendFile(path.join(__dirname+'/node_modules/bootstrap/dist/js/bootstrap.js'));
});

// other urls : display page not found
app.get('*',function(req, res){
	// display a static ' 404 Page not found '  html page
	res.sendFile(path.join(__dirname+'/pnf404.html'));
});

app.listen(7766);
console.log("Server booted up !! Listening at localhost:7766");
