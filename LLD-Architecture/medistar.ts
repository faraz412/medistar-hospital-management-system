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
// - APRIL_04
// - APRIL_05
// - APRIL_06

// slots:Slots[]|null
// appointments: Appoinment[] | null
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

// appointments: Appoinment[]|null
// feedbacks: Feedback[]

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

// Payment Part
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

class Feedback {
    id: number
    patientId: number
    message: string
    time: string
    constructor(id: number,
        patientId: number,
        message: string,
        time: string) {
        this.id = id
        this.patientId = patientId
        this.message = message
        this.time = time
    }
}


// Medistar Hospital Management System Components
// - Departments
// - Doctors
// - Patients
// - Payments
// - Feedbacks

class MadistarHospital {
    departments: Department[]
    doctors: Doctor[]
    patients: Patient[]
    payments: Payments[]
    feedbacks: Feedback[]
    constructor(departments: Department[] = [],
        doctors: Doctor[] = [],
        patients: Patient[] = [],
        payments: Payments[] = [],
        feedbacks: Feedback[] = []) {
        this.departments = departments
        this.doctors = doctors
        this.patients = patients
        this.payments = payments
        this.feedbacks = feedbacks
    }
}
