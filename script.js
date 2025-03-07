alert('Test: ' + document.cookie + ' ' + document.domain)

const btn = document.querySelector(".image");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  const dayLabel = document.querySelector("label[for='day']");
  const monthLabel = document.querySelector("label[for='month']");
  const yearLabel = document.querySelector("label[for='year']");

  const dayError = document.querySelector(".day-error");
  const monthError = document.querySelector(".month-error");
  const yearError = document.querySelector(".year-error");

  //   Validate Day
  if (day.value.trim() === "") {
    dayLabel.classList.add("error");
    day.classList.add("error-input");
    dayError.innerHTML = "This field is required";
  } else if (day.value.trim() <= 0 || day.value.trim() > 31) {
    dayLabel.classList.add("error");
    day.classList.add("error-input");
    dayError.innerHTML = "Must be a valid day";
  } else {
    dayLabel.classList.remove("error");
    day.classList.remove("error-input");
    dayError.innerHTML = "";
  }

  //   Validate month
  if (month.value.trim() === "") {
    monthLabel.classList.add("error");
    month.classList.add("error-input");
    monthError.innerHTML = "This field is required";
  } else if (month.value.trim() <= 0 || month.value.trim() > 12) {
    monthLabel.classList.add("error");
    month.classList.add("error-input");
    monthError.innerHTML = "Must be a valid month";
  } else {
    monthLabel.classList.remove("error");
    month.classList.remove("error-input");
    monthError.innerHTML = "";
  }

  //   Validate year
  if (year.value.trim() === "") {
    yearLabel.classList.add("error");
    year.classList.add("error-input");
    yearError.innerHTML = "This field is required";
  } else if (year.value.trim() <= 0 || year.value.trim() > 2023) {
    yearLabel.classList.add("error");
    year.classList.add("error-input");
    yearError.innerHTML = "Must be in the past";
  } else {
    yearLabel.classList.remove("error");
    year.classList.remove("error-input");
    yearError.innerHTML = "";
  }

  const addErrors = () => {
    dayLabel.classList.add("error");
    day.classList.add("error-input");
    dayError.innerHTML = "Must be a valid date";

    monthLabel.classList.add("error");
    month.classList.add("error-input");

    yearLabel.classList.add("error");
    year.classList.add("error-input");
  };

  // Validate whole date
  if (
    month.value.trim() == 4 ||
    month.value.trim() == 6 ||
    month.value.trim() == 9 ||
    month.value.trim() == 11
  ) {
    if (day.value.trim() == 31) {
      addErrors();
    }
  } else if (month.value.trim() == 2) {
    if (
      (year.value.trim() % 4 == 0 && year.value.trim() % 100 != 0) ||
      year.value.trim() % 400 == 0
    ) {
      if (day.value.trim() > 29) {
        addErrors();
      }
    } else {
      if (day.value.trim() > 28) {
        addErrors();
      }
    }
  }

  //   Display age
  if (
    dayError.innerHTML === "" &&
    monthError.innerHTML === "" &&
    yearError.innerHTML === ""
  ) {
    const age = calculateAge(
      day.value.trim(),
      month.value.trim(),
      year.value.trim()
    );

    const years = document.querySelector(".years span");
    const months = document.querySelector(".months span");
    const days = document.querySelector(".days span");
    years.style.letterSpacing = "1px";
    months.style.letterSpacing = "1px";
    days.style.letterSpacing = "1px";

    years.style.marginRight = "10px";
    months.style.marginRight = "10px";
    days.style.marginRight = "10px";

    // Function to animate the years
    function animateYears() {
      let i = 0;
      const interval = setInterval(function () {
        if (i <= age.years) {
          years.innerHTML = i;
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Delay between each iteration (in milliseconds)
    }

    // Function to animate the months
    function animateMonths() {
      let i = 0;
      const interval = setInterval(function () {
        if (i <= age.months) {
          months.innerHTML = i;
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Delay between each iteration (in milliseconds)
    }

    // Function to animate the days
    function animateDays() {
      let i = 0;
      const interval = setInterval(function () {
        if (i <= age.days) {
          days.innerHTML = i;
          i++;
        } else {
          clearInterval(interval);
        }
      }, 20); // Delay between each iteration (in milliseconds)
    }

    // Start the animations when the page loads
    animateYears();
    animateMonths();
    animateDays();
  }
});

function calculateAge(birthDay, birthMonth, birthYear) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // JavaScript months are 0-based (0: January, 11: December)
  const currentDay = today.getDate();

  let ageYears = currentYear - birthYear;
  let ageMonths = currentMonth - birthMonth;
  let ageDays = currentDay - birthDay;

  // Adjust for negative ageMonths and ageDays
  if (ageDays < 0) {
    ageMonths--;
    const daysInLastMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();
    ageDays += daysInLastMonth;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
}
