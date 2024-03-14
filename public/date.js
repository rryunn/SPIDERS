
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
                showTable();
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
                    dataList.textContent = `시간: ${schedule.TIME}, 사용자: ${schedule.NAME}`;
                    td.appendChild(dataList);
                    dataList.classList.add('schedule-info'); 
                }

                const calId = `today_${schedule.YEAR}${schedule.MONTH}${schedule.DAY}`;
                const ID = document.getElementById(calId);

            });
        })
        .catch(error => {
            console.error('일정 데이터를 가져오는 중 오류 발생:', error);
        });
}
ComeSchedule();

//cal-date라는 변수로 div를 새로 만들고, 그 다음에 toYear 년 , 월 , 일 로 id를 만든다
// 불러온 날들로 dataID를 만들고
//해당 DATAID의 값이 존재한다면
// 불러온 시간과 같은 시간대가 있따면
// 그 시간대의 DIV를 색칠한다.


var user = document.querySelector("#todo_user");
var time = document.getElementById('todo_time');

function showTable() {
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