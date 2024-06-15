const colums = document.querySelectorAll(".column__cards");
const cards = document.querySelectorAll(".card");

let draggedCard;

const dragStart = (ev) => {
  draggedCard = ev.target;
  ev.dataTransfer.effectAllowed = "move";
};

const dragOver = (ev) => {
  ev.preventDefault();
};
const dragEnter = ({ target }) => {
  if (target.classList.contains("column__cards")) {
    target.classList.add("column--highlight");
  }
};

const dragLeave = ({ target }) => {
  target.classList.remove("column--highlight");
};

const drop = ({ target }) => {
  if (target.classList.contains("column__cards")) {
    target.classList.remove("column--highlight");
    target.append(draggedCard);
  }
};

const createCard = ({ target }) => {
  if (!target.classList.contains("column__cards")) {
    return;
  }

  const card = document.createElement("section");

  card.className = "card";
  card.draggable = true;
  card.contentEditable = true;

  card.addEventListener("focusout", () => {
    card.contentEditable = false;

    if (!card.textContent) {
      card.remove();
    }
  });

  card.addEventListener("dragstart", dragStart);

  target.append(card);
  card.focus();
};

colums.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", drop);
  column.addEventListener("dblclick", createCard);
});

cards.forEach((card) => {
  card.addEventListener("dragstart", dragStart);
});
