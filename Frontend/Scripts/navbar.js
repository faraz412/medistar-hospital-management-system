
document.querySelector("#navbar").innerHTML = `
<div id="nav-cont">
    <div data-aos="zoom-out" data-aos-duration="1000" id="nav-logo">
        <div id="nav-img">
            <img alt="Logo" src="/Frontend/Files/MEDSTAR-no-bg.png"/>
        </div>
    </div>
    <div data-aos="zoom-out" data-aos-duration="1000" id="nav-menu">
        <li><a href="./Pages/find-doctors.html">Book an appointment</a></li>
        <li><a>Find Doctors</a></li>
        <li><a href="#nav-dept">Departments</a></li>
        <li><a>Security & Help</a></li>
    </div>
    <div data-aos="zoom-out" data-aos-duration="1000" id="nav-user-details">
        <button>Login</button>
        <button>Signup</button>
    </div>
</div>
`

const logoBtn = document.getElementById("nav-logo");
logoBtn.addEventListener("click", (e) => {
    window.location.href = "index.html";
})