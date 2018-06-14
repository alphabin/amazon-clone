
-- drop if database exist
DROP DATABASE IF EXISTS bamazon;
-- create the db
CREATE database bamazon;

USE bamazon;

CREATE TABLE products
(
  item_id  INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(20) NULL,
  department_name VARCHAR(20) NULL,
  price decimal(8, 2) ,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);




INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("strawberry-glasses","glasses", 4.25, 1000),("blue-shirt", "shirt",8.25, 600),("green-grass","outdoor", 2.20, 1040);


INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("banana-glasses","glasses", 5.25, 400),("green-shirt", "shirt",10.40, 800),("blue-grass","outdoor", 2.20, 200);


INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("glass-glasses","glasses", 4.25, 30),("orange-shirt", "shirt",3.50, 420),("yellow-grass","outdoor", 4.20, 100);


INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("kush-glasses","glasses", 4.25, 30),("orange-shirt", "shirt",3.50, 420),("mellow-grass","outdoor", 4.20, 100);
