var mysql = require('mysql');
var http = require('http');
var inquirer = require('inquirer');
var Table = require('cli-table');
var item_id, item_amount;
var connection = mysql.createConnection({
	host: 'localhost',
	port:3306,
	user: 'root',
	password: '9248',
	database: 'bamazon', 
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n");
	readProducts();

	setTimeout(function(){
		inquirer.prompt([
			{
				name: "id",
				type: "input",
				message: "Please insert the ID of the item you would like to buy."
			},{
				name: "amount",
				type: "input",
				message: "how many units of this product you would like to buy."
			}

		]).then(function(answer){
			item_id = answer.id;
			item_amount = answer.amount;
			setTimeout(function(){
				updateProduct()
			}, 1000);
		});
	}, 1000 ) ;


});



function readProducts() {
	console.log("====================================================================");
	console.log("Selecting all products available for sale...\n");
	connection.query("SELECT id, product_name, price FROM products", function(err, result) {
		if (err) console.log(err);


		// Using the cli-table package to log all results of the SELECT statement

		var table = new Table({
			head: ['ID', 'Product Name', 'Price'],
			style: {
				head: ['blue'],
			}
		});

		//loops through each item in the database and pushes that information into a new row in the table
		for(var i = 0; i < result.length; i++){
			table.push(
				[result[i].id, result[i].product_name, result[i].price]
			);
		}
		console.log(table.toString());

	});
}

function updateProduct() {
	var query = connection.query("SELECT * FROM products  WHERE id = " + item_id, function(err, result) {
		if (err)  console.log('That item ID doesn\'t exist\n', err);


		if (result[0].stock_quantity < Number(item_amount)){
			console.log("Insufficient quantity!")
		}else{

			var newQuantity = result[0].stock_quantity - Number(item_amount);
			var total = result[0].price * item_amount;
			console.log("--------------------------");
			console.log("Order completed");
			console.log("The Total is: " + total.toFixed(2));
		}
	});
	endConnection();
};



function endConnection() {
	connection.end();
};
