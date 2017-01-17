// Contains defintions of the functions used in the server side javascript code

// define required variables
var mongo = require('mongodb').MongoClient;
var server = mongo.Server, Db = mongo.Db, bson = mongo.BSONPure;

// create an instance of the bookkart database for use
db = new Db('bookkart',new Server('localhost',27017,{auto_reconnect: true}));


var books = null;
// open the database for use
db.open(function(db_open_error, db){
	if(!db_open_error){
		console.log("Successfully connected to the bookkart database");
		books = db.collection('books',{strict:true},function(col_open_error,collection){
			if(col_open_error){
				console.log("Failed to detect the 'books' collections");
				// books collections doesnt exist
				books = null;
				db.close();
				// alert a server error to the user : TO CODE
			} 
		});
	}
});

// For GET : url looks like <path>/<parameter>
//		READS the data satisfying the parameter criterion
// For POST : url looks like <path> and data in body
//		CREATES a record in database as in the data of the body
// For PUT : url looks like <path>/<parameter> and data in body
//		UPDATES record(s) satisfying the parameter criterion and updates to new values as in the data of the body
// For DELETE : url looks like <path>/<parameter>
//		DELETES record(s) satisfying the parameter criterion



exports.createCategory = function(req, res){
	// create a category and add atleast one book into the database 
	// @input : 'category_name' 
	// @method = POST
	// add atleast one book under the created category. Therefore, call addBook
	// @output : null
	// TO CODE

}

exports.deleteCategory = function(req, res){
	// delete all books associated to the particular category
	// @method = DELETE
	// @input : 'category_name'
	// @output : null
	// TO CODE
}

exports.addBook = function(req, res){
	// add a book record
	// @method = POST
	// @input : 'book parameters'
	// book parameters includes book_name, author, category_name, price, number of copies
	// @output : null
	// TO CODE
}

exports.deleteBook = function(req, res){
	// delete a specific book, identified by book_name
	// @method = DELETE
	// @input : 'book.book_name'
	// @output : null
	// TO CODE
}

exports.findPrice = function(req, res){
	// find the price of a book identified by book_name
	// @method = GET
	// @input : 'book.name, book.author'
	// @output : book.price
	// TO CODE
}

exports.updatePrice = function(req, res){
	// update an attribute of the book record identified by book_name 
	// @method = PUT
	// @input : 'book.name, book.author, book.attribute, newvalue'
	// @output : returns status message 
	// the url for this call looks like <path>/<book_name> with some post data

	var book_name = req.params.name;
	var updated_details = req.body;

	console.log('Updating book named ' + book_name);
	console.log('To record :' + JSON.stringify(updated_details));

	//update the book identified by the name
	books.update({'book_name':book_name}, updated_details, {safe:true}, function(err, result) {
		if (err) {
			// if error occurred, then send fail in the response message
			console.log('Error updating book: '+book_name" : " + err);
			res.send({'status':'Failed to update the specified record'});
		} else {
			// otherwise, send a success message in the response text
			console.log('Successfully updated!! ' + result + ' document(s) updated');
			res.send({'status':'Success'});		
		}
	});

}

exports.cleanOutOfStocks = function(req, res){
	// clear all records with book.number_of_copies=0	
	// @method = DELETE
	// @input : null
	// @output : null
	// TO CODE
}

exports.viewBooks = function(req, res){
	// displays 10 books at a time
	// @method = GET
	// @input : 'category name'
	// @output : null
	// TO CODE
}
