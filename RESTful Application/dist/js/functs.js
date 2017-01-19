xhr = new XMLHttpRequest();
function addCategory(){
	var category = document.getElementById("CategoryName");
	xhr.onreadystatechange = updateCat;
	xhr.open("POST","http://localhost:7766/add_category",true);
	xhr.setRequestHeader("Content-type","application/json");
	console.log("http://localhost:7766/add_category/");
	// paste input as json object while sending
	send_obj={}
	send_obj.category = category.value;
	console.log(JSON.stringify(send_obj));
	xhr.send(JSON.stringify(send_obj));
}

function updateCat(){
	if(xhr.readyState==4 && xhr.status==200){
		var obj = JSON.parse(xhr.responseText);
		console.log(obj);
		if(obj.status == "Success"){
			$("#f1bs").removeClass("in").show();
			$("#f1bs").delay(200).addClass("in").fadeOut(2000);
		}else{
			$("#f1bf").removeClass("in").show();
			$("#f1bf").delay(200).addClass("in").fadeOut(2000);
		}
	}
}

function removeCategory(){
	category = document.getElementById("removeBCategory");
	xhr.onreadystatechange=updateRemoveCat;
	xhr.open("DELETE","http://localhost:7766/delete_category/"+category.value,true);
	xhr.send();
}

function updateRemoveCat(){
	if(xhr.readyState==4 && xhr.status==200){
		var obj = JSON.parse(xhr.responseText);
		console.log(obj);
		if(obj.status == "Success"){
			$("#f2bs").removeClass("in").show();
			$("#f2bs").delay(200).addClass("in").fadeOut(2000);
			getCategories();
		}else{
			$("#f2bf").removeClass("in").show();
			$("#f2bf").delay(200).addClass("in").fadeOut(2000);
		}
		obj = JSON.parse(xhr.responseText);
		console.log(obj);
	}
}

//get the price from the server 
function getPrice(){
	bookname = document.getElementById("gpBookName");
	xhr.onreadystatechange=priceUpdate;
	xhr.open("GET","http://localhost:7766/find_price/"+bookname.value,true);
	xhr.send();
}

function priceUpdate(){
	if(xhr.readyState==4 && xhr.status==200){
		var obj = JSON.parse(xhr.responseText);
		console.log(obj);
		document.getElementById('gpbookname').innerHTML = obj.book_name;
		document.getElementById('gpauthor').innerHTML = obj.author;
		document.getElementById('gpprice').innerHTML = obj.price;
	}
}

// delete the book
function deleteBook(){
	bookname = document.getElementById("rbBookName");
	xhr.onreadystatechange=bookDeleteUpdate;
	xhr.open("DELETE","http://localhost:7766/delete_book/"+bookname.value,true);
	xhr.send();
}

function bookDeleteUpdate(str){
	if(xhr.readyState==4 && xhr.status==200){
		var obj = JSON.parse(xhr.responseText);
		if(obj.status == "Success"){
			$("#f5bs").removeClass("in").show();
			$("#f5bs").delay(200).addClass("in").fadeOut(2000);
			getAllBooks();
		}else{
			$("#f5bf").removeClass("in").show();
			$("#f5bf").delay(200).addClass("in").fadeOut(2000);
		}
	}
}
	
// add a new book
function addBook(){
	xhr.onreadystatechange = updateAddBook;
	xhr.open("POST","http://localhost:7766/add_book",true);
	xhr.setRequestHeader("Content-type","application/json");
	send_obj={};
	send_obj.category = document.getElementById("addBCategory").value;
	send_obj.book_name = document.getElementById("BookName").value;
	send_obj.number_of_copies = document.getElementById("NumberOfCopies").value;
	send_obj.price = document.getElementById("BookPrice").value;
	send_obj.author = document.getElementById("Author").value;
	console.log(JSON.stringify(send_obj));
	xhr.send(JSON.stringify(send_obj));
}

function updateAddBook(){
	if(xhr.readyState==4 && xhr.status==200){
		console.log(obj);
		var obj = JSON.parse(xhr.responseText);
		if(obj.status == "Success"){
			$("#f3bs").removeClass("in").show();
			$("#f3bs").delay(200).addClass("in").fadeOut(2000);
		}else{
			$("#f3bf").removeClass("in").show();
			$("#f3bf").delay(200).addClass("in").fadeOut(2000);
		}
	}
}
	
//update the price
function updatePrice(){
	bookname = document.getElementById("upBookName");
	xhr.onreadystatechange=updateNewPrice;
	xhr.open("PUT","http://localhost:7766/update_price/"+bookname.value,true);
	xhr.setRequestHeader("Content-type","application/json");
	send_obj={};
	send_obj.price=document.getElementById("NewPrice").value;
	console.log(JSON.stringify(send_obj));
	xhr.send(JSON.stringify(send_obj));
}

function updateNewPrice(){
	if(xhr.readyState==4 && xhr.status==200){
		obj=JSON.parse(xhr.responseText);
		if(obj.status == "Success"){
			$("#f7bs").removeClass("in").show();
			$("#f7bs").delay(200).addClass("in").fadeOut(2000);
		}else{
			$("#f7bf").removeClass("in").show();
			$("#f7bf").delay(200).addClass("in").fadeOut(2000);
		}
		var obj = JSON.parse(xhr.responseText);
		console.log(obj);	
	}
}

// list of all books
function getAllBooks(){
	xhr.onreadystatechange = updateAllBook;
	xhr.open("GET","http://localhost:7766/get_all_books",true);
	xhr.send();
}

function updateAllBook(){
	if(xhr.readyState == 4 && xhr.status == 200){
		obj=JSON.parse(xhr.responseText);
		var len=obj.length;
		innerhtml="";
		for(var i=0;i<len;i++){
			if(obj[i].book_name){
				innerhtml+="<option value='"+obj[i].book_name+"'>"+obj[i].book_name+"</option>";
			}
		}
		$('#rbBookName').html(innerhtml).selectpicker('refresh');
		$('#upBookName').html(innerhtml).selectpicker('refresh');
		$('#gpBookName').html(innerhtml).selectpicker('refresh');
	}
}

// get books of a category
offset = 0;
function getBooksOfCategory(){
	document.getElementById("getBCategory").onchange=function(){
		offset=0;
		document.getElementById("data").innerHTML="";
	}
	xhr.onreadystatechange = updateBooksOfCategory;
	xhr.open("GET","http://localhost:7766/show/"+document.getElementById("getBCategory").value+"/"+offset,true);
	xhr.send();
}

function updateBooksOfCategory(){
	if(xhr.readyState == 4 && xhr.status == 200){
		obj=JSON.parse(xhr.responseText);
		var len=obj.length;
		node=document.getElementById("data");
		innerhtml="";
		for(var i=0;i<len;i++){
			var row = document.createElement("tr");
			row.innerHTML="<td>"+obj[i].book_name+"</td><td>"+obj[i].author+"</td><td>"+obj[i].price+"</td><td>"+obj[i].number_of_copies+"</td>";
			node.appendChild(row);
		}
		offset+=len;
	}
}

// delete the out of stock book
function deleteOutBook(){
	cat = document.getElementById("deleteOutBookInput");
	xhr.onreadystatechange = updateOutBook;
	xhr.open("DELETE","http://localhost:7766/clean",true);
	//paste input as json object while sending
	xhr.send();
}

function updateOutBook(){
	if(xhr.readyState==4 && xhr.status==200){
		var obj = JSON.parse(xhr.responseText);
		console.log("--------");
		console.log(obj.status);
		console.log("--------");
		if(obj.status == "Success"){
			$("#f6bs").removeClass("in").show();
			$("#f6bs").delay(200).addClass("in").fadeOut(2000);
		}else{
			$("#f6bf").removeClass("in").show();
			$("#f6bf").delay(200).addClass("in").fadeOut(2000);
		}
	}
}

function getCategories(){
	xhr.onreadystatechange = updateSelects;
	console.log("getting categories");
	xhr.open("GET","http://localhost:7766/get_categories",true);
	xhr.send();
}

function updateSelects(){
	if(xhr.readyState == 4 && xhr.status == 200){
		obj=JSON.parse(xhr.responseText);
		var len=obj.length;
		innerhtml="";
		for(var i=0;i<len;i++){
			innerhtml+="<option value='"+obj[i]+"'>"+obj[i]+"</option>";
		}
		$('#removeBCategory').html(innerhtml).selectpicker('refresh');
		$('#addBCategory').html(innerhtml).selectpicker('refresh');
		$('#getBCategory').html(innerhtml).selectpicker('refresh');
	}
}
