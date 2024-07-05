let addBtn = document.getElementById("addBtn");
let todosCon = document.getElementById("todosCon");
let inputText = document.getElementById("inputText");
let meterEl = document.getElementById("meter");
let meterPercentage = document.getElementById("meter-percentage");
let addedMsg = document.getElementById("added-msg");

let textsList = [];

function meterFun() {
  let percentage = Math.ceil((checkedCount / totalCount) * 100);
  meterEl.value = percentage
  if (totalCount > 0) {
    meterPercentage.textContent = percentage + "% Todos Done!";
  } else {
    meterPercentage.textContent = "";
  }
  if (percentage === 100) {
    let weldone = document.getElementById("weldone");
    weldone.style.display = "block";
    blast();
  } else {
    weldone.style.display = "none";
  }
}

let checkedTodo = document.getElementById("done");
let checkedCount = 0;
function checked() {
  checkedTodo.textContent = checkedCount;
  meterFun();
}

let totalTodos = document.getElementById("total");
let totalCount = 0;
function tot() {
  totalTodos.textContent = totalCount;
  var window_Width = window.innerWidth;

  if (window_Width <= 570) {
    if (totalCount > 10) {
      todosCon.style.overflowY = "scroll";
    } else {
      todosCon.style.overflowY = "hidden";
    }
  } else {
    if (totalCount > 5) {
      todosCon.style.overflowY = "scroll";
    } else {
      todosCon.style.overflowY = "hidden";
    }
  }
  meterFun();
}

function addTask(todo) {
  if (todo !== "") {
    let todoItem = document.createElement("li");
    todoItem.className = "todo-item";
    todosCon.prepend(todoItem);

    let todoDiv = document.createElement("div");
    todoDiv.className = "todo-div";
    todoItem.appendChild(todoDiv);

    let todoTask = document.createElement("p");
    todoTask.textContent = todo;
    todoTask.className = "todo-task";
    todoDiv.appendChild(todoTask);

    let details = document.createElement("i");
    details.className = "details fa-solid fa-circle-info";
    details.title = `Created At: ${new Date().toLocaleString()}`;
    todoDiv.appendChild(details);

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "del-icon fa-solid fa-trash";
    todoDiv.appendChild(deleteIcon);

    totalCount = totalCount + 1;
    tot();
  } else {
    alert("Write should write something!");
  }
}

todosCon.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    if (e.target.classList.toggle("checked")) {
      checkedCount = checkedCount + 1;
    } else {
      checkedCount = checkedCount - 1;
    }
    saveData();
    checked();
  } else if (
    e.target.tagName === "I" &&
    e.target.className.includes("del-icon")
  ) {
    if (e.target.parentElement.parentElement.className.includes("checked")) {
      checkedCount = checkedCount - 1;
      checked();
    }
    e.target.parentElement.parentElement.remove();
    let paraText = e.target.parentElement.children[0].innerText;
    textsList.splice(textsList.indexOf(paraText), 1);
    saveData();
    totalCount = totalCount - 1;
    tot();
  }
  false;
});

addBtn.onclick = function () {
  if (inputText.value === "") {
    alert("You should write something!");
  } else {
    if (textsList.includes(inputText.value.toLowerCase()) === false) {
      textsList.push(inputText.value.toLowerCase().trim());
      addTask(inputText.value.toLowerCase().trim());
      addedMsg.style.visibility = "hidden";
      inputText.value = "";
    } else {
      addedMsg.style.visibility = "visible";
      inputText.value = "";
    }
    saveData();
  }
};

inputText.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    if (inputText.value === "") {
      alert("You should write something!");
    } else {
      if (textsList.includes(inputText.value.toLowerCase()) === false) {
        textsList.push(inputText.value.toLowerCase().trim());
        addTask(inputText.value.toLowerCase().trim());
        addedMsg.style.visibility = "hidden";
        inputText.value = "";
      } else {
        addedMsg.style.visibility = "visible";
        inputText.value = "";
      }
    }
    saveData();
  }
});

function saveData() {
  localStorage.setItem("todosData", todosCon.innerHTML);
}

function showTasks() {
  todosCon.innerHTML = localStorage.getItem("todosData");
  totalCount = document.querySelectorAll("li").length;
  tot();
  checkedCount = document.getElementsByClassName("checked").length;
  checked();
  let res = document.getElementsByClassName("todo-task");
  for (let i of res) {
    textsList.push(i.innerText.toLowerCase());
  }
}
showTasks();

function blast() {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
