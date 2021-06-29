let display = '';
let list = document.getElementById('myUL');
let completedList = document.getElementById('myUL-Done');
let i;
let count =0;
let TodoArray = [];  
let completedTodoArray = []; 
let prioNumber = 0;
function newElement() {
    let inputValue = document.getElementById('myInput').value;
    document.getElementById('myInput').value = "";
    TodoArray[TodoArray.length] = inputValue;
    Refresh_Todo_List();
    saveToLocalStorage();
}
function delete_btn(event) {
    for( i = 0; i<TodoArray.length;i++) {
        
        if((event.target.id) === 'delete_btn' + i) {
            let deleteElement = TodoArray[i];
            let index = TodoArray.indexOf(deleteElement);
            if (index !== -1) {
                TodoArray.splice(index,1);
            }
            
        }
        
    }
    
    Refresh_Todo_List();
    saveToLocalStorage();
    getFromLocalStorage();
    
}
function done_btn(event) {
    completedList.innerHTML='';
    for( i = 0; i<TodoArray.length;i++) {
        
        if((event.target.id) === 'done_btn' + i) {
            let deleteElement = TodoArray[i];
            completedTodoArray[completedTodoArray.length] = deleteElement;
            let index = TodoArray.indexOf(deleteElement);
            if (index !== -1) {
                TodoArray.splice(index,1);
                let audioDiv = document.getElementById("audioDiv");
                audioDiv.innerHTML='<audio hidden controls autoplay> <source src="completed.mp3" type="audio/mp3"> </audio>';
                count++;
                let liElement = document.createElement("li");
                liElement.innerHTML = 'Bạn đã hoàn thành được ' + count + ' nhiệm vụ trong ngày hôm nay!';
                completedList.appendChild(liElement);
            }       

        }
        
    }
    Refresh_Todo_List();
    saveToLocalStorage();
    getFromLocalStorage();

}


function displayCompleted() {
    completedList.innerHTML = 'Bạn đã hoàn thành được ' + count + ' nhiệm vụ trong ngày hôm nay!';
    for (i = 0; i < completedTodoArray.length; i++) {
        let liElement = document.createElement("li");
        liElement.id = 'completedTask' + i;
        liElement.innerHTML = (i+1) + '. ' + completedTodoArray[i];
        completedList.appendChild(liElement);
    }
}


function saveToLocalStorage() {
    localStorage.setItem("TODO", JSON.stringify(TodoArray));
    localStorage.setItem("COUNT",count);
    localStorage.setItem("DONE", JSON.stringify(completedTodoArray));
}

function getFromLocalStorage() {
    completedTodoArray = JSON.parse(localStorage.getItem("DONE"));
    TodoArray = JSON.parse(localStorage.getItem("TODO"));
    count = localStorage.getItem("COUNT");
    completedList.innerHTML='';
    completedList.innerHTML = 'Bạn đã hoàn thành được ' + count + ' nhiệm vụ trong ngày hôm nay!';
    displayCompleted();
    Refresh_Todo_List();

}


function getTime() {
        let date = new Date();
        return date;
}


function Check_Discard_Button() {
    let deleteButton = document.getElementById('delete_btn' + i);
    let doneButton = document.getElementById('done_btn' + i);
    deleteButton.addEventListener("click",delete_btn);
    doneButton.addEventListener("click",done_btn);
}

function Refresh_Todo_List() {
    list.innerHTML = '';
    for(i= 0 ; i <TodoArray.length; i++) {
        if(TodoArray !== []) {
            let liElement = document.createElement("li");
            liElement.id = i;
            display = TodoArray[i];
            liElement.innerHTML =  '<div class="widget-content-right" id="div'+i+'">'+display+' <button class="border-0 btn-transition btn btn-outline-success" id="done_btn'+i+'" > <i class="fa fa-check" id="done_btn'+i+'"></i></button> <button class="border-0 btn-transition btn btn-outline-danger" id="delete_btn'+i+'"> <span class="fa fa-trash" id="delete_btn'+i+'"></span> </button> </div>';
            list.appendChild(liElement);
            Check_Discard_Button();
            
        } else {

            list.innerHTML = '';
        }
    }
}

function resetAll() {
    TodoArray = [];
    completedTodoArray = [];
    count = 0;
    saveToLocalStorage();
}

window.addEventListener("keydown", function(e) {
    let keyCode = e.keyCode;

    const KEY_ENTER = 13; KEY_RESET = 46;

    switch (keyCode) {
        case KEY_ENTER: newElement(); break;
        case KEY_RESET: resetAll(); break;
    }
});

setInterval(function() {
    document.getElementById("timeCheck").innerHTML = getTime();
},1000);


//Drag and Drop prio
// Undo
// hiệu suất