const filterBtns = document.querySelectorAll(".team__filter");
filterBtns.forEach((button) => {
	button.addEventListener("click", () => {
		button.classList.toggle("team__filter-reversed");
	});
});
