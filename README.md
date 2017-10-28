
### Bamazon
***

An interactive shopping node app where MySQL and Node.JS are used to allow users to purchase items as a customer, view, track and update the product inventory as a manager.

##### Bamazon Customer Portal
***

The Bamazon Customer Portal allows users to view the current items available for purchase.  The user will be prompted to enter the item id# and how many items they wish to purchase.  If the item is in stock, the order will be completed and the user will see the total amount of their purchase.
If there was no enough quantity the order will not go through.

![Customer Portal](assets/customer1.png)
![Customer Portal](assets/customer2.png)


##### Bamazon Manager Portal
***

The Bamazon Manager Portal allows managers to view and edit the inventory of the store.  The user will be prompted to choose from the following options:
* View products for sale
* View low inventory
* Add to inventory
* Add a new product

![Bamazon Manager Portal - Options](assets/managerOptions.PNG)


###### Manager Options 1 
***


The first option allows the user to see the list of products that are currently for sale, what department the item belongs to, the price of the product and how much stock is left for that product.

![Bamazon Manager Portal - Option 1](assets/managerViewProducts.PNG)


###### Manager Options 2 
***
The second option allows the user to see a list of all inventory items that have less than 5 items in stock.  If there are no products that meet this criteria, the user will see an empty table.

![Bamazon Manager Portal - Option 2](assets/managerLowInventory.PNG)


###### Manager Options 3 
***

The third option allows the user to update the inventory for a specific product.  A prompt asks what the id is for the product the manager wants to update.  A second prompt asks how many items the manager wishes to add.

![Bamazon Manager Portal - Options 3](assets/managerAddInventory.PNG)

###### Manager Options 4 
***

The last option allows the manager to add a new product to the inventory. Prompts ask the manager for the product id#, name, department,price and the quantity.

![Bamazon Manager Portal - Options 4](assets/managerAddProduct.PNG)




#### Technologies Used:
***

* nodeJS
* MySQL
* npm packages:
	- [mysql](github.com/mysqljs/mysql)
	- [inquirer](github.com/SBoudrias/Inquirer.js)
	- [cli-table](https://github.com/Automattic/cli-table)



