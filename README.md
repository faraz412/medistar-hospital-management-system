
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
## To run this project

In the project directory run the follwing command:
it will install the npm packages .

### `npm install` 

Runs the project in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `npm run server `


## `npm packages used in the project`

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
     "redis": "^4.6.5",
     
## API Endpoints

   ###    User side
 - POST  http//:localhost:8080/user/signup
 - POST  http//:localhost:8080/user/signin
 
   ### Appointment Booking  
 - GET http//:localhost:8080/appointment/allApp/
 - POST http//:localhost:8080/appointment/create/:doctorId
 - DELETE http//:localhost:8080/appointment/cancel/appointmentId
 - PATCH http//:localhost:8080/appointment/reschedule/:appointmentId




![image](https://user-images.githubusercontent.com/109690823/229313097-98ac03fb-69b0-4833-849c-48c4a1b9d38d.png)














# cozy-passenger-4798

## (All Models)
# sigup model 

- id: PK, AI
- f_name
- L_name
- email
- password
- Mobile
- Gender

# department model
- dept_id
- name
- description
- imgURL

# Doctor
- img
- id
- Name
- email
- phone
- DOB
- Address
- DepartmentID

# Patient _Model

- patientID
- doctorID
- name 
- email
- phone
- city
- Address
- problem : Description

# Appoinment 

- appontmentid
- dateTime
- patientName
- payment
- doctorID
- doctorname
- patientName
- patientID
- problem 
