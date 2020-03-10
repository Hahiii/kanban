import rerender from './rerender.js';

function showTickets(arr, column) {
  let dragged;
  let selected

  arr.forEach(element => {
    let ticket = document.createElement("p");
    ticket.draggable = false;
    ticket.innerText = element.text;
    ticket.className = element.state;
    ticket.id = element.id;

    if (column.className !== "done") {
      ticket.draggable = true;

      ticket.addEventListener("dragstart", function (event) {
        if (event.target.nodeName === "P") {
          dragged = element
          selected = event.target;
          ticket.style.opacity = .7;
          event.dataTransfer.effectAllowed = "move"
          event.dataTransfer.setData("text", JSON.stringify(dragged));
        }

        if (column.className === "in-progress") {
          column.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae"
          column.parentNode.previousElementSibling.style.backgroundColor = "#a5fdae"

        } else {
          column.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae";
        }
      }, false);


      ticket.addEventListener("dragover", function (event) {
        if (isBefore(selected, event.target)) event.target.parentNode.insertBefore(selected, event.target);
        else event.target.parentNode.insertBefore(selected, event.target.nextSibling);
      }, false);

      ticket.addEventListener("dragend", function (event) {
        selected.style.opacity = 1;
        if (selected.parentNode.childNodes) {
          let columnTickets = selected.parentNode.childNodes;
          let newArr = [];
          for (let i = 0; i < columnTickets.length; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (arr[j].id === columnTickets[i].id) {
                newArr.push(arr[j]);
              };
            }
          }
          localStorage.setItem("tickets", JSON.stringify(newArr))
        }
        selected = null;
      }, false);
    }
    column.appendChild(ticket);
  });
}

function isBefore(el1, el2) {
  let cur
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true;
    }
  } else return false;
}

export default showTickets
