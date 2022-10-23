class PopupCat {
	constructor(className) {
		this._className = className;
		this.popupCat = document.querySelector(`.${className}`);
		this._handleEscPress = this._handleEscPress.bind(this);
	}

	_handleEscPress(event) {
		if (event.key === "Escape") {
			console.log(event.key);
			this.closePopup();
		}
	}

	openPopup() {
		this.popupCat.classList.add("popup__active");
		document.addEventListener("keyup", this._handleEscPress);
	}

	closePopup() {
		this.popupCat.classList.remove("popup__active");
		document.removeEventListener("keyup", this._handleEscPress);
	}

	setEventListener() {
		this.popupCat.addEventListener("click", (event) => {
			if (event.target.classList.contains(this._className) || event.target.closest(".popup__button-close")) {
				this.closePopup()
			}
		})

	}
}