import baseURL from "./baseURL.js"

let login_btn = document.querySelector(".center form");
login_btn.addEventListener("submit", (event) => {
	event.preventDefault();
	let email = document.querySelector("#user").value;
	let password = document.querySelector("#pass").value;
	let obj={
		email,
		password
	}
	// console.log(obj);
	auth(obj)
});

async function auth(obj){
    console.log(obj);
    try {
        // let res=await fetch("https://pear-z5ta.onrender.com/api/admin/login",{
        let res=await fetch(baseURL+"admin/signin",{
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        if(res.ok){
            let data=await res.json();
            if(data.message=="Login Successful"){
                localStorage.setItem("admin","admin");
                swal("", "Welcome Admin!", "success").then(function() {
                    window.location.href = "./dashboard.html";
                });
            }else{
                swal("","Wrong Credentials!","warning");
            }
        }else{
            swal("","Wrong Credentials!","warning");
        }
    } catch (error) {
        swal("",error,"warning");
    }	
}