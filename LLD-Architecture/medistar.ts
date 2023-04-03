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
  email: string;
  experience: number;
  phoneNo: string;
  city: string;
  departmentId: number;
  status: boolean;
  image: string;
  isAvailable: boolean;
  slots: [] | null;
  appointments: [] | null;
  constructor(
    id: number,
    doctorName: string,
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

  viewAllAppointments() {
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
  appointments: [];
  feedbacks: [];

  constructor(
    id: Number,
    first_name: string,
    last_name: string,
    email: string,
    mobile: string,
    password: string,
    appointments: [],
    feedbacks: []
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
    this.appointments = appointments;
    this.feedbacks = feedbacks;
  }
}
