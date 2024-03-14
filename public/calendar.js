const li1 = document.getElementById("li1");
const li2 = document.getElementById("li2");
const li3 = document.getElementById("li3");
const line = document.getElementById("mini_container");
function showCalendar(){
    document.getElementById("calendar").classList.remove("hidden");
    document.getElementById("calendar_date").classList.remove("hidden");
    document.getElementById("mini_container").style.border.color="white";
    line.style.border =  "1px solid black";
    document.getElementById("name").classList.remove("hidden");
    document.getElementById("regist").classList.add("hidden");
    document.getElementById("change").classList.add("hidden");

    li1.style.fontSize = "18px";
    li2.style.fontSize = "15px";
    li3.style.fontSize = "15px";
    li1.style.color = "red";
    li2.style.color = "white";
    li3.style.color = "white";
}
function showRegist(){
    
    document.getElementById("regist").classList.remove("hidden");
    document.getElementById("calendar_date").classList.add("hidden");
    document.getElementById("mini_container").classList.add("hidden");

    document.getElementById("name").classList.add("hidden");
    document.getElementById("calendar").classList.add("hidden");
    document.getElementById("change").classList.add("hidden");
    line.style.border =  "0px solid rgb(255,255, 255)";
    li2.style.fontSize = "18px";
    li1.style.fontSize = "15px";
    li3.style.fontSize = "15px";
    li2.style.color = "red";
    li1.style.color = "white";
    li3.style.color = "white";

}

function showChange(){
    document.getElementById("change").classList.remove("hidden");
    document.getElementById("name").classList.add("hidden");
    document.getElementById("calendar_date").classList.add("hidden");
    document.getElementById("regist").classList.add("hidden");
    document.getElementById("calendar").classList.add("hidden");
    line.style.border =  "0px solid rgb(255,255, 255)";
    li3.style.fontSize = "18px";
    li2.style.fontSize = "15px";
    li1.style.fontSize = "15px";
    li3.style.color = "red";
    li2.style.color = "white";
    li1.style.color = "white";
}
