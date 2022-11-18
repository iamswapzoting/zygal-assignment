const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const createCalandarObject = function (totalDays, firstDay) {
    const weekDayArr = [false, false, false, false, false, false, false];
    const calandarObject = [[...weekDayArr]];
    let dayIndex = firstDay;
    let weekIndex = 0;
    // for changing weeks
    for (let i = 0; i < totalDays; i++) {
        calandarObject[weekIndex][dayIndex] = i + 1;

        if (dayIndex === 6) {
            calandarObject.push([...weekDayArr]);
            weekIndex += 1;
            dayIndex = 0;
        } else {
            dayIndex += 1;
        }
    }
    return calandarObject;
};

const constructCalanderUI = function (calandar) {
    const dayOfWeeks = days.map(
        (day) => `<div class="day-cell"> ${day.slice(0, 3).toUpperCase()} </div> `
    );

    const weeksInMonth = calandar.map((week) => {
        const dayInWeek = week.map((day) => {
            return `<div id="day-${day ? day : ""}" class="day-cell"> ${day ? `<span> ${day}</span>` : ""
                } </div>`;
        });
        return `
                    <div class="week-row">
                        ${dayInWeek.join("")}
                    </div>
                `;
    });
    weeksInMonth.unshift(`<div class="week-row">${dayOfWeeks.join("")}</div>`);
    let htmlMarkup = weeksInMonth.join("");
    document.getElementById("calander-root").innerHTML = htmlMarkup;
};

const highlightDate = (date) => {
    const highlightSelectedDate = document.getElementById(`day-${date}`);
    if (highlightSelectedDate) {
        if (highlightSelectedDate.className.indexOf("active") > -1) {
            highlightSelectedDate.className += "day-cell";
        } else highlightSelectedDate.className += " active";
    }
};


const changeCalanderMonthYear = function (month, year) {
    const totalDaysInMonth = new Date(year, month, 0).getDate();
    const firstDayInMonth = new Date(year, month - 1, 1).getDay();
    const calander = createCalandarObject(totalDaysInMonth, firstDayInMonth);
    constructCalanderUI(calander);
};

const todaysCalender = () => {
    const monthsOptionsMarkup = months
        .map((month, index) => `<option value="${index + 1}"> ${month} </option>`)
        .join("");

    let yearsOptions = "";
    for (year = 1900; year < 2050; year += 1) {
        yearsOptions += `<option value="${year}">${year}</option>`;
    }
    document.getElementById("year-select").innerHTML = yearsOptions;
    document.getElementById("month-select").innerHTML = monthsOptionsMarkup;

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    document.getElementById("year-select").value = currentYear;
    document.getElementById("month-select").value = currentMonth;
    changeCalanderMonthYear(currentMonth, currentYear);
    highlightDate(currentDate);

    window.selectedMonth = currentMonth;
    window.selectedYear = currentYear;
};



document.getElementById("enter-date-btn").addEventListener("click", () => {
    const dateVal = document.getElementById("date-select").value;
    if (dateVal && !isNaN(dateVal)) {
        highlightDate(dateVal);
    }
});

document.getElementById("month-select").addEventListener("change", (event) => {
    window.selectedMonth = event.target.value;
    changeCalanderMonthYear(window.selectedMonth, window.selectedYear);
});

document.getElementById("year-select").addEventListener("change", (event) => {
    window.selectedYear = event.target.value;
    changeCalanderMonthYear(window.selectedMonth, window.selectedYear);
});


document.getElementById("reset-button").addEventListener("click", (evant)=>{
    todaysCalender();
})

todaysCalender();