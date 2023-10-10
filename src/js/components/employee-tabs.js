const track = document.querySelector(".employee__track");
class Tabs {
	constructor(selector, innerElems, starterId) {
		this.selector = selector;
		this.innerElements = innerElems;
		this.starterId = starterId;
		this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
		if (this.tabs) {
			this.tabList = this.tabs.querySelector("." + innerElems.list);
			this.tabsBtns = this.tabList.querySelectorAll("." + innerElems.button);
			this.tabsPanels = this.tabs.querySelectorAll("." + innerElems.panel);
			this.nextButton = document.querySelector("." + innerElems.nextButton);
			this.currentId = 0;
		} else {
			return;
		}
		this.init();
		this.events();
	}
	init() {
		this.tabList.setAttribute("role", "tablist");
		this.tabsBtns.forEach((el, i) => {
			el.setAttribute("role", "tab");
			el.setAttribute("tabindex", "-1");
			el.setAttribute("id", `${this.selector}${i + 1}`);
			el.classList.remove(this.innerElements.button + "-active");
		});
		this.tabsPanels.forEach((el, i) => {
			el.setAttribute("role", "tabpanel");
			el.setAttribute("tabindex", "-1");
			el.setAttribute("aria-labelledby", this.tabsBtns[i].id);
			el.classList.remove(this.innerElements.panel + "-active");
		});
		this.tabsBtns[this.starterId].classList.add(this.innerElements.button + "-active");
		this.tabsBtns[this.starterId].removeAttribute("tabindex");
		this.tabsBtns[this.starterId].setAttribute("aria-selected", "true");
		this.tabsPanels[this.starterId].classList.add(this.innerElements.panel + "-active");
	}
	events() {
		this.tabsBtns.forEach((el, i) => {
			el.addEventListener("click", (e) => {
				this.currentTab = this.tabList.querySelector("[aria-selected]");
				if (e.currentTarget !== this.currentTab) {
					this.switchTabs(e.currentTarget, this.currentTab);
				}
			});
			el.addEventListener("keydown", (e) => {
				let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
				let dir = null;
				if (e.which === 37) {
					dir = index - 1;
				} else if (e.which === 39) {
					dir = index + 1;
				} else if (e.which === 40) {
					dir = "down";
				} else {
					dir = null;
				}
				if (dir !== null) {
					if (dir === "down") {
						this.tabsPanels[i].focus();
					} else if (this.tabsBtns[dir]) {
						this.switchTabs(this.tabsBtns[dir], e.currentTarget);
					}
				}
			});
		});
		if (this.nextButton !== null) {
			this.nextButton.addEventListener("click", () => {
				let nextId = +this.currentId + 1 == 3 ? 0 : (this.currentId = +this.currentId + 1);
				document.querySelector(`[data-id="${nextId}"]`).click();
			});
		}
	}
	switchTabs(newTab, oldTab = this.tabs.querySelector("[aria-selected]")) {
		newTab.focus();
		newTab.removeAttribute("tabindex");
		newTab.setAttribute("aria-selected", "true");
		oldTab.removeAttribute("aria-selected");
		oldTab.setAttribute("tabindex", "-1");
		let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
		let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);
		this.tabsPanels[oldIndex].classList.remove(this.innerElements.panel + "-active");
		this.tabsPanels[index].classList.add(this.innerElements.panel + "-active");
		this.tabsBtns[oldIndex].classList.remove(this.innerElements.button + "-active");
		this.tabsBtns[index].classList.add(this.innerElements.button + "-active");

		this.currentId = newTab.getAttribute("data-id");
		// track anim
		track.style.transform = `translateX(${newTab.getAttribute("data-id") * 100}%)`;
	}
}

const employeeTabs = new Tabs(
	"employeeTabs",
	{
		list: "employee__nav",
		button: "employee__button-tab",
		panel: "employee__panel",
		nextButton: "employee__button",
	},
	0
);
