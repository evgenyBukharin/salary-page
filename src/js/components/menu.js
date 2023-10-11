import { Datepicker, DateRangePicker } from "vanillajs-datepicker";

// datepicker global settings
(function () {
	Datepicker.locales.en = {
		days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
		daysShort: ["Вск", "Пон", "Втр", "Ср", "Чт", "Птн", "Сбт"],
		daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		months: [
			"Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь",
		],
		monthsShort: [
			"Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь",
		],
		today: "Сегодня",
		clear: "Очистить",
		titleFormat: "MM yy",
		format: "dd.mm.yyyy",
		weekStart: 0,
	};
})();

const dateInput = document.querySelector(".menu__input-date");
const datePicker = new Datepicker(dateInput, {
	format: "dd.mm.yyyy",
	pickLevel: 1,
});

const navButton = document.querySelector(".menu__button-nav");
const navList = document.querySelector(".menu__list");
if (navButton && navList) {
	navButton.addEventListener("click", (e) => {
		e.stopPropagation();
		navList.classList.toggle("menu__list-visible");
	});
}

document.addEventListener("click", () => {
	if (navList) {
		navList.classList.remove("menu__list-visible");
	}
});
