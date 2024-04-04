
var miniCalendar = document.getElementById('miniCalendar');
var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(), 1);
var mnow = document.querySelector("#mnow");
const mnext = document.querySelector("#mnext");
const mprev = document.querySelector("#mprev");
var toMonth = today.getMonth() + 1;
var toYear = today.getFullYear();
var start = first.getDay();
var tx = 0;
mnow.innerHTML = `${toYear}년 ${toMonth}월`;
var selectTime = document.querySelector("#selectTime");
var result = document.querySelector("#result");
var result_month = document.querySelector("#result_month");
var result_day = document.querySelector("#result_day");
var result_time = document.querySelector("#result_time");
var result_year = document.querySelector("#result_year");
var result_who = document.querySelector("#result_who");
var resultDate = 0;
var isReserved = false; // 예약 여부를 나타내는 변수 추가
var isClicked = false;

function RegistCalendar(){
    for (var i = 0; i < 6; i ++) {
        var $tr = document.createElement('tr');

        for(var j = 0; j < 7; j ++) {

            var $td = document.createElement('td');
            var date = (i * 7) + j -start+ 1;
        
            if(toMonth === 4 || toMonth ===6||toMonth ===9||toMonth ===11){
                if(date > 0 && date < 31){
                    $td.textContent = date;
                    if(date === 30){
                        tx = j;

                    }

                }
            }
            else if(toMonth===2){
                if(toYear%4===0){
                    if(date > 0 && date < 30){
                        $td.textContent = date;
                        if(date === 29){
                            tx = j;

                        }
                    }   
                }
                else{
                    if(date > 0 && date < 29){
                        $td.textContent = date;
                        if(date === 28){
                            tx = j;

                        }
                    } 
                }
            }
            else{
                if(date > 0 && date < 32){
                    $td.textContent = date;
                    if(date === 31){
                        tx = j;

                    }
                }
            }

            $td.addEventListener("mousemove", function() {
                if (!isClicked) {
                    this.style.backgroundColor = "rgb(241, 243, 203)"; 
                }
            });
            
            $td.addEventListener("mouseleave", function() {
                if (!isClicked) {
                    this.style.backgroundColor = ""; // 초기 배경색으로 되돌리기
                }
            });
            $td.addEventListener("click", function() {
                if (!isClicked) {
                    this.style.backgroundColor = "rgb(241, 243, 203)";
                    resultDate = this.textContent;
                    result_month.innerHTML += `${toMonth}`;
                    result_day.innerHTML += `${resultDate}`;
                    result_year.innerHTML += `${toYear}`;
                    isClicked=true;
                } else {
                    alert("날짜는 하루만 선택 가능합니다.");
                    

                    if (isClicked){
                        result_month.innerHTML = ``;
                        result_day.innerHTML = ``;
                        result_time.innerHTML = ``;
                        result_year.innerHTML = ``;

                        boxes.forEach(function(box) {
                            box.style.backgroundColor = "";
                        });
                        boxIds=[];
                        
                        var tds = document.querySelectorAll("td");
                        tds.forEach(function(td) {
                            td.style.backgroundColor = ""; // 초기 색으로 되돌리기
                        });
                        isClicked = false;
                    }
                }
            });
            

            $tr.appendChild($td);

        }  
        miniCalendar.appendChild($tr);
    }
    
}



mnext.addEventListener("click", (e) =>{

    while (miniCalendar.firstChild) {
        miniCalendar.removeChild(miniCalendar.firstChild);
    } 
    toMonth++; 
    if(toMonth === 13){
        toMonth = 1;
        toYear++;
    }
    mnow.innerHTML = `${toYear}년 ${toMonth}월`;
    start = tx +1; 
    RegistCalendar();
    }
)

mprev.addEventListener("click", (e) =>{

    while (miniCalendar.firstChild) {
        miniCalendar.removeChild(miniCalendar.firstChild);
    } 
    toMonth--; 
    if(toMonth === 0){
        toMonth = 12;
        toYear--;
    }
    mnow.innerHTML = `${toYear}년 ${toMonth}월`;
    pageFirst = new Date(toYear, toMonth-1, 1);
    start = pageFirst.getDay();
    RegistCalendar();
    }
)
RegistCalendar();



var j=9;
var a = 9; //박스에 적힌 9시처럼 시간과 같이 id를 만들기 위해서 9시 30분은 9.5
for(var i = 0; i<26; i++){
    if(i%2==0){

        selectTime.innerHTML += `<div class = "box" id = "${a}"> ${j}시<br></div>`;
        j=j+1;
        a=a+1;
        if(j ===13){
            j=1;
        }
    }
    else{
        selectTime.innerHTML += `<div class = "box" id = "${a-0.5}"><br></div>`;

    }
}


var boxes= document.querySelectorAll(".box");
var boxIds = [];

boxes.forEach(function(box) {

    box.addEventListener("click", function() {
        var id = parseFloat(box.id); // id를 숫자로 변환

        //이미 박스가 선택되어있을 경우 가정
        if(this.style.backgroundColor === "rgb(224, 230, 204)"){
            this.style.backgroundColor = "rgb(230, 210, 204)";
            var index = boxIds.indexOf(this.id);
            if (index) { //id의 값이 들어있다면
                boxIds.splice(index, 1); // index번째에 위치한 요소 1개를 제거
            }
        }

        else{
            this.style.backgroundColor = "rgb(224, 230, 204)";
            if (!isNaN(id)) { // id가 숫자인 경우에만 처리
                boxIds.push(id); 
            }
        }

        boxIds.sort();
        var smallestId = boxIds[0];
        var largestId = boxIds[boxIds.length - 1];
        
        var smallestHour = parseInt(smallestId); 
        var smallestMinute = smallestId % 1 !== 0 ? "30" : "00"; // 소수부가 있는 경우에는 30분, 없는 경우에는 00분으로 설정
        if(smallestHour ==9){
            smallestId = `0${smallestHour}:${smallestMinute}`; // 시간과 분을 합쳐서 표시
        }else{
            smallestId = `${smallestHour}:${smallestMinute}`; 
        }


        if(largestId % 1 === 0){
            var largestHour = parseInt(largestId);
            var largestMinute = "30";
            if(largestHour == 9)
                largestId = `0${largestHour}:${largestMinute}`;
            else{
                largestId = `${largestHour}:${largestMinute}`;
            }
        }
        else if(largestId % 1 !== 0){
            var largestHour = parseInt(largestId+1);
            var largestMinute = "00";
            largestId = `${largestHour}:${largestMinute}`;
        }

        result_time.innerHTML = `${smallestId} ~ ${largestId}`;
        
    });
  });

document.getElementById("reset").addEventListener("click", function(){
    boxes.forEach(function(box) {
        box.style.backgroundColor = ""; // 초기 색으로 되돌리기
    });

    // td 초기화
    var tds = document.querySelectorAll("td");
    tds.forEach(function(td) {
        td.style.backgroundColor = ""; // 초기 색으로 되돌리기
    });
    isClicked = false;
    var result_year_element = document.getElementById("result_year");
    var result_month_element = document.getElementById("result_month");
    var result_day_element = document.getElementById("result_day");
    var result_time_element = document.getElementById("result_time");
    var result_who_element = document.getElementById("result_who");
    result_year_element.textContent = "";
    result_month_element.textContent = "";
    result_day_element.textContent = "";
    result_time_element.textContent = "";
    result_who_element.value = "";
    boxIds=[];
})

// 확인 버튼 클릭 이벤트 핸들러
document.getElementById("ok").addEventListener("click", function() {
    // 사용자가 선택한 날짜, 시간, 사용자명을 가져옴
    var result_year_element = document.getElementById("result_year");
    var result_month_element = document.getElementById("result_month");
    var result_day_element = document.getElementById("result_day");
    var result_time_element = document.getElementById("result_time");
    var result_who_element = document.getElementById("result_who");

    var result_year = result_year_element.textContent;
    var result_month = result_month_element.textContent;
    var result_day = result_day_element.textContent;
    var result_time = result_time_element.textContent;
    var result_who = result_who_element.value;
    
    var minHour = result_time.substring(0,2);
    var minMin= result_time.substring(3,5);
    var maxHour = result_time.substring(8,10);
    var maxMin = result_time.substring(11,13);
    var min =0;
    var max = 0;

    if(parseInt(minMin) === 30){
        min = parseInt(minHour) + 0.5;
    }
    else if(parseInt(minMin) === 0){
        min  = parseInt(minHour);
    }

    if(parseInt(maxMin) === 30){
        max = parseInt(maxHour) + 0.5;
    }
    else if(parseInt(maxMin) === 0){
        max  = parseInt(maxHour);
    }

    for(var t = min ; t < max; t+=0.5){
        const checkId = `ttoday_${result_year}${result_month}${result_day}_${t}`;
        const check = document.getElementById(checkId);

        if(check){
            alert("이미 예약된 시간입니다. 다른 시간을 이용해주세요");
            isReserved = true;
            break;
        }
    };
    
    if (isReserved) {
        result_time.innerHTML = ""; // result_time 리셋
        boxes.forEach(function(box) {
            box.style.backgroundColor = "";
        });
    }


    // AJAX 요청을 보냄
    fetch('/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            YEAR : result_year,
            MONTH : result_month,
            DAY : result_day,
            TIME: result_time,
            NAME: result_who
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('일정 저장에 실패하였습니다..');
    })
    .then(data => {
        alert("일정이 저장되었습니다.");
        window.location.reload();

    })
    .catch(error => {
        console.error('데이터 저장 오류:', error);
        alert("일정 저장에 실패하였습니다.");
    });

    // 입력 필드 초기화
    result_year_element.textContent = "";
    result_month_element.textContent = "";
    result_day_element.textContent = "";
    result_time_element.textContent = "";
    result_who_element.value = "";

});


