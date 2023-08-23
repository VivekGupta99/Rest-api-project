const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const itemName = document.getElementById("ItemName").value;
  const description = document.getElementById("description").value;

  const obj = {
    itemName,
    description,
  };

  axios
    .post(
      "https://crudcrud.com/api/8daa1f8997584bb3a46e7218d0efcf8a/todolist",
      obj
    )
    .then((res) => {
      showItemOnScreen(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/8daa1f8997584bb3a46e7218d0efcf8a/todolist")
    .then((res) => {
      res.data.forEach((element) => {
        showItemOnScreen(element);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

function showItemOnScreen(data) {
  const listItem = document.createElement("li");
  listItem.setAttribute("data-item-id", data._id); // Set the _id as a custom attribute

  listItem.innerHTML = `<li id ="list"> <b>ItemName: </b> ${data.itemName} <b>Description: </b>${data.description}
            <button onclick= taskCompleated('${data._id}') style="background-color:green;">Done</button>
            <button onclick= deleteTask('${data._id}') id="delete" style="background-color:red;">Delete</button>
        </li>`;

  todoList.appendChild(listItem);
}

function taskCompleated(itemId) {
  const completedTask = document.getElementById("completedTasks");
  axios
    .get(
      `https://crudcrud.com/api/8daa1f8997584bb3a46e7218d0efcf8a/todolist/${itemId}`
    )
    .then((res) => {
      const newList = document.createElement("li");
      newList.innerHTML = `<li id ="list"> <b>ItemName: </b> ${res.data.itemName} <b>Description: </b>${res.data.description}</li>`;
      completedTask.appendChild(newList);
      //   removeItemFromToDoList(itemId);
    })
    .catch((err) => {
      console.log(err);
    });

  // now I have to delete this from axios because our task is completed
  axios
    .delete(
      `https://crudcrud.com/api/8daa1f8997584bb3a46e7218d0efcf8a/todolist/${itemId}`
    )
    .then((res) => {
      removeItemFromToDoList(itemId); // removed form screen
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeItemFromToDoList(itemId) {
  const itemToBeDeleted = document.querySelector(`[data-item-id="${itemId}"]`);

  if (itemToBeDeleted) {
    todoList.removeChild(itemToBeDeleted);
  }
}

function deleteTask(itemId) {
  axios
    .delete(
      `https://crudcrud.com/api/8daa1f8997584bb3a46e7218d0efcf8a/todolist/${itemId}`
    )
    .then((res) => {
      removeItemFromToDoList(itemId);
    })
    .catch((err) => {
      console.log(err);
    });
}
