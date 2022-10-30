export class CardCat {
	constructor(dataCat, selectTempl, handleOpenCatTitle, handleOpenCatPicture) {
		this._dataCat = dataCat;
		this._handleOpenCatTitle = handleOpenCatTitle;
		this._handleOpenCatPicture = handleOpenCatPicture;
		this._selectTempl = selectTempl;
	}
	_getTempl() {
		return document.querySelector(this._selectTempl).content.querySelector(".card");
	}
	getElem() {
		this.elem = this._getTempl().cloneNode(true);
		this.cardName = this.elem.querySelector(".card__name");
		this.cardPic = this.elem.querySelector(".card__pic");
		this.cardLike = this.elem.querySelector(".card__like");

		if (!this._dataCat.favourite) {
			this.cardLike.remove()
		}
		this.cardName.textContent = this._dataCat.name;
		this.cardPic.src = this._dataCat.img_link;
		this.setEventListener();
		return this.elem;
	}

	getData() {
		return this._dataCat;
	}
	getIdCat() {
		return this._dataCat._id;
	}

	setData(freshData) {
		this._data = freshData;
	}
	deleteViewCard() {
		this.element.remove();
		this.element = null;
	}

	setEventListener() {
		this.cardName.addEventListener('click', () => this._handleOpenCatTitle(this))
		this.cardPic.addEventListener('click', () => this._handleOpenCatPicture(this._dataCat))
	}
}

