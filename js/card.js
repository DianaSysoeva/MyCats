export class CardCat {
	constructor(dataCat, selectTempl, handleOpenCatTitle, handleOpenCatPicture, handleFavouriteCat) {
		this._dataCat = dataCat;
		this._handleOpenCatTitle = handleOpenCatTitle;
		this._handleOpenCatPicture = handleOpenCatPicture;
		this._selectTempl = selectTempl;
		this._handleFavouriteCat = handleFavouriteCat;
	}
	_getTempl() {
		return document.querySelector(this._selectTempl).content.querySelector(".card");
	}

	_updateViewFavourLike() {
		if (this._dataCat.favourite) {
			this.cardLike.classList.add('card__like_active');
		} else {
			this.cardLike.classList.remove('card__like_active');
		}
	}
	_setLikeCatCard = () => {
		this._dataCat.favourite = !this._dataCat.favourite;
		this._handleFavouriteCat(this._dataCat, this);
	}
	getElem() {
		this.elem = this._getTempl().cloneNode(true);
		this.cardName = this.elem.querySelector(".card__name");
		this.cardPic = this.elem.querySelector(".card__pic");
		this.cardLike = this.elem.querySelector(".card__like");

		this.updateViewCard();
		this.setEventListener();
		return this.elem;
	}

	getData() {
		return this._dataCat;
	}
	getIdCat() {
		return this._dataCat.id;
	}

	setData(freshData) {
		this._dataCat = freshData;
	}

	updateViewCard() {
		this.cardName.textContent = this._dataCat.name;
		this.cardPic.src = this._dataCat.img_link;
		this._updateViewFavourLike();
		this._handleFavouriteCat(this._dataCat, this);
	}


	deleteViewCard() {
		this.elem.remove();
		this.elem = null;
	}

	setEventListener() {
		this.cardName.addEventListener('click', () => this._handleOpenCatTitle(this))
		this.cardPic.addEventListener('click', () => this._handleOpenCatPicture(this._dataCat))
		this.cardLike.addEventListener('click', this._setLikeCatCard)
	}
}

