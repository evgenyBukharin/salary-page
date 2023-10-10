const accordions = document.querySelectorAll(".accordion");
if (accordions) {
	accordions.forEach((el) => {
		const control = el.querySelector(".accordion__control");
		const content = el.querySelector(".accordion__content");
		control.addEventListener("click", () => {
			const self = control.closest(".accordion");

			self.classList.toggle("accordion-open");
			if (self.classList.contains("docs-hero__item")) {
				content.classList.toggle("accordion__content-open-docs");
			} else {
				content.classList.toggle("accordion__content-open");
			}

			if (self.classList.contains("accordion-open")) {
				control.setAttribute("aria-expanded", true);
				content.setAttribute("aria-hidden", false);
				content.style.maxHeight = content.scrollHeight + "px";
			} else {
				control.setAttribute("aria-expanded", false);
				content.setAttribute("aria-hidden", true);
				content.style.maxHeight = null;
			}
		});
	});
}
