import axios from "axios";
import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
Swiper.use([Navigation, Pagination, Thumbs]);

import { makeHovers } from "./index-hovers";

let sliderData = [];

if (document.querySelector(".hero")) {
	axios
		.get("http://localhost:3000/salaryData")
		.then((r) => {
			sliderData = r.data;
			makeSlider();
			makeHovers();
			hideLoader();
		})
		.catch((e) => {
			console.log(e);
			showError(e.message);
		});
}

function makeSlider() {
	// верстка внутреннего элемента списка
	const heroItemInner = `
		<div class="hero__cell hero__cell-employee hero__col-employee">
		<div class="hero__container-employee">
			<img
				src="./img/hero-avatar.png"
				class="image hero__avatar"
				width="35"
				height="35"
				alt="Аватар"
			/>
			<div class="hero__column">
				<h4 class="hero__name">Саночкин Олег / вн 249</h4>
				<h5 class="hero__job">Менеджер проектов</h5>
			</div>
		</div>
		<div class="hero__container-status">
			<div class="hero__status hero__status-green"></div>
			<div class="hero__status hero__status-blue"></div>
		</div>
		</div>
		<div class="hero__cell hero__col-salary">30 000</div>
		<div class="hero__cell hero__col-salary-official">30 000</div>
		<div class="hero__cell hero__col-stopped">5 500</div>
		<div class="hero__cell hero__col-prepaid">12 500</div>
		<div class="hero__cell hero__col-toBePaid">35 500</div>
		<div class="hero__cell hero__col-bonus">20 000</div>
		<div class="hero__cell hero__col-summ">55 550</div>
		<div class="hero__cell hero__col-notsure">55 550</div>
		<div class="hero__cell hero__col-medical">55 550</div>
		<div class="hero__cell hero__col-vacation">55 550</div>
		<div class="hero__cell hero__cell-date hero__col-date">
			<button class="btn-reset hero__button-date hero__button-date-save">Сохранить</button>
			<button class="btn-reset hero__button-date hero__button-date-auto">Авто</button>
			<button class="btn-reset hero__button-date hero__button-date-red">О</button>
		</div>
	`;

	const sliderWrapper = document.querySelector(`.hero__wrapper`);
	const formattedData = [];

	// получаем гет параметр
	const urlParams = new URLSearchParams(window.location.search);
	let chunkSize = 8;
	if (urlParams.get("chunkSize") !== null) {
		chunkSize = +urlParams.get("chunkSize");
	}

	const select = document.querySelector(".hero__select");
	let selectOptions = [5, 8, 10, 15];
	if (!selectOptions.includes(chunkSize)) {
		selectOptions.push(chunkSize);
		selectOptions.sort((a, b) => a - b);
	}
	[...new Set(selectOptions)].forEach((option) => {
		let optionEl = document.createElement("option");
		optionEl.setAttribute("value", option);
		optionEl.innerHTML = option;
		select.appendChild(optionEl);
	});
	select.value = chunkSize;

	for (let i = 0; i < sliderData.length; i += chunkSize) {
		const chunk = sliderData.slice(i, i + chunkSize);
		formattedData.push(chunk);
	}

	formattedData.forEach((array) => {
		// создаем новый слайд
		let heroSlide = document.createElement("div");
		heroSlide.classList = `swiper-slide hero__slide`;
		array.forEach((row) => {
			// создем новый айтем
			let heroItem = document.createElement("div");
			heroItem.classList = "hero__row";
			heroItem.innerHTML = heroItemInner;

			// изменяем контент внутри
			heroItem.querySelector(".hero__avatar").setAttribute("src", row.user.avatar);
			heroItem.querySelector(".hero__name").innerHTML = row.user.name;
			heroItem.querySelector(".hero__job").innerHTML = row.user.job;
			if (row.statuses.grade) {
				heroItem.querySelector(".hero__status-green").innerHTML = row.statuses.grade;
				heroItem.querySelector(".hero__status-blue").remove();
			} else {
				heroItem.querySelector(".hero__status-blue").innerHTML = row.statuses.employment;
				heroItem.querySelector(".hero__status-green").remove();
			}
			heroItem.querySelector(".hero__col-salary").innerHTML = row.money.salary;
			heroItem.querySelector(".hero__col-salary-official").innerHTML = row.money.salaryOfficial;
			heroItem.querySelector(".hero__col-stopped").innerHTML = row.money.stopped;
			heroItem.querySelector(".hero__col-prepaid").innerHTML = row.money.prepaid;
			heroItem.querySelector(".hero__col-toBePaid").innerHTML = row.money.toBePaid;
			heroItem.querySelector(".hero__col-bonus").innerHTML = row.money.bonus;
			heroItem.querySelector(".hero__col-summ").innerHTML = row.money.summ;
			heroItem.querySelector(".hero__col-notsure").innerHTML = row.money.notsure;
			heroItem.querySelector(".hero__col-medical").innerHTML = row.money.medical;
			heroItem.querySelector(".hero__col-vacation").innerHTML = row.money.vacation;

			// засовываем в лист
			heroSlide.appendChild(heroItem);
		});
		sliderWrapper.appendChild(heroSlide);
	});

	const sliderBullets = new Swiper(document.querySelector(`.hero__container-slider-bullets`), {
		slidesPerView: 3,
		speed: 500,
		spaceBetween: 0,
	});

	const slider = new Swiper(document.querySelector(`.hero__slider`), {
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 500,
		pagination: {
			el: ".hero__pagination",
			clickable: true,
			bulletActiveClass: "hero__bullet-active",
			renderBullet: function (index, className) {
				return `<span class="swiper-slide hero__bullet ${className}">${index + 1}</span>`;
			},
		},
		navigation: {
			nextEl: ".hero__button-next",
			prevEl: ".hero__button-prev",
		},
		thumbs: {
			swiper: sliderBullets,
		},
	});

	// общее количество
	// const allCountSpan = document.querySelector(".hero__text-all-value");
	// allCountSpan.innerHTML = sliderData.length;

	// 1 page span
	const textContainer = document.querySelector(".hero__text-page");
	const onePageSpan = document.querySelector(".hero__text-page-1");
	const footerButtons = document.querySelectorAll(".hero__button-control");
	if (formattedData.length == 1) {
		footerButtons.forEach((btn) => {
			btn.style.display = "none";
		});
		onePageSpan.style.marginRight = "0";
		onePageSpan.classList.remove("hero__text-page-hidden");
		textContainer.style.marginRight = "0";
	}

	// проверка на наличие последнего ряда без нижней границы
	let lastSlideRows = document.querySelectorAll(".hero__slide:last-child .hero__row");
	if (lastSlideRows.length !== chunkSize) {
		lastSlideRows[lastSlideRows.length - 1].style.boxShadow =
			"0 -1px 0 var(--hero-border-color), 0 1px 0 var(--hero-border-color)";
	}

	// обработчик кнопки "последняя"
	const lastButton = document.querySelector(".hero__button-last");
	lastButton.addEventListener("click", () => {
		slider.slideTo(formattedData.length - 1, 1000);
	});
}

// loader
const loader = document.querySelector(".loader");
const loaderTitle = document.querySelector(".loader__title");
const loaderSpinner = document.querySelector(".loader__spinner");
const loaderButton = document.querySelector(".loader__button");

function hideLoader() {
	loader.classList.add("loader-hidden");
}

function showError(errorText) {
	loaderTitle.innerHTML = errorText;
	loaderSpinner.style.animationPlayState = "paused";
	loaderButton.classList.add("loader__button-visible");
}

if (loaderButton) {
	loaderButton.addEventListener("click", () => {
		hideLoader();
	});
}
