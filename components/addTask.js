// Immediately Invoked Function Expression IIFE
import checkComplete from "./checkComplete.js";
import deleteIcon from "./deleteIcon.js";

export const addTask = (event) => {
    event.preventDefault();

    const list = document.querySelector("[data-list]");
    const input = document.querySelector("[data-form-input]");
    const calendar = document.querySelector("[data-form-date]");
    
    const value = input.value;
    const date = calendar.value;
    const dateFormat = moment(date).format('DD/MM/YYYY');

    
    input.value = "";
    calendar.value = "";
    
    const taskObj = {
        value,
        dateFormat,
    };

    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.push(taskObj);
    
    // Solo almacena la información mientras perdure la sesión
    // sessionStorage.setItem("tasks", JSON.stringify(taskObj)); 
    
    // Almacena la información de forma local
    localStorage.setItem("tasks", JSON.stringify(taskList));

    const task = createTask(taskObj);
    list.appendChild(task);
};


export const createTask = ({value, dateFormat}) => {
    const task = document.createElement("li");
    task.classList.add("card");

    const taskContent = document.createElement("div");

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