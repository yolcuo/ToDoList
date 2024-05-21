//Tüm elementler

const form = document.querySelector("#todoAddForm"); 
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos=[];

runEvents();

function runEvents(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoFromUI);
    clearButton.addEventListener("click", clearAllTodos);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");
    
    if(todoList.length>0){
        todoList.forEach(function(todo){
            if(todo.textContent.toLocaleLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display:block");
            }else{
                todo.setAttribute("style","display: none !important");
            }
        });
    }
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen bir değer giriniz");
    }else{
        addTodoToUI(inputText);
        addTodoStorage(inputText);
        showAlert("success","ToDo eklendi")
    }

    e.preventDefault();
}

function addTodoToUI(newTodo){
    const li = document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=newTodo;

    const a = document.createElement("a");
    a.href="#";
    a.className="delete-item";

    const i = document.createElement("i");
    i.className="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value="";
}

function removeTodoFromUI(e){
    if(e.target.className==="fa fa-remove"){
        //Ekrandan sil
        const todo=e.target.parentElement.parentElement;
        todo.remove();

        //storagedan sil
        removeTodoFromStorage(todo.textContent);
        showAlert("success","Todo başarıyla silindi");
    }
}

function removeTodoFromStorage(removeTodo){
    checkTodosFromStorage();
    for (let i = 0; i < todos.length; i++) {
        if(removeTodo===todos[i]){
            todos.splice(i,1);
            break;
        }
    };
    localStorage.setItem("todos",JSON.stringify(todos));
}

function clearAllTodos(){
    const todoList = document.querySelectorAll(".list-group-item");
    if(todoList.length>0){
        //Ekrandan silme
        todoList.forEach(function(todo){
            todo.remove();
        });
        //storagetan silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Tüm todolar silindi.");
    }
    else{
        showAlert("warning","Silinecek todo yoktur.")
    }
}

function addTodoStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    const div = document.createElement("div");
    div.className=`alert alert-${type}`;
    div.textContent=message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },1000);
}


