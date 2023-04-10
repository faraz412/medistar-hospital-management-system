// HLD ARCHITECTURE OF MEDISTAR HOSPITAL
// http://127.0.0.1:5500/Frontend/Pages/Admin/admin.login.html
// hostpital-->> Department --> doctors-->>specialized --cardialogy-->>patient

// Department
//    - Different departments
//  - Neorology dept
//  - Cardiology dept

// - Neorology dept
//  - Available Doctors in the Department
//   - Doctor Deepak
//   - Doctor Abhishek
//   - Doctor Faraz
//   - Doctor Atul
//   - Doctor Prerna

// Department - entities
// - departmentId
// - deptName
// - about
// - image

class Department {
    id: number;
    deptName: string;
    about: string;
    image: string;
    constructor(id: number, deptName: string, about: string, image: string) {
        (this.id = id),
            (this.deptName = deptName),
            (this.about = about),
            (this.image = image);
    }
}

// Doctor Entities
// - id
// - doctorName
// - email
// - experience
// - phoneNo
// - city
// - departmentId
// - status
// - image
// - isAvailable

class Doctor {
    id: number;
    doctorName: string;
    qualifications: string;
    email: string;
    experience: number;
    phoneNo: string;
    city: string;
    departmentId: number;
    status: boolean;
    image: string;
    isAvailable: boolean;
    slots: [] | null;
    appointments: Appoinment[] | null;
    constructor(
        id: number,
        doctorName: string,
        qualifications: string,
        email: string,
        experience: number,
        phoneNo: string,
        city: string,
        departmentId: number,
        status: boolean,
        image: string,
        isAvailable: boolean
    ) {
        this.id = id;
        this.doctorName = doctorName;
        this.qualifications = qualifications;
        this.email = email;
        this.experience = experience;
        this.phoneNo = phoneNo;
        this.city = city;
        this.departmentId = departmentId;
        this.status = status;
        this.image = image;
        this.isAvailable = isAvailable;
        this.slots = [];
        this.appointments = [];
    }

    seeAllAppointments() {
        return this.appointments;
    }
}

// Patient
// - id
// - first_name
// - last_name
// - email
// - mobile
// - password

class Patient {
    id: Number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    password: string;
    appointments: Appoinment[] | null;
    feedbacks: Feedback[] | null;

    constructor(
        id: Number,
        first_name: string,
        last_name: string,
        email: string,
        mobile: string,
        password: string
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.appointments = [];
        this.feedbacks = [];
    }
}

// Appoinment
// - id
// - patientId
// - doctorId
// - patientFirstName
// - docFirstName
// - ageOfPatient
// - gender
// - address
// - Description
// - appointmentDate
// - status
// - paymentStatus

class Appoinment {
    id: Number;
    patientId: Number;
    doctorId: Number;
    patientFirstName: String;
    docFirstName: String;
    ageOfPatient: Number;
    gender: String;
    address: String;
    Description: String;
    appointmentDate: String;
    status: Boolean;
    paymentStatus: Boolean;

    constructor(
        id: Number,
        patientId: Number,
        doctorId: Number,
        patientFirstName: String,
        docFirstName: String,
        ageOfPatient: Number,
        gender: String,
        address: String,
        Description: String,
        appointmentDate: String,
        status: Boolean,
        paymentStatus: Boolean
    ) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.patientFirstName = patientFirstName;
        this.docFirstName = docFirstName;
        this.ageOfPatient = ageOfPatient;
        this.gender = gender;
        this.address = address;
        this.Description = Description;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.paymentStatus = paymentStatus;
    }
}

// Payment class
// - id
// - patientId
// - amount
// - date
// - paymentMethod

class Payments {
    id: number;
    patientId: number;
    amount: number;
    date: string;
    paymentMethod: string;
    constructor(
        id: number,
        patientId: number,
        amount: number,
        date: string,
        paymentMethod: string
    ) {
        this.id = id;
        this.patientId = patientId;
        this.amount = amount;
        this.date = date;
        this.paymentMethod = paymentMethod;
    }
}

// Feedback
//  -id
//  -patientId
//  -message
//  -time

class Feedback {
    id: number;
    patientId: number;
    message: string;
    time: string;
    constructor(id: number, patientId: number, message: string, time: string) {
        this.id = id;
        this.patientId = patientId;
        this.message = message;
        this.time = time;
    }
}

// Medistar Hospital Management System Components
// - Departments
// - Doctors
// - Patients
// - Payments
// - Feedbacks

class MadistarHospital {
    departments: Department[];
    doctors: Doctor[];
    patients: Patient[];
    payments: Payments[];
    feedbacks: Feedback[];
    constructor(
        departments: Department[] = [],
        doctors: Doctor[] = [],
        patients: Patient[] = [],
        payments: Payments[] = [],
        feedbacks: Feedback[] = []
    ) {
        this.departments = departments;
        this.doctors = doctors;
        this.patients = patients;
        this.payments = payments;
        this.feedbacks = feedbacks;
    }
    createNewDepartment(deptName: string, about: string, image: string) {
        let id = this.departments.length + 1;
        const department = new Department(id, deptName, about, image);
        this.departments.push(department);
        return department;
    }
    addDoctor(
        doctorName: string,
        qualifications: string,
        email: string,
        experience: number,
        phoneNo: string,
        city: string,
        departmentId: number,
        status: boolean,
        image: string,
        isAvailable: boolean
    ) {
        const id = this.doctors.length + 1;
        const newDoctor = new Doctor(
            id,
            doctorName,
            qualifications,
            email,
            experience,
            phoneNo,
            city,
            departmentId,
            status,
            image,
            isAvailable
        );
        this.doctors.push(newDoctor);
        return newDoctor;
    }
    registerPatient(
        first_name: string,
        last_name: string,
        email: string,
        mobile: string,
        password: string
    ) {
        const id = this.patients.length + 1;
        const newPatient = new Patient(
            id,
            first_name,
            last_name,
            email,
            mobile,
            password
        );
        this.patients.push(newPatient);
        return newPatient;
    }
    makePayment(
        patientId: number,
        amount: number,
        date: string,
        paymentMethod: string
    ) {
        const id = this.payments.length + 1;
        const payment = new Payments(id, patientId, amount, date, paymentMethod);
        this.payments.push(payment);
        return payment;
    }
    giveFeedback(patientId: number, message: string, time: string) {
        const id = this.feedbacks.length + 1;
        const patientsfeedback = new Feedback(id, patientId, message, time);
        this.feedbacks.push(patientsfeedback);
        return patientsfeedback;
    }
}
const Medistar = new MadistarHospital();
const createDept = Medistar.createNewDepartment(
    "Cardiology",
    "Cardiology departments specialize in diagnosing and treating heart diseases, including cardiovascular conditions like coronary artery disease, heart failure, and arrhythmias.",
    "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_2500,h_958/https://www.punhlainghospitals.com/wp-content/uploads/2020/12/Cardiology.jpg"
);
const newDoctor = Medistar.addDoctor(
    "Deepak chourasiya",
    "MBBS from AIIMS from Delhi",
    "deepak1812002@gmail.com",
    9,
    "7999764766",
    "Mumbai",
    1,
    true,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgut-XrUTj4kq8azPG0BcV3bwfaDrOvAEicg&usqp=CAU",
    true
);
const registerPatient = Medistar.registerPatient(
    "John",
    "Doe",
    "john@gmail.com",
    "7844401254",
    "@john"
);

const makePayment = Medistar.makePayment(1, 2000, "03-04-2023", "Card");
const giveFeedback = Medistar.giveFeedback(
    1,
    "It was great experience with medistar hospital,one thing could be improve response time from the deoctors side",
    "4 PM"
);

console.log(Medistar);
console.log(registerPatient);
console.log(createDept);
console.log(newDoctor);
console.log(makePayment);
console.log(giveFeedback);
