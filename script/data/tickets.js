// import { v4 as uuidv4 } from '../../node_modules/uuid';
import Ticket from './Ticket.js';
import rerender from './rerender.js';

const addTicket = document.querySelector("#addTask");
const submitTask = document.querySelector("#submit");
const cancelTask = document.querySelector("#cancle");

let tickets;
let taskAdder = document.querySelector("#taskAdder");
let ticket = document.querySelector("textarea");
let ticketTitle = document.querySelector("#title");

if (localStorage.getItem("tickets")) {
  tickets = JSON.parse(localStorage.getItem("tickets"))
} else {
  tickets = []
}

ticketTitle.addEventListener("input", () => {
  if (ticketTitle.value.trim() !== "") {
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
  ticketTitle.value = "";
  ticket.value = "";
  submitTask.disabled = true;
  taskAdder.style.display = "none";
}, false);


function openTaskAdder() {
  taskAdder.style.display = "flex";
}

function submitTicket(event) {
  event.preventDefault();
  if (submitTask.innerText === 'Submit') {
    tickets.push(new Ticket(`${ticketTitle.value}`, `${ticket.value}`, false, "to-do", (tickets.length + 1)))
    localStorage.setItem("tickets", JSON.stringify(tickets))
  } else {
    let ticketIndex = submitTask.innerText.split("")[submitTask.innerText.split("").length - 1];
    tickets[Number(ticketIndex) - 1].title = ticketTitle.value;
    tickets[Number(ticketIndex) - 1].text = ticket.value;
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }
  ticket.value = "";
  ticketTitle.value = "";
  taskAdder.style.display = "none";
  submitTask.disabled = true;
  submitTask.innerText = 'Submit';
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