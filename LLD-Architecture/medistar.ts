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




 





// departmentId: {
//     type: Number,
//     unique: true,
//     required: true,
//   },
//   deptName: { type: String, required: true },
//   about: { type: String, required: true },
//   image: { type: String, required: true },


class Department {
    id: number
    name: string
    description: string
    constructor(id: number, name: string, description: string) {
        this.id = id
        this.name = name
        this.description = description
    }
}