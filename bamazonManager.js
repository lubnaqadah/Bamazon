var mysql = require('mysql');
var http = require('http');
var inquirer = require('inquirer');
var Table = require('cli-table');
var item_id, item_amount;
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '9248',
	database: 'bamazon', 
});

connection.connect(function(err) {
	if (err) console.log(err);
	console.log("connected as id " + connection.threadId + "\n");
	console.log("====================================================================");

	inquirer.prompt([
		{
			name: "list",
			type: "list",
			choices:['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			message: "Would you like to..."
		}

	]).then(function(answer){

		switch(answer.list) {
			case "View Products for Sale":
				readProducts();
				break;
			case "View Low Inventory":
				lowInventory();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product":
				addProduct();
				break;
						  };

	});



});




function readProducts() {
	console.log("====================================================================");
	console.log("Selecting all products available for sale...\n");
	connection.query("SELECT * FROM products", function(err, result) {
		if (err) console.log(err);


		// Using the cli-table package to log all results of the SELECT statement

		var table = new Table({
			head: ['ID', 'Product Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['blue'],
			}
		});

		//loops through each item in the database and pushes that information into a new row in the table
		for(var i = 0; i < result.length; i++){
			table.push(
				[result[i].id, result[i].product_name, result[i].price, result[i].stock_quantity]
			);
		}
		console.log(table.toString());

	});

}

function lowInventory(){

	var query = connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, result){

		// Using the cli-table package to log all results of the SELECT statement

		var table = new Table({
			head: ['ID', 'Product Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['blue'],
			}
		});

		//loops through each item in the database and pushes that information into a new row in the table
		for(var i = 0; i < result.length; i++){
			table.push(
				[result[i].id, result[i].product_name, result[i].price, result[i].stock_quantity]
			);
		}
		console.log(table.toString());
	})

	endConnection();	
};


function addInventory(){
	inquirer.prompt([
		{
			name: "id",
			type: "input",
			message: "Please insert the id of the product that you want to add more stock to it."
		},{
			name: "amount",
			type: "input",
			message: "Please insert the amount of stock you want to add."
		}

	]).then(function(answer){
		var id = answer.id;
		var amount = answer.amount

		var query = connection.query("SELECT * FROM products  WHERE id = " + id, function(err, result) {
			if (err)  console.log('That item ID doesn\'t exist\n', err);

			newQuantity = result[0].stock_quantity + Number(amount);
			 	
			
			var query = connection.query("UPDATE products SET stock_quantity = " + newQuantity + " where id = " + id, function(err, res){
				if (err) console.log(err);
				
				console.log("----------------------");
				console.log("Updated Stock successfully!!\n");
				readProducts()
			}) ;
		} )
		});
//	endConnection();
};


function addProduct(){
	inquirer.prompt([
		{
			name: "itemName",
			type: "input",
			message: "Please insert the product name."
		},{
			name: "department",
			type: "input",
			message: "Please insert the product's department."
		},{
			name: "itemPrice",
			type: "input",
			message: "Please insert the product price."
		},{
			name: "itemQuantity",
			type: "input",
			message: "Please insert the product quantity."
		}

	]).then(function(answer){
		var itemName = answer.itemName;
		var department = answer.department;
		var itemPrice = answer.itemPrice;
		var itemQuantity = answer.itemQuantity;

		var query = connection.query(
			"INSERT INTO products SET ?",
			{
				product_name : itemName,
				department_name : department,
				price :itemPrice,
				stock_quantity :itemQuantity
			},
			function(err, res){
				if (err) console.log(err);
				console.log("----------------------");
				console.log("product added successfully!\n");
				
				readProducts();
			})
		})
};


function endConnection() {
	connection.end();
};
