const my_link_list = [
  {
    link: "https://www.youtube.com/watch?v=rqYjz1kdFrA",
    text: "Nicht ans Fenster klopfen!",
  },
  {
    link: "https://www.youtube.com/watch?v=5AXS_6oSKPs&t=1s",
    text: "Ich bin einfach mit der Gesamtsituation unzufrieden!",
  },
  {
    link: "https://www.youtube.com/watch?v=xW0IR3q0EvE",
    text: "Ich würde dich doch nie über den Tisch ziehen!",
  },
  {
    link: "https://www.youtube.com/watch?v=6evHOltPBh4",
    text: "Das ist eine Kerze, eine sehr schöne Kerze!",
  },
  {
    link: "./links/MVI_0255.AVI",
    text: "Kinderarbeit gehört verboten!",
  },
  {
    link: "https://www.youtube.com/watch?v=tqXzZH31Mbw",
    text: "Oh Tannenbaum...",
  },
  {
    link: "https://www.youtube.com/watch?v=L39ZrJXSjZY",
    text: "Same procedure as every year",
  },
  {
    link: "https://www.youtube.com/watch?v=-ClroBBJtm0",
    text: "Doti stinkt!",
  },
];

const heute = new Date(); // aktuelles Datum und Zeit
const calendarContainer = document.querySelector(".container");
const calendarDays = 24;

// Modal-Element erstellen
const modal = document.createElement("div");
modal.id = "imageModal";
modal.style.display = "none"; // Anfangs ausgeblendet
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
modal.style.zIndex = "1000";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
document.body.appendChild(modal);

const modalImage = document.createElement("img");
modalImage.style.maxWidth = "90%";
modalImage.style.maxHeight = "80%";
modalImage.style.border = "5px solid white";
modal.appendChild(modalImage);

const closeModalButton = document.createElement("span");
closeModalButton.innerHTML = "✖";
closeModalButton.style.position = "absolute";
closeModalButton.style.top = "10px";
closeModalButton.style.right = "20px";
closeModalButton.style.fontSize = "2rem";
closeModalButton.style.color = "white";
closeModalButton.style.cursor = "pointer";
modal.appendChild(closeModalButton);

// Modal schließen
const closeModal = () => {
  modal.style.display = "none";
  modalImage.src = ""; // Bild zurücksetzen
};

closeModalButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const openDoor = (path, event) => {
  const day = parseInt(path.split("-").pop(), 10);

  // Tür nur öffnen, wenn das Datum gültig ist
  if (day > heute.getDate() || heute.getMonth() < 11) {
    alert("Hey, sei nicht so neugierig!!");
    return;
  }

  // Zeige das Bild hinter der Tür
  event.target.parentNode.style.backgroundImage = `url(${path}.jpg)`;
  event.target.style.opacity = "0";
  event.target.style.backgroundColor = "#521751";

  // Setze URL und Text, falls vorhanden
  const my_link = my_link_list[day - 1];
  if (my_link) {
    const linkElement = document.createElement("a");
    linkElement.href = my_link.link;
  }

  // Spiele Audio ab, falls verfügbar
  const audio = new Audio(`${path}.mp3`);
  audio
    .play()
    .catch((err) => console.warn("Audio konnte nicht abgespielt werden:", err));

  // Modal öffnen und Bild anzeigen
  modalImage.src = `${path}.jpg`;
  modal.style.display = "flex";

  // Entferne vorherige Links im Modal
  const existingLink = modal.querySelector("a");
  if (existingLink) {
    existingLink.remove(); // Entfernt den Link, wenn bereits einer vorhanden ist
  }

  // Füge den Link auch im Modal hinzu
  const modalLink = document.createElement("a");
  modalLink.target = "_blank";
  modalLink.href = my_link.link;
  modalLink.innerText = my_link.text;

  // Füge das Bild und den neuen Link zum Modal hinzu
  modal.appendChild(modalImage); // Füge das Bild wieder hinzu
  modal.appendChild(modalLink); // Füge den Link zum Modal hinzu
};

const createCalendar = () => {
  for (let i = 0; i < calendarDays; i++) {
    const dayNumber = i + 1;

    // Erstelle die Tür und ihren Text
    const calendarDoor = document.createElement("div");
    const calendarDoorText = document.createElement("div");

    calendarDoor.classList.add("image");
    calendarDoor.style.gridArea = `door${dayNumber}`;
    calendarContainer.appendChild(calendarDoor);

    calendarDoorText.classList.add("text");
    calendarDoorText.innerHTML = dayNumber;
    calendarDoor.appendChild(calendarDoorText);

    const coursePath = `./courses/course-${dayNumber}`;

    // Füge Event-Listener hinzu
    calendarDoorText.addEventListener("click", (event) =>
      openDoor(coursePath, event)
    );
  }
};

// Initialisiere den Kalender automatisch
(function autorun() {
  createCalendar();
})();
