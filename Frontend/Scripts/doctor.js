let docsCont=document.getElementById("doctors-cont");
let depObj={
    1:"Neurology",
    2:"Dermatology",
    3:"Dental",
    4:"Ayurveda",
    5:"Gastroenterology",
    6:"Gynaecology",
    7:"ENT",
    8:"General Physician",
    9:"Orthopedic",
    10:"Cardiology"
}

window.addEventListener("load",(e)=>{
    getdata();
})

async function getdata() {
    try {
        const res = await fetch("http://localhost:8080/doctor/alldoctor");
        let data = await res.json();
        data = data.doctor;
       // console.log(data);
        renderdata(data);
    } catch (error) {
        console.log(error.message);
    }
}

function renderdata(arr) {
    docsCont.innerHTML="";
    docsCont.innerHTML=arr.map((elem)=>{
        return `
        <div class=doc-card>
            <div class="top-cont">
                <div class="doc-profile">
                    <div class="doc-img">
                        <img alt="doc-pfp" src=${elem.image}/>
                    </div>
                    <div class="doc-desc">
                        <h2>${elem.doctorName}</h2>
                        <h4>Department: ${depObj[elem.departmentId]}</h4>
                        <p>${elem.experience}</p>
                        <h5>Qualification: ${elem.qualifications}</h5>
                        <p>Rs.1,000 Consultation Fee</p>
                        <p style=${elem.status?"color:green":"color:red"}>${elem.status?"Available":"Currently Unavailable"}</p>
                    </div>
                </div>
                <div class="doc-book">
                    <button>Book Appointment Now <br> <span>No Booking Fee</span></button>
                </div>
            </div>
            <div class="bottom-cont div-hide">
                <table>
                    <thead>
                        <tr>
                            <th>Tomorrow: 04-Apr-23</th>
                            <th>05-Apr-23</th>
                            <th>06-Apr-23</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>11 AM to 12 PM</td>
                            <td>11 AM to 12 PM</td>
                            <td>11 AM to 12 PM</td>
                        </tr>
                        <tr>
                            <td>2 PM to 3PM</td>
                            <td>2 PM to 3PM</td>
                            <td>2 PM to 3PM</td>
                        </tr>
                        <tr>
                            <td>4PM to 5PM</td>
                            <td>4PM to 5PM</td>
                            <td>4PM to 5PM</td>
                        </tr>
                        <tr>
                            <td>6PM to 7PM</td>
                            <td>6PM to 7PM</td>
                            <td>6PM to 7PM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `
    }).join("");

    let buttons=document.querySelectorAll(".doc-book>button");
    for(let button of buttons){
        button.addEventListener("click",(e)=>{
            console.log( e.path[4].children[1].classList);
            e.path[4].children[1].classList.remove("div-hide");
        })
    }
}
