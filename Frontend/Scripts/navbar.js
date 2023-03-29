
document.querySelector("#navbar").innerHTML=`
<div id="nav-cont">
    <div id="nav-logo">
        <div id="nav-img">
            <img alt="Logo" src="./Files/Medistar-no-bg.png"/>
        </div>
    </div>
    <div id="nav-menu">
        <li>Book an appointment</li>
        <li>Find Doctors</li>
        <li>Departments</li>
        <li>Security & Help</li>
    </div>
    <div id="nav-user-details">
        <button>Login</button>
        <button>Signup</button>
    </div>
</div>
`

const logoBtn=document.getElementById("nav-logo");
logoBtn.addEventListener("click",(e)=>{
    window.location.href="index.html";
})