<div align="center"  width="55" height="55">
  <img src="https://github.com/faraz412/cozy-passenger-4798/blob/main/Frontend/Files/MEDSTAR.png?raw=true" alt="html" width="120" height="120"/>
</div>

Medistar Hospital Management System is a web application built using Nodejs,Expressjs,Mongoose,Redis and MongoDB. The system is designed to automate the management of hospital appointments, including the handling of patient records, medical billing, appointment scheduling, and other administrative tasks.

The system allows users to create, read, update, and delete records of patients, doctors, and medical procedures. Patients can schedule appointments with doctors, and doctors can view their schedule and patient records. The system also includes a billing module that generates bills for medical procedures and tracks payments.

## Tech Stacks
<p align = "center">
<img src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/HTML.png" alt="html" width="55" height="55"/>
<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" width="50" height="55"/>
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="js" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/TypeScript.svg" alt="ts" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/nodejs.png" alt="nodejs" width="50" height="50"/>
<img src="https://res.cloudinary.com/kc-cloud/images/f_auto,q_auto/v1651772163/expressjslogo/expressjslogo.webp?_i=AA" alt="express" width="50" height="50"/>
 <img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/mongodb-leaf.png" alt="mongo" width="50" height="50"/> 
<img src="https://user-images.githubusercontent.com/25181517/182884894-d3fa6ee0-f2b4-4960-9961-64740f533f2a.png" alt="redis" width="50" height="50"/>
<img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" width="50" height="50"/>
</p>
<hr>

## Features 
-  Authentication
-  APIValidation
-  Responsive
-  Cross Platform
-  Signup/signin/Logout
-  Appointment Booking 
-  Appointment Cancelation
-  Admin can perform all crud operations

## Run Locally
### Clone this Project

```
https://github.com/faraz412/cozy-passenger-4798.git
```

### Install npm Packages

```javascript
npm i --global
```

### Go to Backend Folder
```javascript
cd backend
```

### Run Server
```javascript
npx nodemon index.js
```
### Runs the project in the development mode

[http://localhost:8080](http://localhost:8080)


### Environment Variables Required
`mongoURL`

`key`

`PORT`

`Redis Cloud Password + Host + Port`

`Nodemailer Password`



## Frontend Part
- Home page
- Signup/Login
- Logout
- Book appointment
- Make a payment
- Feedback

## Backend Part
- Authentication using JWT
- Storing password by hasing it
- Mongoose - connecting the database
- Server side -> Node.js and Express 
- Nodemailer - sending Emails
- Blacklisting of tokens

## NPM packages used in the project

     "bcrypt": "^5.1.0",
     "cors": "^2.8.5",
     "dotenv": "^16.0.3",
     "express": "^4.18.2",
     "jsonwebtoken": "^9.0.0",
     "mongoose": "^7.0.3",
     "nodemailer": "^6.9.1",
     "nodemon": "^2.0.22",
     "otp-generator": "^4.0.1",
     "redis": "^4.6.5",
     "bcrypt": "^5.1.0",
     "redis": "^4.6.5"
     
### API Endpoints

```javascript
POST  -http//:localhost:8080/user/signup
```

   ###    User side
 - POST  http//:localhost:8080/user/signup
 - POST  http//:localhost:8080/user/signin
 
  ### Appointment Booking  
 - GET http//:localhost:8080/appointment/allApp/
 - POST http//:localhost:8080/appointment/create/:doctorId
 - DELETE http//:localhost:8080/appointment/cancel/appointmentId
 - PATCH http//:localhost:8080/appointment/reschedule/:appointmentId

<!-- 
 ### 
`USERS DATA...`

    {"first_name":"harsh thakur",
    "last_name":"thakur",
    "email":"harsh@gmail.com",
    "mobile":"909999345",
    "password":"123456"  }

 ### 
`DOCTORS DATA...`

    {"doctorName":"Abhishek Jaiswal",
    "email":"abhisek@gmail.com",
    "qualifications":"MBBS from AIMS Delhi",
    "experience":"14 years of experience",
    "phoneNo":"7011144555",
    "city":"Mumbai",
    "departmentId":1,
    "status":true,
    "isAvailable":true;
    "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJO1Bmu2stkBmmOJXmyHN5G7UHmeA4xr5z0whR9JZF&s" }

 ### 
`APPOINTMENT DATA...`

    {"patientId":"64256f28b1fc4d36b5a12be7",
    "doctorId":"6425319914291e303a3cf2c4",
    "ageOfPatient":40,
    "gender":"male",
    "address":"Mumbai woribali",
    "problemDescription":"having some problem related to neourology ",
    "appointmentDate":"30-03-2023",
    "createdAt":,
    "updatedAt":,
    "paymentStatus":false} -->
     
 ## Project Highlights  
 
![image](https://user-images.githubusercontent.com/109690823/229313097-98ac03fb-69b0-4833-849c-48c4a1b9d38d.png)
![image](https://user-images.githubusercontent.com/109690823/229355448-be996d1e-8545-44e1-b1ba-dc3d62d0ac9a.png)
![image](https://user-images.githubusercontent.com/109690823/229355506-3ae1da89-9434-4400-9ab2-b8b9f86e67aa.png)
![image](https://user-images.githubusercontent.com/109690823/229355596-5bfd0bf9-9147-47fb-bb42-b6e04ac4208b.png)

## Demo
```

```

## Authors

- [@faraz412](https://github.com/faraz412)
- [@deepakChourasiya-aj](https://github.com/deepakChourasiya-aj)
- [@abhishek1494k](https://github.com/abhishek1494k)
- [@Atul3007](https://github.com/Atul3007)
- [@prernadave](https://github.com/prernadave)



