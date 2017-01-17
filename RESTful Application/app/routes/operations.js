// Contains defintions of the functions used in the server side javascript code

// define required variables
var mongo = require('mongodb').MongoClient;
var server = mongo.Server, Db = mongo.Db, bson = mongo.BSONPure;

// create an instance of the bookkart database for use
db = new Db('bookkart',new Server('localhost',27017,{auto_reconnect: true}));

// open the database for use
db.open(function(db_open_error, db){
	if(!db_open_error){
		console.log("Successfully connected to the bookkart database");
		db.collection('books',{strict:true},function(col_open_error,collection){
			if(col_open_error){
				console.log("Failed to detect the 'books' collections");
			}
		});
	}
});

exports.createCategory = function(req, res){
	// create a category and add atleast one book into the database 
	// @input : 'category name' 
	// method = GET?
	// add atleast one book under the created category
	// therefore, call addBook
	// @output : null
}

exports.deleteCategory = function(req, res){
	// delete all books associated to the particular category
	// method = GET? 
	// @input : 'category name'
	// @output : null
}

exports.addBook = function(req, res){
	// add a book record
	// method = POST?
	// @input : 'book parameters'
	// book parameters includes (name, author), category name, price, number of copies
	// @output : null
}

exports.deleteBook = function(req, res){
	// delete a specific book, identified by (name, author)
	// method = DELETE?
	// @input : 'book.name, book.author'
	// @output : null
}

exports.findPrice = function(req, res){
	// find the price of a book identified by (name, author)
	// method = GET?
	// @input : 'book.name, book.author'
	// @output : book.price
}

exports.updatePrice = function(req, res){
	// update an attribute of the book record identified by (name, author)
	// method = UPDATE?
	// @input : 'book.name, book.author, book.attribute, newvalue'
	// @output : null
}

exports.cleanOutOfStocks = function(req, res){
	// clear all records with book.number_of_copies=0	
	// method = none?
	// @input : null
	// @output : null
}
