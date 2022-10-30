export class CatsAbout {
	constructor(
		selectTempl,
		handleEditCatInfoAbout,
		handleFavouriteCat,
		handleDeleteCat
	) {
		this._selectTempl = selectTempl;
		this._handleEditCatInfoAbout = handleEditCatInfoAbout;
		this._handleFavouriteCat = handleFavouriteCat;
		this._handleDeleteCat = handleDeleteCat;
		this._data = {};

	}

	setData(cardExample) {
		this._cardExample = cardExample;
		this._data = this._cardExample.getData()

		this.catPicture.src = this._data.img_link;
		this.catDesc.textContent = this._data.description;
		this.catName.textContent = this._data.name;
		this.catAgeText.textContent = this._data.age;
		this.catId.textContent = this._data.id;
		console.log(this._data);
	}

	_getTempl() {
		return document.querySelector(this._selectTempl).content.children[0];
	}

	getElement() {
		this.element = this._getTempl().cloneNode(true);
		this.buttonEdit = this.element.querySelector(".cat-about__edit");
		this.buttonSave = this.element.querySelector(".cat-about__save");
		this.buttonFavour = this.element.querySelector(".cat-about__favourite-like");
		this.buttonDelete = this.element.querySelector(".cat-about__delete");
		this.catPicture = this.element.querySelector(".cat-about__image");
		this.catName = this.element.querySelector(".cat-about__name");
		this.catId = this.element.querySelector(".cat-about__id");
		this.catRaiting = this.element.querySelector(".cat-about__rating");
		this.catAgeVal = this.element.querySelector(".cat-about__age-val");
		this.catAgeText = this.element.querySelector(".cat-about__age-text");
		this.catDesc = this.element.querySelector(".cat-about__desc");

		this.setEventListener();
		return this.element;
	}
	setEventListener() {

	}


}