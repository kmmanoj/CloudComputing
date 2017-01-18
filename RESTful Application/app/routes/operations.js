// Contains defintions of the functions used in the server side javascript code

// define required variables
var mongo = require('mongodb');
var Server = mongo.Server,
	Db = mongo.Db;
	// bson = mongo.BSONPure;

var dbserver = new Server('localhost', 27017, {auto_reconnect: true});
// create an instance of the bookkart database for use
db = new Db('bookkart',dbserver);

var books = null;
// open the database for use
db.open(function(db_open_error, db){
	if(!db_open_error){
		console.log("Successfully connected to the bookkart database");
		db.collection('books',{strict:true},function(col_open_error,collection){
			if(col_open_error){
				console.log("Failed to detect the 'books' collections due to "+col_open_error);
				// books collections doesnt exist
				books = null;
				db.close();
				// alert a server error to the user : TO CODE
			} else {
				console.log("Successfully detected the 'books' collections");
				books = collection;
			}
		});
	} else {
		console.log("Failed to connect to bookkart database");
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


// create a category and add atleast one book into the database 
// @input : 'category_name' 
// @method = POST
// add atleast one book under the created category. Therefore, call addBook
// @output : null

exports.check = function(req, res){
	var p = req.params.some;
	console.log("somthign more");
	console.log(books);
	res.send();
}

exports.createCategory = function(req, res){
	if(books==null){
		res.send({'status':'Error in connecting to database'});
		return;
	}
	// get the category data from the body 
	var category_name = req.params.category;
	console.log("Creating a new category "+category_name);

	// call addBook function handler html with category_name specified
	// TO CODE
}

// delete all books associated to the particular category
// @method = DELETE
// @input : 'category_name'
// @output : null
exports.deleteCategory = function(req, res){
	if(books==null){
		res.send({'status':'Error in connecting to database'});
		return;
	}
	// get the name of the book to be deleted from the url
	var category_name = req.params.category;

	//delete the category : delete all books that fall under this category from the database
	books.remove({'name':book_name},{safe:true},function(err, result){
		if(err){
			console.log("Failed to delete books unser the category " + category_name +" : "+err);
			res.send({'status':'Error in deleting the category ' + category_name});
		} else {
			console.log('Successfully Deleted !!' + result + ' book(s) deleted');
			res.send({'status':'Success'});
		}
	});
}

// add a book record
// @method = POST
// @input : 'book parameters'
// book parameters includes book_name, author, category_name, price, number of copies
// @output : null
exports.addBook = function(req, res){
	if(books==null){
		res.send({'status':'Error in connecting to database'});
		return;
	}
	// get the data from body
	var book_details = req.body;

	//insert the obtained json
	books.insert(book_details,{safe:true},function(err, result){
		if(err){
			console.log('Error in adding book');
			res.send({'status':'Error in adding book'});
		} else {
			console.log('Successfully inserted !!' + result + ' book(s) inserted ');
			res.send({'status':'Success'});
		}
	});
}

// delete a specific book, identified by book_name
// @method = DELETE
// @input : 'book.book_name'
// @output : null
exports.deleteBook = function(req, res){
	if(books==null){
		res.send({'status':'Error in connecting to database'});
		return;
	}
	//get the book name from the url
	var book_name = req.params.book;

	//delete book with name = book_name from the database 
	books.remove({'book':book_name},{safe:true},function(err, result){
		if(err){
			console.log('Error in deleting book named ' + book_name);
			res.send({'status':'Error in deleting book ' + book_name});
		} else {
			console.log('Successfully deleted !!' + result + ' book(s) deleted ');
			res.send({'status':'Success'});
		}
	});
}

// find the price of a book identified by book_name
// @method = GET
// @input : 'book.book_name'
// @output : book.price
exports.findPrice = function(req, res){
	if(books==null){
		res.send({'status':'Error in connecting to database'});
		return;
	}
	// get the data from the url
	var book_name = req.params.book;

	// get the price of the book and send it
	books.findOne({'book':book_name},function(err, doc){
		if(err){
			console.log('Error in finding the book');
			res.send({'status':'Error in finding book'});
		} else {
			console.log('Successfully found !!');
			res.send({'price':doc.price, 'status':'Success'});
		}
	});
}

// update an attribute of the book record identified by book_name 
// @method = PUT
// @input : 'book.name, book.author, book.attribute, newvalue'
// @output : returns status message 
// the url for this call looks like <path>/<book_name> with some post data
exports.updatePrice = function(req, res){
	if(books==null){
		res.send({'status':'Error in connecting to database'});
		return;
	}
	// get the book_name from the url, and the updated data from the body
	var book_name = req.params.book;
	var updated_details = req.body;

	console.log('Updating book named ' + book_name);
	console.log('To record :' + JSON.stringify(updated_details));

	//update the book identified by the name
	books.update({'book_name':book_name}, updated_details, {safe:true}, function(err, result) {
		if (err) {
			// if error occurred, then send fail in the response message
			console.log('Error updating book: '+book_name + ' : ' + err);
			res.send({'status':'Failed to update the specified record'});
		} else {
			// otherwise, send a success message in the response text
			console.log('Successfully updated!! ' + result + ' book(s) updated');
			res.send({'status':'Success'});		
		}
	});
}

// clear all records with book.number_of_copies=0	
// @method = DELETE
// @input : null
// @output : null
exports.cleanOutOfStocks = function(req, res){
	if(books==null){
		res.send({'status':'Error in connecting to database'});
		return;
	}
	// no data required from the page

	// delete all the books which are out of stock
	books.remove({'number_of_copies':0}, {safe:true}, function(err, result){
		if(err){
			console.log('Error in deleting out of stock books ');
			res.send({'status':'Error in deleting out of stock books'});
		} else {
			console.log('Successfully deleted out of stock books!!' + result + ' book(s) deleted ');
			res.send({'status':'Success'});
		}
	});
}

// displays 10 books at a time
// @method = GET
// @input : 'category name, offset'
// @output : array of json documents
exports.viewBooks = function(req, res){
	if(books==null){
		res.send([{'status':'Error in connecting to database'}]);
		return; 
	}
	// get category name from the url
	var category_name = req.params.category;
	// get the offset from which data has to be retrieved 
	var offset=req.params.offset;

	console.log("Category : "+category_name+" offset : "+offset+" . ");

	// TO CODE should include limit and offset attributes
	var requirements = {
		"limit" : 10,
		"skip" : offset
	}

	// get the retrived documents in the form of an array
	books.find({'category':category_name},requirements).toArray(function(err, doc){
		if(err){
			console.log('Error in retrieving data');
			res.send([{'status':'Error in retrieving data'}]);
		} else {
			res.send(doc);
		}
	});
}
