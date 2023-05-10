import baseURL from './baseURL.js';
let form =document.querySelector("form");
    form.addEventListener("submit",async (e)=>{
        e.preventDefault();
        let obj={
            first_name:form.exampleFormControlInput1.value,
            last_name:form.exampleFormControlInput2.value,
            email:form.exampleFormControlInput3.value,
            mobile:form.exampleFormControlInput4.value,
            password:form.exampleFormControlInput5.value,
        }
      try {

        let res=await fetch(baseURL+"user/emailVerify",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        let data=await res.json();
        //console.log(data);

        if(data.otp){
            localStorage.setItem("userDetails",JSON.stringify(obj));
            localStorage.setItem("otp",data.otp);
            swal("", "OTP has been sent to your mail", "info").then(function() {
              window.location.href="./otp.html";
            });
        }else{
          swal("", `${data.msg}`, "info").then(function() {
            window.location.href="./login.html";
          });          
        }
       
       // alert("Successfully registered");
      } catch (error) {
        console.log(error);
      }
    })