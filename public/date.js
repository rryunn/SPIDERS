
var calendarBody = document.getElementById('calendar-body');
var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(), 1);
const calDate = document.querySelector("#cal-date");
var todayYear = today.getFullYear();
var todayMonth = today.getMonth() +1;
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
var toMonth = today.getMonth() + 1;
var toYear = today.getFullYear();
var start = first.getDay();
var tx = 0;

now.innerHTML = `${toYear}년 ${toMonth}월`;
calDate.textContent = today.getDate();


function SelectCalendar(){
    for (var i = 0; i < 6; i ++) {
        var $tr = document.createElement('tr');
        for(var j = 0; j < 7; j ++) {

            var $td = document.createElement('td');
            $td.style.width = "80px";
            $td.style.height = "80px";
            $td.style.textAlign = "center"; // 텍스트 가운데 정렬
            $td.style.verticalAlign = "top"; // 셀의 상단 정렬
            var date = (i * 7) + j -start+ 1;
        
            if(toMonth === 4 || toMonth ===6||toMonth ===9||toMonth ===11){
                if(date > 0 && date < 31){
                    $td.textContent = date;
                    const id = `${toYear}${toMonth}${date}`; 
                    $td.setAttribute('id', id); 
                    if(date === 30){
                        tx = j;
                    }

                }
            }
            else if(toMonth===2){
                if(toYear%4===0){
                    if(date > 0 && date < 30){
                        $td.textContent = date;
                        const id = `${toYear}${toMonth}${date}`; 
                        $td.setAttribute('id', id); 
                        if(date === 29){
                            tx = j;
                        }
                    }   
                }
                else{
                    if(date > 0 && date < 29){
                        $td.textContent = date;
                        const id = `${toYear}${toMonth}${date}`; 
                        $td.setAttribute('id', id); 
                        if(date === 28){
                            tx = j;

                        }
                    } 
                }
            }
            else{
                if(date > 0 && date < 32){

                    $td.textContent = date;
                    const id = `${toYear}${toMonth}${date}`; 
                    $td.setAttribute('id', id); 
                    if(date === 31){
                        tx = j;

                    }
                }
            }

            $td.addEventListener("click", function(){
                var td_date = this.textContent.substring(0, 2); //textContent 문자열의 0~1를 가져오겠다.
                if (/\D/.test(td_date)) {
                    td_date = this.textContent.substring(0, 1); //정규표현식 : 숫자가 아닌 문자가 있다면
                }
                calDate.textContent = td_date;
                showTable(); // TABLE를 클릭할때마다 새롭게 가지고 와야 ID가 다르게 적용됨.
                TimeSchedule();
            });

            $tr.appendChild($td);
        }  
        calendarBody.appendChild($tr);
    }
    
}


next.addEventListener("click", (e) =>{

    while (calendarBody.firstChild) {
        calendarBody.removeChild(calendarBody.firstChild);
    } //캘린더 테이블 지워주기
    toMonth++; //몇월 하나씩 올려줌

    if(toMonth === 13){
        toMonth = 1;
        toYear++;
    }
    now.innerHTML = `${toYear}년 ${toMonth}월`;
    start = tx +1; //그 달 마지막 요일을 알아낸 후 +1 한 값이 start 로 들어감.
    SelectCalendar();
    ComeSchedule();
    showTable();
    TimeSchedule();
    }
)

prev.addEventListener("click", (e) =>{

    while (calendarBody.firstChild) {
        calendarBody.removeChild(calendarBody.firstChild);
    } //캘린더 테이블 지워주기

    toMonth--; //몇월 하나씩 줄임
    if(toMonth === 0){
        toMonth = 12;
        toYear--;
    }
    now.innerHTML = `${toYear}년 ${toMonth}월`;
    pageFirst = new Date(toYear, toMonth-1, 1);
    //next 버튼이랑은 다른 방식
    start = pageFirst.getDay();
    SelectCalendar();
    ComeSchedule();
    showTable();
    TimeSchedule();
    }
)

SelectCalendar();

function ComeSchedule() {
    fetch('/schedule')
    .then(response => response.json())
    .then(data => {
        data.forEach((schedule) => {

            const dateId = `${schedule.YEAR}${schedule.MONTH}${schedule.DAY}`;
            const td = document.getElementById(dateId);
            if (td) {
                const dataList = document.createElement('div');
                dataList.textContent = `${schedule.TIME}, ${schedule.NAME}`;
                td.appendChild(dataList);
                dataList.classList.add('schedule-info'); 
            }
            //이미 그 calID가 있다면 새롭게 등록되지 않는다.

        })
    })
    .catch(error => {
        console.error('일정 데이터를 가져오는 중 오류 발생:', error);
    });
}
ComeSchedule();

function TimeSchedule() {
    fetch('/schedule')
        .then(response => response.json())
        .then(data => {
            data.forEach((schedule) => {

                //이미 그 calID가 있다면 새롭게 등록되지 않는다.

                var minHour = schedule.TIME.substring(0,2);
                var minMin= schedule.TIME.substring(3,5);
                var maxHour = schedule.TIME.substring(8,10);
                var maxMin = schedule.TIME.substring(11,13);
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
                //t가 min 부터 max 값이 될 때까지 (그리고 0.5씩 올라감)
                for(var t = min ; t < max; t+=0.5){
                    const calId = `today_${schedule.YEAR}${schedule.MONTH}${schedule.DAY}${t}`;
                    const dd = document.getElementById(calId);
                    if(dd){
                        const userList = document.createElement('div');
                        userList.textContent = `${schedule.NAME}`;
                        dd.appendChild(userList);
                        dd.style.backgroundColor = "lightblue";
                    }
                };
            })
        })
        .catch(error => {
            console.error('일정 데이터를 가져오는 중 오류 발생:', error);
        });
}
TimeSchedule();

var user = document.querySelector("#todo_user");
var time = document.getElementById('todo_time');

function showTable() {
    //td를 새롭게 클릭 시 기존에 만들어졌던 table은 없애고 새롭게 만들어야 한다.
    while (time.firstChild) {
        time.removeChild(time.firstChild);
    }
    var t = 9;
    var j = 9;
    for (var i = 0; i < 26; i++) {
        var todo_tr = document.createElement('div');
        const todo_id = `today_${toYear}${toMonth}${calDate.textContent}${j}`;
        j = j+ 0.5;
        todo_tr.setAttribute('id', todo_id);
        todo_tr.textContent = t % 1 == 0 ? `${t}:00 ~ ${t}:30` : `${t - 0.5}:30 ~ ${t + 0.5}:00`;
        t = t + 0.5;
        todo_tr.style.border = "1px solid black";
        todo_tr.style.height = "50px";
        time.appendChild(todo_tr);
    }
}

showTable();
