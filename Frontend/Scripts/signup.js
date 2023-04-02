import baseURL from "./baseURL";

let form =document.querySelector("form");
    form.addEventListener("submit",async (e)=>{
        e.preventDefault();
        let obj={
            first_name:form.exampleFormControlInput1.value,
            last_name:form.exampleFormControlInput2.value,
            mobile:form.exampleFormControlInput4.value,
            password:form.exampleFormControlInput5.value,
            email:form.exampleFormControlInput3.value
        }
      try {
        let res=await fetch(baseURL+"user/signup",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        let data=await res.json();
        console.log(data);
        alert("Successfully registered");
      } catch (error) {
        console.log(error);
      }
    })