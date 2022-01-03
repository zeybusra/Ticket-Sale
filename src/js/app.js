// PARAMETERS
let seats = document.querySelectorAll(".seat.selectable");
const container = document.getElementById("container");
let movieSelection = document.querySelector("#movie");
const count = document.querySelector("#count")
const amount = document.querySelector("#amount")
const button = document.getElementById("button");

// console.log(movieType);


// LISTENERS

container.addEventListener("click", selectSeats);
button.addEventListener("click", sold);
// movieType.addEventListener("change", movieChange);

// FUNCTIONS

function selectSeats(e) {
    if (e.target.classList.contains("seat") && e.target.classList.contains("selectable") && (!e.target.classList.contains("reserved") && (!e.target.classList.contains("selected")))) {
             e.target.classList.add("selected");
    } else if (e.target.classList.contains("seat") && e.target.classList.contains("selectable") && (!e.target.classList.contains("reserved") && (e.target.classList.contains("selected")))) {
        e.target.classList.remove("selected");
    }
    totalPrice();
    setLocalStorage();
}

function totalPrice() {
    const selectedSeats = document.querySelectorAll(".seat.selectable.selected");
    count.textContent = (selectedSeats.length);
    amount.textContent = 20 * (selectedSeats.length);
}

function sold() {
    const selectedSeats = document.querySelectorAll(".seat.selectable.selected");
    selectedSeats.forEach(seatElement => {seatElement.classList.add("reserved"); seatElement.classList.remove("selected")});

    setLocalStorage();
    totalPrice();
}

function setLocalStorage() {

    // FOR RESERVED SEATS

    seats = [...seats];
    let reservedSeatInfo = [];
    const reserveds = document.querySelectorAll(".selectable.reserved");

    reserveds.forEach(reserved => {
        // var index = [].indexOf.call(seats, reserved);
        var index = seats.indexOf(reserved);
        if (index > -1) {
            if (!reservedSeatInfo.includes(index)) {
                reservedSeatInfo.push(index);
            }
        }
    });

    // FOR SELECTED SEATS
    let selectedSeatInfo = [];
    const selectedSeatsValue = document.querySelectorAll(".selectable.selected")
    selectedSeatsValue.forEach(selected => {
        var index = seats.indexOf(selected);
        if (index > -1) {
            if (!selectedSeatInfo.includes(index)) {
                selectedSeatInfo.push(index);
            }
        }
    });

    localStorage.setItem("reservedSeats" + movieSelection.value, JSON.stringify(reservedSeatInfo));

    localStorage.setItem("selectedSeats" + movieSelection.value, JSON.stringify(selectedSeatInfo));
}

function loadScreen() {

    const reservedSeatInfo = JSON.parse(localStorage.getItem("reservedSeats" + movieSelection.value));
    const selectedSeatInfo = JSON.parse(localStorage.getItem("selectedSeats" + movieSelection.value));

    // LOCALDAN ALMA RESERVED
    if (reservedSeatInfo) {
        reservedSeatInfo.forEach(seat => {
            if ((!seats[seat].classList.contains("reserved")) && (!seats[seat].classList.contains("selected"))) {
                seats[seat].classList.add("reserved");
            }
        });
    }


    // LOCALDAN ALMA SELECTED
    if (selectedSeatInfo) {
        selectedSeatInfo.forEach(seat => {
            if ((!seats[seat].classList.contains("reserved")) && (!seats[seat].classList.contains("selected"))) {
                seats[seat].classList.add("selected");
            }
        });
    }

    seats.forEach((eachSeat, seatNumber) => {
        eachSeat.textContent = seatNumber + 1;
    })
}

loadScreen();


movieSelection.addEventListener("change",movieChange);

function movieChange (e) {

    const reservedsRemove = document.querySelectorAll(".selectable.reserved");
    reservedsRemove.forEach(reservedSeatRemove =>{
        reservedSeatRemove.classList.remove("reserved");
    })

    const selectedRemove = document.querySelectorAll(".selectable.selected");
    selectedRemove.forEach(selectedSeatRemove =>{
        selectedSeatRemove.classList.remove("selected");
    })

    const reservedSeatInfo = JSON.parse(localStorage.getItem("reservedSeats"+ e.target.value));
    if (reservedSeatInfo) {
        reservedSeatInfo.forEach(seat => {
            if (!seats[seat].classList.contains("reserved")) {
                seats[seat].classList.add("reserved");
            }
        });
    }

    const selectedSeatInfo = JSON.parse(localStorage.getItem("selectedSeats"+ e.target.value));
    if (selectedSeatInfo) {
        selectedSeatInfo.forEach(seat => {
            if (!seats[seat].classList.contains("selected")) {
                seats[seat].classList.add("selected");
            }
        });
    }
}

