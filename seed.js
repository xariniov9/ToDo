var StatusENUMS = {
    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos = {
    1 : {title : "learn JavaSciprt", status : StatusENUMS.ACTIVE},
    2 : {title : "GIT Tutorial", status : StatusENUMS.ACTIVE},
    3 : {title : "learn Z", status : StatusENUMS.ACTIVE},

}

var next_todo_id = 4;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}