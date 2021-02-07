# User Organization
Generate User Organization Api

## install
    npm packages


### code struture 
    server.js server file
    app is our application file
    .env where all secret key 
    logs folder where i am creating files on date basis and storing logs for Voucher and updating 
    utils folder where utility function are written like authentication, applogger(for log), response, erro handling, response handling
    config folder where database file are there config i am storing(persistent data)

### Database 
    Mongoose client which  is running locally on 27017 by defalut

### server 
    is running on port by default 3040,  bt i am reading from .env file you can also change in .env file


### Two component 
    
#### user
    where user signup api
        POST :   /signUp for signup whose is going to (open api)
        POST :   /login  to signin user form (open api)
        PUT :   /edit to edit user (close api) // i have not added authorization in these api
        DELETE: /delete to delete any user (close api) // i have not added authorization in these api

        GET :   /userList to fetch userlist (close api) // i have not added authorization in these api

#### Jwt for authentication

#### Organization
    
        GET : /Organization : Add Organization API (open api)
        POST : /Organization : Get Organization API (open api)


### postman Collection 
    link: https://www.getpostman.com/collections/bcac7832eac8d48bb490





