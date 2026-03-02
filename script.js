const input = document.getElementById("inputTask");
const button = document.getElementById("addTask");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

// Render tasks
function renderTasks(){
    list.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = task.text;

      //Completed 
      if (task.completed) {
        li.style.textDecoration = "line-through";
      }

      li.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
      });

      // delete button
      const delBtn = document.createElement("button");
      delBtn.innerText = "Delete";

      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        saveTasks();
      });

      li.appendChild(delBtn);
      list.appendChild(li);
    });

}

// LocalStorage
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}
function addTask(){
    const text = input.value.trim()

    if (!text){
        return;
    }

    tasks.push({
        text: text,
        completed: false,
    });
    input.value = "";
    saveTasks();
}

// button click
button.addEventListener("click", addTask)


renderTasks();