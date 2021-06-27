let display = '';
let list = document.getElementById('myUL');
let completedList = document.getElementById('myUL-Done');
let i;
let count =0;

let array = [];  
let completedArray = []; 
function newElement() {
    let inputValue = document.getElementById('myInput').value;
    document.getElementById('myInput').value = "";
    array[array.length] = inputValue;
    list.innerHTML = "";
    
    for (i = 0; i< array.length ; i++) {
        if (inputValue !== '') {
            let liElement = document.createElement("li");
            liElement.id = i;
            display = array[i];
            liElement.innerHTML =  '<div class="widget-content-right" id="'+i+'">'+display+' <button class="border-0 btn-transition btn btn-outline-success" id="done_btn'+i+'" > <i class="fa fa-check" id="done_btn'+i+'"></i></button> <button class="border-0 btn-transition btn btn-outline-danger" id="delete_btn'+i+'"> <span class="fa fa-trash" id="delete_btn'+i+'"></span> </button> </div>';
            list.appendChild(liElement);
            let deleteButton = document.getElementById('delete_btn' + i);
            let doneButton = document.getElementById('done_btn' + i);
            deleteButton.addEventListener("click",delete_btn);
            doneButton.addEventListener("click",done_btn);
            
        }
    }
    saveToLocalStorage();
}
function delete_btn(event) {
    list.innerHTML = "";
    for( i = 0; i<array.length;i++) {
        
        if((event.target.id) === 'delete_btn' + i) {
            let deleteElement = array[i];
            let index = array.indexOf(deleteElement);
            if (index !== -1) {
                array.splice(index,1);
            }
            
        }
        
    }
    
    for(i= 0 ; i <array.length; i++) {
        if(array !== []) {
            let liElement = document.createElement("li");
            liElement.id = i;
            display = array[i];
            liElement.innerHTML =  '<div class="widget-content-right" id="div'+i+'">'+display+' <button class="border-0 btn-transition btn btn-outline-success" id="done_btn'+i+'" > <i class="fa fa-check" id="done_btn'+i+'"></i></button> <button class="border-0 btn-transition btn btn-outline-danger" id="delete_btn'+i+'"> <span class="fa fa-trash" id="delete_btn'+i+'"></span> </button> </div>';
            list.appendChild(liElement);
            let deleteButton = document.getElementById('delete_btn' + i);
            let doneButton = document.getElementById('done_btn' + i);
            deleteButton.addEventListener("click",delete_btn);
            doneButton.addEventListener("click",done_btn);
            
        } else {
            list.innerHTML = "";
        }
    }
    saveToLocalStorage();
    getFromLocalStorage();
    
}
function done_btn(event) {
    completedList.innerHTML='';
    list.innerHTML = "";
    for( i = 0; i<array.length;i++) {
        
        if((event.target.id) === 'done_btn' + i) {
            let deleteElement = array[i];
            completedArray[completedArray.length] = deleteElement;
            let index = array.indexOf(deleteElement);
            if (index !== -1) {
                array.splice(index,1);
                count++;
                let liElement = document.createElement("li");
                // liElement.innerHTML = 'Bạn đã hoàn thành được ' + count + ' nhiệm vụ trong ngày hôm nay!';
                completedList.appendChild(liElement);
            }
            

        }
        
    }
    for(i= 0 ; i <array.length; i++) {
        if(array !== []) {
            let liElement = document.createElement("li");
            liElement.id = i;
            display = array[i];
            liElement.innerHTML =  '<div class="widget-content-right" id="'+i+'">'+display+' <button class="border-0 btn-transition btn btn-outline-success" id="done_btn'+i+'" > <i class="fa fa-check" id="done_btn'+i+'"></i></button> <button class="border-0 btn-transition btn btn-outline-danger" id="delete_btn'+i+'"> <span class="fa fa-trash" id="delete_btn'+i+'"></span> </button> </div>';
            list.appendChild(liElement);
            let deleteButton = document.getElementById('delete_btn' + i);
            let doneButton = document.getElementById('done_btn' + i);
            deleteButton.addEventListener("click",delete_btn);
            doneButton.addEventListener("click",done_btn);
            
        } else {
            list.innerHTML = "";
        }
    }
    saveToLocalStorage();
    getFromLocalStorage();
}

function myFunction(event) {
    
    let key = event.which || event.keyCode;
    if (key === 13) {
        let inputValue = document.getElementById('myInput').value;
        if(inputValue !== '') {
            newElement();
            saveToLocalStorage();
            getFromLocalStorage();
        }
    }
}

function displayCompleted() {
    completedList.innerHTML = 'Bạn đã hoàn thành được ' + count + ' nhiệm vụ trong ngày hôm nay!';
    for (i = 0; i < completedArray.length; i++) {
        let liElement = document.createElement("li");
        liElement.id = 'completedTask' + i;
        liElement.innerHTML = (i+1) + '. ' + completedArray[i];
        completedList.appendChild(liElement);
    }
}


function saveToLocalStorage() {
    localStorage.setItem("TODO", JSON.stringify(array));
    localStorage.setItem("COUNT",count) 
}

function getFromLocalStorage() {
    array = JSON.parse(localStorage.getItem("TODO"));
    count = localStorage.getItem("COUNT");
    displayCompleted();
    list.innerHTML = "";
    
    for(i= 0 ; i <array.length; i++) {
        if(array !== []) {
            let liElement = document.createElement("li");
            liElement.id = i;
            display = array[i];
            liElement.innerHTML =  '<div class="widget-content-right" id="div'+i+'">'+display+' <button class="border-0 btn-transition btn btn-outline-success" id="done_btn'+i+'" > <i class="fa fa-check" id="done_btn'+i+'"></i></button> <button class="border-0 btn-transition btn btn-outline-danger" id="delete_btn'+i+'"> <span class="fa fa-trash" id="delete_btn'+i+'"></span> </button> </div>';
            list.appendChild(liElement);
            let deleteButton = document.getElementById('delete_btn' + i);
            let doneButton = document.getElementById('done_btn' + i);
            deleteButton.addEventListener("click",delete_btn);
            doneButton.addEventListener("click",done_btn);
            
        } else {
            list.innerHTML = "";
        }
    }
}
