# Smartphone Management Inventory
# Live Site Link --> https://smartphone-management-client-gold.vercel.app/

## Server Live Link --> https://smartphone-management-server.vercel.app/
## Server Github --> https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-backend-hasansharif819/tree/main


# This project is basically for a smartphone inventory management system where the Seller and Manager are two types of user roles.
* There are multiple types of collections available which are 1. product, 2. sales, 3. seller, and 4. pdf.
* Sellers are two types 1. seller and 2. manager 3. super-admin
* The manager can create sellers, managers, and products using an access token. seller can't create products or update or delete
* seller can create sales for a specific product. the manager can't sales

* Sellers and Managers can be logged in with
  username: manager
  password: 1234567

* Seller can register
* 
* Change Password 
* You can not use your previous two passwords and also the current password when you change your password
* You need to pass the access token using the header. Without an access token, you can not change your password
  Format for changing password
  {
    "currentPassword": "currentPassword",
    "newPassword": "newPassword"
}

## In this project I have used deep Mongoose for Backend

* Typescript as a language
* Express as a node framework
* Using Zod validation
* Using ESLint
* Using Prettier
* Global error handling
* Local error handling
* And so on

## In this project I have used deep React with Ant Design for Fronted

* Typescript as a language
* React
* Ant Design
* Toast
* Custom Input field
* Using Zod validation
* Using ESLint
* Using Prettier
* Global error handling
* Local error handling
* And so on


## Install this node/express app on your local machine, Just clone it and hit the command --> npm install
## You need to create .env file on your root folder where your package.json file is exists.
* In the .env file you have to provide 1. Port, 2. Database url, 3. Bcrypt salt round 4. JWT access secret and last is JWT access expires in
* Then you have to modify your index.ts file which is in app/config

## Install this frontend app on your local machine, Just clone it and hit the command --> npm install
## You need to create .env file on your root folder where your package.json file is exists.

* Then you have to modify your index.ts file which is in app/config

## Lets share your experience from this app. 

# Thank you
