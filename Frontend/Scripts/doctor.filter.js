import baseURL from "./baseURL.js";
let selectTag=document.getElementById("select-dept");

selectTag.addEventListener("change", async(e)=>{
    localStorage.setItem("deptID",selectTag.value);
    window.location.href="./doctors.page.html";
})