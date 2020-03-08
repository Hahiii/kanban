import Ticket from './Ticket.js';
import rerender from './rerender.js';

const addTicket = document.querySelector("#addTask");
const submitTask = document.querySelector("#submit");
const cancelTask = document.querySelector("#cancle");

let tickets;
let taskAdder = document.querySelector("#taskAdder");
let ticket = document.querySelector("textarea");

if (localStorage.getItem("tickets")) {
  tickets = JSON.parse(localStorage.getItem("tickets"))
} else {
  tickets = []
}

ticket.addEventListener("input", () => {
  if (ticket.value.trim() !== "") {
    submitTask.disabled = false;
    submitTask.classList.add("primary");
  } else {
    submitTask.disabled = true;
    submitTask.classList.remove("primary");
  }
}, false)

addTicket.addEventListener("click", openTaskAdder, false);
submitTask.addEventListener("click", submitTicket, false);
cancelTask.addEventListener("click", (e) => {
  e.preventDefault();
  ticket.value = "";
  taskAdder.style.display = "none";
}, false);


function openTaskAdder() {
  taskAdder.style.display = "flex";
}

function submitTicket(event) {
  event.preventDefault();
  if (ticket.value !== "") {
    tickets.push(new Ticket(`${ticket.value}`, false, "to-do"))
    localStorage.setItem("tickets", JSON.stringify(tickets))
  }

  ticket.value = "";
  taskAdder.style.display = "none";
  submitTask.disabled = true;
  submitTask.classList.remove("primary");
  rerender();
}

function updateTickets(data) {
  tickets = data;
  localStorage.setItem("tickets", JSON.stringify(tickets))
  rerender();

}

export {
  updateTickets,
  tickets
}