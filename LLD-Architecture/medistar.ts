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
    departmentId: number
    deptName: string
    about:string
    image: string
    constructor(departmentId: number, deptName: string, about: string,image: string) {
        this.departmentId=departmentId,
        this.deptName=deptName,
        this.about=about,
        this.image=image
    }
}