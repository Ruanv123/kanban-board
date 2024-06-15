const columns = document.querySelectorAll(".column__cards");

let draggedCard;

const saveToLocalStorage = () => {
  const data = Array.from(columns).map((column) => {
    return Array.from(column.querySelectorAll(".card")).map(
      (card) => card.textContent
    );
  });
  localStorage.setItem("cards", JSON.stringify(data));
};

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
    saveToLocalStorage();
  }
};

const createCard = (target, content = "", focus = true) => {
  if (!target.classList.contains("column__cards")) {
    return;
  }

  const card = document.createElement("section");

  card.className = "card";
  card.draggable = true;
  card.contentEditable = true;
  card.textContent = content;

  card.addEventListener("focusout", () => {
    card.contentEditable = false;

    if (!card.textContent) {
      card.remove();
      saveToLocalStorage();
    } else {
      saveToLocalStorage();
    }
  });

  card.addEventListener("dragstart", dragStart);

  target.append(card);
  if (focus) {
    card.focus();
  }
};

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("drop", drop);
  column.addEventListener("dblclick", ({ target }) => createCard(target));
});

window.addEventListener("load", () => {
  let localJsons = localStorage.getItem("cards");
  if (localJsons) {
    localJsons = JSON.parse(localJsons);
    localJsons.forEach((cards, index) => {
      const column = columns[index];
      cards.forEach((cardContent) => {
        createCard(column, cardContent, false);
      });
    });
  }
});
