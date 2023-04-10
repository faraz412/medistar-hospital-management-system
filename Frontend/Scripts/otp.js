import baseURL from './baseURL.js';
const inputs = document.querySelectorAll("input"),
button = document.querySelector("button");


inputs.forEach((input, index1) => {
input.addEventListener("keyup", (e) => {
  const currentInput = input,
    nextInput = input.nextElementSibling,
    prevInput = input.previousElementSibling;
  if (currentInput.value.length > 1) {
    currentInput.value = "";
    return;
  }
  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
    nextInput.removeAttribute("disabled");
    nextInput.focus();
  }

  if (e.key === "Backspace") {
   
    inputs.forEach((input, index2) => {
      if (index1 <= index2 && prevInput) {
        input.setAttribute("disabled", true);
        input.value = "";
        prevInput.focus();
      }
    });
  }
  if (!inputs[3].disabled && inputs[3].value !== "") {
    button.classList.add("active");
    return;
  }
  button.classList.remove("active");
});
});
window.addEventListener("load", () => inputs[0].focus());

const otpbutton = document.querySelector("#otpbutton");
otpbutton.addEventListener("click",fun);
async function fun(event) {
  try {
    event.preventDefault();
   
    let first=document.querySelector("#first").value;
let second=document.querySelector("#second").value;
let third=document.querySelector("#third").value;
let fourth=document.querySelector("#fourth").value;
    let bag=""
    bag+=first+second+third+fourth
    let jhola=(bag)
    // console.log(jhola)

    let new_data=localStorage.getItem("userDetails")
    let otp=localStorage.getItem("otp")
    console.log(otp)
   
    let p=JSON.parse(new_data);
    console.log(p);
    // let userObj = {
    
    //     email:p.email,
    //    password:p.password,
    //    otp:jhola
    // };
    let register_request = await fetch(baseURL+"user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(p)
    })
    .then(res=>res.json())
    .then(data=>  {
      // console.log(data)
      if(bag==otp){
        swal("", "Registered successfull", "success").then(function() {
          window.location.href = "./login.html";
          localStorage.clear();
      });
      }
      else if(bag!=otp){
        swal("", "Wrong OTP", "warning").then(function() {
          window.location.href = "./otp.html";
      });
      }else{
        // window.location.href="./signup.html"
      }   
})
    .catch(err=>console.log(err))
  } catch (error) {
    alert("Something went wrong. Please try again later.");
    console.log(error);
  }
}