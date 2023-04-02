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
        <div data-aos="zoom-in" data-aos-duration="800"  class=doc-card>
            <div class="top-cont">
                <div class="doc-profile">
                    <div class="doc-img">
                        <img alt="doc-pfp" src=${elem.image}/>
                    </div>
                    <div class="doc-desc">
                        <h2>${elem.doctorName}</h2>
                        <h4>Department: ${depObj[elem.departmentId]}</h4>
                        <p>Experience: ${elem.experience}</p>
                        <h5>Qualification: ${elem.qualifications}</h5>
                        <p>Rs.1,000 Consultation Fee</p>
                        <p style=${elem.status?"color:green":"color:red"}>${elem.status?"Available":"Currently Unavailable"}</p>
                    </div>
                </div>
                <div class="doc-book">
                    <div class="select-app">
                        <form>
                            <div>
                                <label>Select Date:</label>
                                <select required="true" name="date">
                                    <option value="1">04-Apr-23</option>
                                    <option value="2">05-Apr-23</option>
                                    <option value="3">06-Apr-23</option>
                                </select>
                                </div>
                                <div>
                                <label>Select Slot:</label>
                                <select required="true" name="slot">
                                    <option value="11-12">11AM to 12PM</option>
                                    <option value="2-3">2PM to 3PM</option>
                                    <option value="4-5">4PM to 5PM</option>
                                    <option value="6-7">6PM to 7PM</option>
                                </select>
                            </div>
                            <input type="submit" value="Book Appointment Now"/>
                            <p style="color:green; margin-top:0.3rem; text-align:center">No Booking Fee<p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join("");

    let forms=document.querySelectorAll(".select-app>form");
    for(let form of forms){
        form.addEventListener("submit",(e)=>{
            console.log(e);
            e.preventDefault();
            let img=e.path[3].children[0].children[0].children[0].currentSrc;
            let name=e.path[3].children[0].children[1].children[0].innerText;
            let dept=e.path[3].children[0].children[1].children[1].innerText;
            let exp=e.path[3].children[0].children[1].children[2].innerText;
            let qual=e.path[3].children[0].children[1].children[3].innerText;
            let formObj={
                "date":form.date.value,
                "slot":form.slot.value
            }
            let docObj={
                img,
                name,
                dept,
                exp,
                qual,
            };
            console.log(docObj);
            swal("", `Confirm Booking?`, "info").then(function() {
                localStorage.setItem("formObj",JSON.stringify(formObj));
                localStorage.setItem("docObj",JSON.stringify(docObj));
                window.location.href="/Frontend/Pages/patient_details.html";
            });
        })
    }
}
