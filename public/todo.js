var user = document.querySelector("#todo_user");
var time = document.getElementById('todo_time');

function showTable(){
    for(var i=0; i<25; i++){
        var todo_tr = document.createElement('tr');
        const todo_id = `todo_${i}`;
        todo_tr.setAttribute('id',todo_id);
        
        todo_tr.textContent = `time`;
        todo_tr.style.border= "50px solid black";
        todo_tr.style.height = "20px";
        time.appendChild(todo_tr);
    }
}
showTable();

