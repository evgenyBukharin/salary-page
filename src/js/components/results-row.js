const resultRows = document.querySelectorAll(".res__row");
if (resultRows.length > 0) {
	let activeRow = document.querySelector(".res__row-self");
	resultRows.forEach((row) => {
		row.addEventListener("click", () => {
			if (activeRow !== null) {
				activeRow.classList.remove("res__row-self");
			}
			row.classList.add("res__row-self");
			activeRow = row;
		});
	});
}
