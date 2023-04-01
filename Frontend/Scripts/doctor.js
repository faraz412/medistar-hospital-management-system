async function getdata() {
    try {
        console.log("callled");
        const res = await fetch("http://localhost:8080/doctor/alldoctor");
        let data = await res.json();
        data = data.doctor;
        console.log(data);
        renderdata(data);
    } catch (error) {
        console.log(error.message);
    }
}
getdata();

function renderdata(data) {
    let container = document.getElementById("cont");

    let arr = data.map((ele) => {
        return `

        <div class=" mainbox">
        <div class="doc-image-info">
        <div class="image-sec">
            <img src="${ele.image}"
                alt="${ele.doctorName}">
            <span class="badge">
                <img src="https://www.practostatic.com/web-assets/images/prime_badge.8f4ca26c7f36.svg">
            </span>
            <button class="u-t-capitalize u-bold view-profile">
                View Profile
            </button>
        </div>

        <div class="info">
        <div>
            <h2> ${ele.doctorName}</h2>
        </div>
        <div>
            <h6> ${ele.qualifications}</h6>
        </div>
        <div>
            <h5>${ele.experience}</h5>
        </div>
        <div>
            <p>Contact: ${ele.phoneNo}</p>
        </div>
        <div>
        <p>Medicare Hosital, ${ele.city}</p>
        </div>
    </div>
</div>

<div class="book-apt-sec">

    <div class='avail'>
        Available Today
    </div>

        <button class="btn">
        Book Now
    </button>

    <div id="slot-cont" class="div-hide">
        <div class="slot-container" id='good'>
            <h2 class="slot-heading">Available Slots</h2>
            <ul class="slot-list">
            <li>Timing</li>
            <li>2 PM </li>
            <li>3 PM </li>
            <li>4 PM </li>
            </ul>
        </div>

    </div>

    </div>
        </div>
        `;
    });

    console.log(arr.join(""));
    container.innerHTML = arr.join("");

     const buttons = document.getElementsByClassName('btn')
    const slot = document.getElementById('slot-cont')
    
    
    console.log(slot);
    for(let button of buttons){
        button.addEventListener('click', ()=>{
            slot.classList.add('active')
            console.log(slot, 'i am slot');
            slot.classList.remove('div-hide')
        //    console.log('hi');
        })
    }

}
