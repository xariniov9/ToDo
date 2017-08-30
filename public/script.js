const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID = "todos_list_div";

console.log("works!");

window.onload = getTodosAJAX();

function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function () {
        //callback for open!
        if(xhr.readyState == RESPONSE_DONE){    //response ready?
            // IS RESPONSE OK?
            if(xhr.status == STATUS_OK){
                console.log(xhr.response);
                addTodoElements(TODO_LIST_ID, xhr.response);
            }
        }
    }
    xhr.send(data=null);

}

function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "id=" + encodeURI(id);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){    //response ready?
            if(xhr.status == STATUS_OK){
                addTodoElements(TODO_LIST_ID, xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

function deleteTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "id=" + encodeURI(id);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){    //response ready?
            if(xhr.status == STATUS_OK){
                addTodoElements(TODO_LIST_ID, xhr.responseText);
            }
        }
    };
    xhr.send(data);
}



function addTodoAJAX() {
    var title= document.getElementById("new_todo_title").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "title=" + encodeURI(title);

    xhr.onreadystatechange = function () {
        //callback for open!
        if(xhr.readyState == RESPONSE_DONE){    //response ready?
            if(xhr.status == STATUS_OK){
                //console.log(xhr.responseText);
                addTodoElements(TODO_LIST_ID, xhr.responseText);
            }
        }
    };
    xhr.send(data);

}

function addTodoElements(id, todos_data_json){
    var parent = document.getElementById(id);
    var todos = JSON.parse(todos_data_json);
    if(parent){
        parent.innerHTML = "";
        Object.keys(todos).forEach( function (key) {
            var todoElement = createTodoElement(key, todos[key]);
            parent.appendChild(todoElement);
            //console.log(todoElement);
        });
    }
}

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement('div');
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute("class", "todoStatus" +todo_object.status);


    if(todo_object.status == "ACTIVE"){
        var complete_button = document.createElement("button");
        complete_button.innerText = "Mark Complete";
        complete_button.setAttribute("onclick", "completeTodoAJAX(" + id +")");
        todo_element.appendChild(complete_button);
    }
    if(todo_object.status == "ACTIVE" || todo_object.status == "COMPLETE"){
        var delete_button = document.createElement("button");
        delete_button.innerText = "Delete";
        delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id +")");
        todo_element.appendChild(delete_button);
    }


    return todo_element;
}