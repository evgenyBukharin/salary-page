const defaltActiveRow = 5;
const panels = document.querySelectorAll(".employee__panel");

if (panels.length > 0) {
	panels.forEach((panel, idx) => {
		const rows = panel.querySelectorAll(".accordion__content .employee__row");
		rows.forEach((row) => {
			// по умолчанию активный столбец
			row.querySelector(`.employee__col-${defaltActiveRow}`).classList.add("employee__col-mark-active");

			let markCells = row.querySelectorAll(".employee__col-mark");
			let activeCell = row.querySelector(".employee__col-mark-active");
			markCells.forEach((cell) => {
				cell.addEventListener("click", () => {
					activeCell.classList.remove("employee__col-mark-active");
					cell.classList.add("employee__col-mark-active");
					activeCell = cell;
				});
			});
		});
	});
}
