import baseURL from './baseURL.js';
    let form =document.querySelector("form");
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let obj={
        payload:form.exampleFormControlInput1.value,
        password:form.exampleFormControlInput2.value
    }
    try {
        let res=await fetch(baseURL+"user/signin",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        let data=await res.json();
        console.log(data);
        if(!data || data.mag || data.msg=="Error in Login" || data.msg=="User not Found"){
            alert("Wrong Credentials");
        }else{
            localStorage.setItem("token",data.token);
            localStorage.setItem("userName",data.name);
            swal("", "Login Successful", "success").then(function() {
                window.location.href="./book.appointment.html";
            });
        }
      } catch (error) {
        console.log(error);
      }
})