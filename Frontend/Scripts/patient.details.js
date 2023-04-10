import baseURL from "./baseURL.js";

let formObj=JSON.parse(localStorage.getItem("formObj"));
let docObj=JSON.parse(localStorage.getItem("docObj"));
let docContainer=document.getElementById("doctors-container");



let dateObj={
    "APRIL_04": "11-Apr-23",
    "APRIL_05": "12-Apr-23",
    "APRIL_06": "13-Apr-23",
    "2-3": "2PM to 3PM",
    "4-5": "4PM to 5PM",
    "7-8": "7PM to 8PM"
}

renderdata(formObj,docObj)

function renderdata(formObj,docObj) {
    // console.log(formObj.slot)
    docContainer.innerHTML= `
    <div data-aos="fade-right" data-aos-duration="800" class=doc-card>
        <h3 style="text-align:center">Appontment Details</h3>
        <div class="top-cont">
            <div class="doc-date"> 
                <h6>Date: ${dateObj[formObj.date]}</h6>
                <h6>Date: ${dateObj[formObj.slot]}</h6>
            </div>
            <div class="doc-profile">
                <div class="doc-img">
                    <img alt="doc-pfp" src=${docObj.img} />
                </div>
                <div class="doc-desc">
                    <h4>${docObj.name}</h4>
                    <h6>${docObj.dept}</h6>
                    <p>${docObj.exp}</p>
                    <h6>${docObj.qual}</h6>
                    <p>Rs.1,000 Consultation Fee</p>
                </div>
            </div>
        </div>
    </div>
    `
};

let patientForm=document.getElementById("PatientForm");

patientForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    console.log(docObj);
    let obj={
        patientFirstName:patientForm.name.value,
        docFirstName:docObj.name,
        ageOfPatient:patientForm.age.value,
        gender:patientForm.gender.value,
        address:patientForm.address.value,
        problemDescription:patientForm.problem.value,
        appointmentDate:dateObj[formObj.date],
        slotTime:formObj.slot,
        date:formObj.date
    };
    console.log(localStorage.getItem("token"));

    try{
        let res=await fetch(baseURL+`appointment/checkSlot/${docObj.docID}`,{
            method:"POST",
            headers:{
                "Content-type": "application/json",
                "Authorization":`${localStorage.getItem("token")}`
			},
            body: JSON.stringify(obj)
        });
        if(res.ok){
            let data=await res.json();
            if(data){
                let response=await fetch(baseURL+`appointment/create/${docObj.docID}`,{
                    method:"POST",
                    headers:{
                        "Content-type": "application/json",
                        "Authorization":`${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(obj)
                });
                if(response.ok){
                    let result=await response.json();
                    console.log(result);
                    if(result.msg){
                        swal("",`${result.msg}`,"info");   
                    }
                    if(result.message){
                        swal("",`${result.message}`,"info").then(function(){
                            localStorage.removeItem("formObj");
                            localStorage.removeItem("docObj");
                            window.location.href="./index.html"; 
                        });
                    }
                }else{
                    swal("",`Selected slot not available`,"warning"); 
                }
            }else{
                swal("",`Selected slot not available`,"warning"); 
            }
        }
    }catch(err){
        console.log(err);
    }
})


