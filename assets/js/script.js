var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

// check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
var taskFormHandler = function(event) {
    if (true) {
        // this will run because true is true
          console.log("Is true true? Yes.");
        }
        
        if (false) {
        // this will not run because false is not true
          console.log("Is false true? No.");
        }
        
        if (3 === 10 || "a" === "a") {
        // this will run because at least one of the conditions is true
          console.log("Does 3 equal 10? No.");
          console.log("Does the letter 'a' equal the letter 'a'? Yes.");
        }
        
        if (3 === 10 && "a" === "a") {
        // this will not run because both conditions have to be true to run
          console.log("Does 3 equal 10? No.");
          console.log("Does the letter 'a' equal the letter 'a'? Yes.");
        }
     if (isEdit) {
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskTypeInput, taskId);
          } 
          // no data attribute, so create object as normal and pass to createTaskEl function
          else {
            var taskDataObj = {
              name: taskNameInput,
              type: taskTypeInput
            };
          
            createTaskEl(taskDataObj);
          } 
        formEl.reset();
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  var isEdit = formEl.hasAttribute("data-task-id");

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};

var createTaskEl = function (taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskInfoEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};
var createTaskActions = function(taskId) {

    var actionContainerEl = document.createElement("div");
actionContainerEl.className = "task-actions";
// create edit button
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

// create delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);

var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);
var statusChoices = ["To Do", "In Progress", "Completed"];
for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  
actionContainerEl.appendChild(statusSelectEl);
return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    } 
  };
  var editTask = function(taskId) {
    formEl.setAttribute("data-task-id", taskId);
    // console.log("editing task #" + taskId);
  
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
 
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
// console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
// console.log(taskType);
document.querySelector("#save-task").textContent = "Save Task";
};
  
pageContentEl.addEventListener("click", taskButtonHandler);