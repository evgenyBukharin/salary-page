export function makeHovers() {
	const employee = document.querySelectorAll(".hero__col-employee");
	const salary = document.querySelectorAll(".hero__col-salary");
	const salaryOfficial = document.querySelectorAll(".hero__col-salary-official");
	const stopped = document.querySelectorAll(".hero__col-stopped");
	const prepaid = document.querySelectorAll(".hero__col-prepaid");
	const toBePaid = document.querySelectorAll(".hero__col-toBePaid");
	const bonus = document.querySelectorAll(".hero__col-bonus");
	const summ = document.querySelectorAll(".hero__col-summ");
	const medical = document.querySelectorAll(".hero__col-medical");
	const vacation = document.querySelectorAll(".hero__col-vacation");
	const date = document.querySelectorAll(".hero__col-date");

	const cols = [employee, salary, salaryOfficial, stopped, prepaid, toBePaid, bonus, summ, medical, vacation, date];

	for (let i = 0; i < cols.length; i++) {
		cols[i].forEach((hoverElement) => {
			hoverElement.onmouseenter = () => {
				cols[i].forEach((el) => {
					el.classList.add("hero__cell-hovered");
				});
				if (cols[i - 1]) {
					cols[i - 1][0].classList.add("hero__cell-header-hide-after");
				}
				if (cols[i]) {
					cols[i][0].classList.add("hero__cell-header-hide-after");
				}
			};
			hoverElement.onmouseleave = () => {
				cols[i].forEach((el) => {
					el.classList.remove("hero__cell-hovered");
				});
				if (cols[i - 1]) {
					cols[i - 1][0].classList.remove("hero__cell-header-hide-after");
				}
				if (cols[i]) {
					cols[i][0].classList.remove("hero__cell-header-hide-after");
				}
			};
		});
	}
}
