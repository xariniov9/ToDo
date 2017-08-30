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

function addTodoElements(id, todos_data_json){
    var parent = document.getElementById(id);
    var todos = JSON.parse(todos_data_json);
    if(parent){
        parent.innerHTML = "";
        Object.keys(todos).forEach( function (key) {
            var todoElement = createTodoElement(key, todos[key]);
            parent.appendChild(todoElement);
        });
    }
}

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement('div');
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    return todo_element;
}