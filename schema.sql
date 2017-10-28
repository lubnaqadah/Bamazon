DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(6,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 6", "Mobile Phones", 599.99, 150),
("Samsong Note 8", "Mobile Phones", 799.99, 100),
("Google Pixle", "Mobile Phones", 649.99, 80),

("CK Leather Jacket - Maroon", "Clothing", 89.99, 50),
("High Rise Skinny Jeans - black", "Clothing", 49.99, 20),
("Real Madrid Jersey - Home Kit", "Clothing", 119.99, 30),


("Nike Air Training Sneakers - Black", "Shoes", 89.99, 10),
("Converse Classic - White", "Shoes", 49.99, 15),
("Timberland Hiking Boot - Brown", "Shoes", 99.99, 8),

("Green Eggs And Ham", "Books", 5.99, 25),
("The Tipping Point", "Books", 16.99, 20),
("Blink", "Books", 18.99, 20);
