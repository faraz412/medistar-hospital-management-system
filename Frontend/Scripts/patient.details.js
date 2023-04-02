let formObj=JSON.parse(localStorage.getItem("formObj"));
let docObj=JSON.parse(localStorage.getItem("docObj"));
let docContainer=document.getElementById("doctors-container");

let dateObj={
    1: "04-Apr-23",
    2: "05-Apr-23",
    3: "06-Apr-23",
    "11-12": "11AM to 12PM",
    "2-3": "2PM to 3PM",
    "4-5": "4PM to 5PM",
    "6-7": "6PM to 7PM"
}

renderdata(formObj,docObj)

function renderdata(formObj,docObj) {
    console.log(formObj.slot)
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
                    <img alt="doc-pfp" src=${docObj.img}/>
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

    // let forms=document.querySelectorAll(".select-app>form");
    // for(let form of forms){
    //     form.addEventListener("submit",(e)=>{
    //         e.preventDefault();
    //         // console.log(e);
    //         let obj={
    //             "date":form.date.value,
    //             "slot":form.slot.value
    //         }
    //         swal("", `Confirm Booking?`, "info").then(function() {
    //             localStorage.setItem("formObj",obj);
    //             window.location.href="/Frontend/Pages/patient_details.html";
    //         });
    //     })
    // }