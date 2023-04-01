
document.querySelector("#navbar").innerHTML = `
<div id="nav-cont">
    <div data-aos="zoom-out" data-aos-duration="1000" id="nav-logo">
        <div id="nav-img">
            <img alt="Logo" src="/Frontend/Files/MEDSTAR-no-bg.png"/>
        </div>
    </div>
    <div data-aos="zoom-out" data-aos-duration="1000" id="nav-menu">
        <li id="book-app">Book an appointment</li>
        <li id="find-doc">Find Doctors</li>
        <li>Departments</li>
        <li>Security & Help</li>
    </div>
    <div data-aos="zoom-out" data-aos-duration="1000" id="nav-user-details">
        <button id="nav-login">Login</button>
        <button id="nav-reg">Signup</button>
    </div>
</div>
`