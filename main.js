const my_link_list = [{
    "link": "http://www.spiegel.de",
    "text": "Drück mich, wenn Du Dich traust :-)"
},
{
    "link": "http://www.spiegel.de",
    "text": "Bin der zweite Link - für Tag 2"
},
]

const heute = new Date(); // aktuelles Datum und aktuelle Zeit  

// const calendarButton = document.querySelector(".btn-start");
const calendarContainer = document.querySelector(".container");

const calendarDays = 24;

const openDoor = (path, event) => {
    var pos_of_minus = `${path}`.search('-') + 1
    var day = `${path}`.substring(pos_of_minus)
    if (day > heute.getDate() || true) {

        console.log('door will not open :-)')
        alert("Hey, sei nicht so neugierig!!");
        return
    }

    console.log('day: ' + day)
    event.target.parentNode.style.backgroundImage = `url(${path}.jpg)`;
    event.target.style.opacity = "0";
    event.target.style.backgroundColor = "#521751";

    // Setze URL Link
    // var url_link = JSON.parse(my_link_list);
    my_link = my_link_list[day - 1]
    console.log('my_link: ' + my_link)
    if (my_link != null) {
        event.target.parentNode.innerHTML = my_link_list[day - 1].text.link(my_link_list[day - 1].link);
    }
    // spiele Audio (falls vorhanden)
    var audio = new Audio(`${path}.mp3`);
    audio.play();
}

const createCalendar = () => {
    for (let i = 0; i < calendarDays; i++) {
        const calendarDoor = document.createElement("div");
        const calendarDoorText = document.createElement("div");

        calendarDoor.classList.add("image");
        calendarDoor.style.gridArea = "door" + (i + 1);
        calendarContainer.appendChild(calendarDoor);

        calendarDoorText.classList.add("text");
        calendarDoorText.innerHTML = i + 1;
        calendarDoor.appendChild(calendarDoorText);

        courseNumber = i + 1;
        let coursePath = `./courses/course-${courseNumber}`;

        calendarDoorText.addEventListener("click", openDoor.bind(null, coursePath));
    }
}

// calendarButton.addEventListener("click", createCalendar);

(function autorun() {

    createCalendar(); // autostart this one

})();


