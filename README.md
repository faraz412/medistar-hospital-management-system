
![image](https://user-images.githubusercontent.com/109690823/229355347-8d6e3d56-3c98-4abc-a973-225fd70bf3a2.png)

# Medistar Hospital

Medistar Hospital Management System is a web application built using Node.js and MongoDB. The system is designed to automate the management of hospitals, including the handling of patient records, medical billing, appointment scheduling, and other administrative tasks.

The system allows users to create, read, update, and delete records of patients, doctors, and medical procedures. Patients can schedule appointments with doctors, and doctors can view their schedule and patient records. The system also includes a billing module that generates bills for medical procedures and tracks payments.


## Tech Stack 

**Client:** HTML, CSS, Javascript , AOS and Bootsrap

**Server:** Node.js, Express.js, MongoDB, Redis

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

## Database Used 
  `MongoDB`
  
## To run this project

In the project directory run the follwing command:
it will install the npm packages .

### `npm install` 

Runs the project in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `npm run server `


## NPM packages used in the project

    {"bcrypt": "^5.1.0",
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
     "redis": "^4.6.5"}
     
## API Endpoints

   ###    User side
 - POST  http//:localhost:8080/user/signup
 - POST  http//:localhost:8080/user/signin
 
   ### Appointment Booking  
 - GET http//:localhost:8080/appointment/allApp/
 - POST http//:localhost:8080/appointment/create/:doctorId
 - DELETE http//:localhost:8080/appointment/cancel/appointmentId
 - PATCH http//:localhost:8080/appointment/reschedule/:appointmentId


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
    "paymentStatus":false}
    
![image](https://user-images.githubusercontent.com/109690823/229313097-98ac03fb-69b0-4833-849c-48c4a1b9d38d.png)
![image](https://user-images.githubusercontent.com/109690823/229355448-be996d1e-8545-44e1-b1ba-dc3d62d0ac9a.png)
![image](https://user-images.githubusercontent.com/109690823/229355506-3ae1da89-9434-4400-9ab2-b8b9f86e67aa.png)
![image](https://user-images.githubusercontent.com/109690823/229355596-5bfd0bf9-9147-47fb-bb42-b6e04ac4208b.png)



