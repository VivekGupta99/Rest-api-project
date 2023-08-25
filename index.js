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
      "https://crudcrud.com/api/84052a90abad4d599f68ba185d9a5a4e/todolist",
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
    .get("https://crudcrud.com/api/84052a90abad4d599f68ba185d9a5a4e/todolist")
    .then((res) => {
      res.data.forEach((element) => {
        showItemOnScreen(element);
      });

      axios
        .get(
          "https://crudcrud.com/api/84052a90abad4d599f68ba185d9a5a4e/completedTasks"
        )
        .then((completedRes) => {
          completedRes.data.forEach((data) => {
            showItemOnCompletedTasks(data);
          });
        })
        .catch((err) => {
          console.log(err);
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
  // console.log(itemId);
  axios
    .get(
      `https://crudcrud.com/api/84052a90abad4d599f68ba185d9a5a4e/todolist/${itemId}`
    )
    .then((res) => {
      config = {
        method: "POST",
        url: "https://crudcrud.com/api/84052a90abad4d599f68ba185d9a5a4e/completedTasks",
        data: {
          itemName: res.data.itemName,
          description: res.data.description,
        },
      };
      axios(config).then((res) => {
        // console.log(res.data);
        showItemOnCompletedTasks(res.data);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // now I have to delete this from axios because our task is completed
  axios
    .delete(
      `https://crudcrud.com/api/84052a90abad4d599f68ba185d9a5a4e/todolist/${itemId}`
    )
    .then((res) => {
      removeItemFromToDoList(itemId); // removed form screen
    })
    .catch((err) => {
      console.log(err);
    });
}

function showItemOnCompletedTasks(data) {
  const completedTask = document.getElementById("completedTasks");
  const item = document.createElement("li");
  item.innerHTML = `<li id ="list"> <b>ItemName: </b> ${data.itemName} <b>Description: </b>${data.description}`;
  completedTask.appendChild(item);
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
      `https://crudcrud.com/api/84052a90abad4d599f68ba185d9a5a4e/todolist/${itemId}`
    )
    .then((res) => {
      removeItemFromToDoList(itemId);
    })
    .catch((err) => {
      console.log(err);
    });
}
