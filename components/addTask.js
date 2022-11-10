// Immediately Invoked Function Expression IIFE
import checkComplete from "./checkComplete.js";
import deleteIcon from "./deleteIcon.js";

export const addTask = (event) => {
    const list = document.querySelector("[data-list]");
    const task = createTask(event);
    list.appendChild(task);
};


const createTask = (event) => {
    event.preventDefault();
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    const input = document.querySelector("[data-form-input]");
    const calendar = document.querySelector("[data-form-date]");
    const value = input.value;
    const date = calendar.value;
    const dateFormat = moment(date).format('DD/MM/YYYY');
    const task = document.createElement("li");
    task.classList.add("card");
    input.value = "";
    const taskContent = document.createElement("div");
    
    const taskObj = {
        value,
        dateFormat,
    };

    taskList.push(taskObj);

    // Solo almacena la información mientras perdure la sesión
    // sessionStorage.setItem("tasks", JSON.stringify(taskObj)); 
    
    // Almacena la información de forma local
    localStorage.setItem("tasks", JSON.stringify(taskList));

    const titleTask = document.createElement("span");
    
    titleTask.classList.add("task");
    titleTask.innerText = value;
    
    taskContent.appendChild(checkComplete());
    taskContent.appendChild(titleTask);
    const dateElement = document.createElement("span");
    dateElement.innerHTML = dateFormat;

    task.appendChild(taskContent);
    task.appendChild(dateElement);
    task.appendChild(deleteIcon());
    return task;
};