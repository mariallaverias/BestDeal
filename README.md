# BestDeal

Price comparison tool for grocery lists.

The main idea is that a user can create a grocery list and receive how much that grocery list total cost would be in different supermarkets.

Here is a first draft of a Userflow. In orange what has been developed and in blue what still hasn't and could be potential ideas for future extensions.

![Userflow](support/Userflow.png)

## Dependencies

Run npm install in project directory. This will install server-related dependencies such as express.
cd client and run npm install. This will install client dependencies (React).

## Database Prep

Access the MySQL interface in your terminal by running mysql -u root -p
Create a new database called groceries: create database groceries
Add a .env file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:
DB_HOST=localhost
DB_USER=root
DB_NAME=groceries
DB_PASS=YOURPASSWORD

Run npm run migrate in the project folder of this repository, in a new terminal window.

This will createthe following tables in your database:

+---------------------+
| Tables_in_groceries |
+---------------------+
| list |
| productcategories |
| productitems |
| products_list |
| shops |
| shops_productItems |
+---------------------+

The tables that contain dummy data are:

- productcategories
- productitems
- shops
- shops_productItems

So far there are:

3 shops (shops table), each contain 24 product items(productitems table) with different prices each (contained in the shops_productItems table).

Here is a picture of how the tables are related:

![table relationships](support/tables-dbdesigner.png)

Methods and routes to these tables:

All tables have their get all / get by id methods and routes built. Only the List table contains a Delete and Post method, but has not been used in the front-end and is empty.

## Development

Run npm start in project directory to start the Express server on port 5001
In another terminal, do cd client and run npm start to start the client in development mode with hot reloading in port 3000.

## Views and Components

### Views

There are 3 views:

- Homeview:
  at the begining it only displays the "welcome" component to allow the user to select which shops it would like the app to compare prices in.

  Once the user has added a new grocery list in the AddGroceryList View, the Homeview then displays the list added by the user, a button to save that list (no logic in the button but navigation) and the Supermarket components taht are the ones that display the grocery list prices and total in each chosen Supermarket.

- AddGroceryList View:
  this view displays the "SelectGroceriesForm" component at the top which has the two dropdowns to allow the user to select product categories and products to add to the grocery list.

  at the bottom it displays the "DisplayGroceryList" component that shows the products added to the grocery list.

- Mylists View:
  This view only includes plain html, there is no logic built in to any of the tags or buttons.

### Components

- Button component is just a button that onClick calls the cb function passed by the parent component. So far it is only used in the AddGroceryList view.
- DisplayGroceryList: displays items added to the grocerylist. User can delete added items.
- Navbar: navigation bar.
- SelectGroceriesForm: contains the 2 dropdown menus with the groceries that can be added to the list.
- Supermarket: displays the confirmed grocery list in each supermarket with the prices of each item and total.
- Welcome: diplays the checkboxes that allow the user to select the shops it wants to compare grocery lists in.

## Styling

I used Bootstrap and CSS to style it.  
Note: There is an "unexperienced" use of the "container" className all over.
