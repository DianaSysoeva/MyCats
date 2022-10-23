class CardCat {
	constructor(dataCat, selectTempl) {
		this._dataCat = dataCat;
		this._selectTempl = selectTempl;
	}
	_getTempl() {
		return document.querySelector(this._selectTempl).content.querySelector(".card");
	}
	getElem() {
		this.elem = this._getTempl().cloneNode(true);
		const cardName = this.elem.querySelector(".card__name");
		const cardPic = this.elem.querySelector(".card__pic");
		const cardLike = this.elem.querySelector(".card__like");

		if (!this._dataCat.favourite) {
			cardLike.remove()
		}
		cardName.textContent = this._dataCat.name;
		cardPic.src = this._dataCat.img_link;

		return this.elem;
	}

}

