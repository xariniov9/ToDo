var StatusENUMS = {
    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos = {
    1 : {title : "Understand Git", status : StatusENUMS.ACTIVE},
    2 : {title : "Install Webstorm", status : StatusENUMS.ACTIVE},
    3 : {title : "Learn CSS", status : StatusENUMS.ACTIVE},
    4 : {title : "Async JS", status : StatusENUMS.COMPLETE},
    5 : {title : "Install Express", status : StatusENUMS.COMPLETE},
    6 : {title : "Understand Callbacks", status : StatusENUMS.COMPLETE},
    7 : {title : "Go to Gym", status : StatusENUMS.DELETED},
    8 : {title : "Some todo", status : StatusENUMS.DELETED}
}

var next_todo_id = 4;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}