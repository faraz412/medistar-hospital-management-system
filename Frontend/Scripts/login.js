    let form =document.querySelector("form");
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let obj={
        pass:form.exampleFormControlInput2.value,
        email:form.exampleFormControlInput1.value
    }
    try {
        let res=await fetch("https://medistarbackend-services.up.railway.app/user/signin",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        let data=await res.json();
        console.log(data);
        localStorage.setItem("token",data.token);
       //  alert("Login Successful");
        // window.location.href="notes.html";
      } catch (error) {
        console.log(error);
      }
})
