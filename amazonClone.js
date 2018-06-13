var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Kaya@1234",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    //console.log("Success");
    selectItem();
});

function start() {
    inquirer
        .prompt({
            name: "postOrBid",
            type: "rawlist",
            message: "Would you like to [POST] an auction or [BID] on an auction?",
            choices: ["POST", "BID"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.postOrBid.toUpperCase() === "POST") {
                postAuction();
            }
            else {
                bidAuction();
            }
        });
}

function selectItem() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
         inquirer
            .prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id + ":" + results[i].product_name + ":" + results[i].price + ":" + results[i].stock_quantity);
                        }
                        return choiceArray;
                    },
                    message: "\nWhat item would you like to buy?\n  ID:ItemName:Price:Quantity\n "
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How much would you like to buy?"
                }
                
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                var currentQuantity;
                var itemHumanName;
                var choiceParsed = (answer.choice.split(":"))[0];
                var cost;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id == choiceParsed) {
                        chosenItem = results[i].item_id;
                        currentQuantity = results[i].stock_quantity;
                        itemHumanName =results[i].product_name;
                        cost = results[i].price;
                     }
                }

                var buyNum = answer.amount;
                var leftNum = currentQuantity - buyNum;

                if (leftNum >= 0) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: leftNum
                            },
                            {
                                item_id: chosenItem
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("\nBid placed successfully!");
                            console.log("\n\tYour total Cost == [$"+ (buyNum * cost).toFixed(2)+"]");
                            selectItem();
                        }
                    );
                }
                else{
                    console.log("\n\n\t\tCant Do that We are out of that Item or Invalid Quanity!! of " + itemHumanName+"\n\n");
                    selectItem();
                }
            });
    });
}


