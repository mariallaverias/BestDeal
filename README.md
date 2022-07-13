# BestDeal

Price comparison tool for grocery lists

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

Methods:

All tables have their get all / get by id methods and routes built. Only the List table contains a Delete and Post method, but has not been used in the front-end.

## Development

Run npm start in project directory to start the Express server on port 5001
In another terminal, do cd client and run npm start to start the client in development mode with hot reloading in port 3000.
