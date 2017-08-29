var express = require('express');
var bodyParser = require('body-parser');
var todo_db = require('./seed.js');

var app = express();
app.listen(4000);

app.use('/',bodyParser.urlencoded({extended : false}) );

console.log(todo_db);
app.use('/', express.static(__dirname + "/public"));

app.get('/api/todos', function (req, res) {
    res.json(todo_db.todos);
});

app.delete('/api/todos/:id', function (req, res) {
   var del_id = req.params.id;
   var todo = todo_db.todos[del_id];
   if(!todo){
       res.status(400).json({err : "Todo doesn't exist"});
   } else {
       todo.status = todo_db.StatusENUMS.DELETED;
       res.json(todo_db.todos);
   }
});

app.post('/api/todos', function (req, res) {
   // expect a title in body of request
    var todo_title = req.body.title;
    if(!todo_title || todo_title == "" || todo_title.trim() == ""){
        res.status(400).json({err : "Enter todo title!"});
    }
    else {
        var newTodo = {
            title : todo_title,
            status : todo_db.StatusENUMS.ACTIVE
        }
        todo_db.todos[todo_db.next_todo_id] = newTodo;
        todo_db.next_todo_id++;
        res.json(newTodo);
    }

});

app.put('/api/todos/:id', function (req, res) {
    var put_id = req.params.id;
    var todo_title = req.body.title;
    var todo_status = req.body.status;

    var todo = todo_db.todos[put_id];
    if(!todo || todo.status == todo_db.StatusENUMS.DELETED){
        res.status(400).json({err : "Todo doesn't exist"});
    } else {
        todo.status = todo_db.StatusENUMS.COMPLETE;
        res.json(todo_db.todos);
    }
});