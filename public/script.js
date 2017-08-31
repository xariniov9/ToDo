const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID_ACTIVE = "todos_list_div_active";
const TODO_LIST_ID_DELETED = "todos_list_div_deleted";
const TODO_LIST_ID_COMPLETE = "todos_list_div_complete";


window.onload = getTodosAJAX();

function extractStatus(status) {
    if(status.length > 15)
        return status.substr(15).toUpperCase();
    return "";
}

function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                //console.log(xhr.response);
                addTodoElements(TODO_LIST_ID_ACTIVE, xhr.response);
                addTodoElements(TODO_LIST_ID_COMPLETE, xhr.response);
                addTodoElements(TODO_LIST_ID_DELETED, xhr.response);
            }
        }
    };
    xhr.send(data=null);
}

function addTodoElements(id, todos_data_json){
    var parent = document.getElementById(id);
    var todos = JSON.parse(todos_data_json);
    if(parent){
        parent.innerHTML = "";
        Object.keys(todos).forEach( function (key) {
            if(todos[key].status == extractStatus(id)) {
                var todoElement = createTodoElement(key, todos[key]);
                parent.appendChild(todoElement);
                //console.log(todoElement);
            }
        });
    }
}


function createTodoElement(id, todo_object) {
    var todo_element = document.createElement('li');
    todo_element.setAttribute("class", "list-group-item");

    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("style", "border: 0 none;");

    if(todo_object.status == "ACTIVE" || todo_object.status == "COMPLETE"){
        todo_element.innerText = "";
        var complete_box = document.createElement('div');
        complete_box.setAttribute("class", "checkbox checkbox-success");

        var chkbox = document.createElement("input");
        chkbox.setAttribute("id", "chk"+id);
        chkbox.setAttribute("class", "styled");
        chkbox.setAttribute("type", "checkbox");
        chkbox.setAttribute("onclick", "completeTodoAJAX(" + id + ")");
        if(todo_object.status === "COMPLETE")
            chkbox.setAttribute('checked','checked');

        var lbl = document.createElement("label");
        lbl.setAttribute("for", "chk"+id);
        lbl.innerText = todo_object.title;
        if(todo_object.status === "COMPLETE")
            lbl.setAttribute("style","text-decoration: line-through;")

        complete_box.appendChild(chkbox);
        complete_box.appendChild(lbl);



        var delete_button = document.createElement("button");
        delete_button.setAttribute("class", "btn btn-default");
        delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id +")");
        delete_button.setAttribute("style", "color:#FF0000; position: absolute; right:0; border: 0 none;")

        var span = document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-trash");


        delete_button.appendChild(span);
        complete_box.appendChild(delete_button);

        todo_element.appendChild(complete_box);


    }
    return todo_element;
}

function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "id=" + encodeURI(id);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){    //response ready?
            if(xhr.status == STATUS_OK){
                addTodoElements(TODO_LIST_ID_ACTIVE, xhr.responseText);
                addTodoElements(TODO_LIST_ID_COMPLETE, xhr.responseText);
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
                addTodoElements(TODO_LIST_ID_COMPLETE, xhr.responseText);
                addTodoElements(TODO_LIST_ID_ACTIVE, xhr.responseText);
                addTodoElements(TODO_LIST_ID_DELETED, xhr.responseText);
            }
        }
    };
    xhr.send(data);
}



function addTodoAJAX() {
    var title= document.getElementById("new_todo_title").value;
    document.getElementById("new_todo_title").value = "";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "title=" + encodeURI(title);

    xhr.onreadystatechange = function () {
        //callback for open!
        if(xhr.readyState == RESPONSE_DONE){    //response ready?
            if(xhr.status == STATUS_OK){
                //console.log(xhr.responseText);
                addTodoElements(TODO_LIST_ID_ACTIVE, xhr.responseText);
            }
        }
    };
    xhr.send(data);
}