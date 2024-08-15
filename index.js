document.addEventListener("DOMContentLoaded", function() {
    // Load tasks from localStorage
    loadTasks();

    document.querySelector("#push").addEventListener("click", function() {
        var toDoList = document.querySelector("#myInput").value;

        if (toDoList) {
            addTask(toDoList);
            saveTasks(); // Save to localStorage
            document.querySelector("#myInput").value = ""; 
        }
    });
});

function addTask(toDoList, isCompleted = false) {
    var taskItem = document.createElement("div");
    var taskText = document.createElement("span");
    taskText.textContent = toDoList;

    if (isCompleted) {
        taskText.classList.add("completed");
    }

   
    var completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", function() {
        taskText.classList.toggle("completed");
        saveTasks(); 
    });

 
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        taskItem.remove();
        saveTasks(); 
    });

  
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
       
        var editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText.textContent;

       
        var saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", function() {
            taskText.textContent = editInput.value;
            taskItem.replaceChild(taskText, editInput);
            taskItem.replaceChild(editButton, saveButton);
            saveTasks(); 
        });

        
        taskItem.replaceChild(editInput, taskText);
        taskItem.replaceChild(saveButton, editButton);
    });

    
    taskItem.appendChild(taskText);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);

   
    document.querySelector("#outPut").appendChild(taskItem);
}

function saveTasks() {
    var tasks = [];
    document.querySelectorAll("#outPut div").forEach(function(taskItem) {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(function(task) {
            addTask(task.text, task.completed);
        });
    }
}

document.querySelector(".dropDown").addEventListener("change", function() {
    var option = this.value;
    filterTasks(option);
});

function filterTasks(option) {
    var tasks = document.querySelectorAll("#outPut div");
    tasks.forEach(function(task) {
        var isCompleted = task.querySelector("span").classList.contains("completed");
        if (option === "all") {
            task.style.display = "flex";
        } else if (option === "complete" && isCompleted) {
            task.style.display = "flex"; 
        } else if (option === "incomplete" && !isCompleted) {
            task.style.display = "flex";
        } else {
            task.style.display = "none"; 
        }
    });
}