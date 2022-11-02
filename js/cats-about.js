import { createFavRating, printNumerals } from "./utils.js";

export class CatsAbout {
	constructor(
		selectTempl,
		handleEditCatInfoAbout,
		handleFavouriteCat,
		handleCatDelete
	) {
		this._selectTempl = selectTempl;
		this._handleEditCatInfoAbout = handleEditCatInfoAbout;
		this._handleFavouriteCat = handleFavouriteCat;
		this._handleCatDelete = handleCatDelete;
		this._data = {};

	}
	_updateViewFavourLike() {
		if (!this._data.favourite) {
			this.buttonFavour.classList.add('cat-about__favourite_active');
		} else {
			this.buttonFavour.classList.remove('cat-about__favourite_active');
		}
	}
	_setLikeCatCard = () => {
		this._data.favourite = !this._data.favourite;
		this._updateViewFavourLike();
		this._handleFavouriteCat(this._data);
	}
	setData(cardExample) {
		this._cardExample = cardExample;
		this._data = this._cardExample.getData()

		this.catPicture.src = this._data.img_link;
		this.catDescription.textContent = this._data.description;
		this.catName.textContent = this._data.name;
		this.catAge.textContent = this._data.age;
		this.catId.textContent = this._data.id;

		this.catAgeText.textContent = printNumerals(this._data.age, ["год", "года", "лет"])
		this.catRaiting.innerHTML = createFavRating(this._data.rate);

		this._updateViewFavourLike()
	}
	_getTempl() {
		return document.querySelector(this._selectTempl).content.children[0];
	}


	_toggleContentEditeInfo = () => {//переключаем кнопки изменить, сохранить и вводим в режим редактирования
		this.buttonEdite.classList.toggle('cat-about__edite_hidden');
		this.buttonSave.classList.toggle('cat-about__save_hidden');

		this.catDescription.contentEditable = !this.catDescription.isContentEditable;
		this.catName.contentEditable = !this.catName.isContentEditable;
		this.catAge.contentEditable = !this.catAge.isContentEditable;
	}

	_saveDataAboutCat = () => { //  сохранение информации в карточке о коте
		this._toggleContentEditeInfo();
		this._data.name = this.catName.textContent;
		this._data.age = Number(this.catAge.textContent);
		this._data.description = this.catDescription.textContent;

		this._handleEditCatInfoAbout(this._cardExample, this._data)

	}

	getElement() {
		this.element = this._getTempl().cloneNode(true);
		this.buttonEdite = this.element.querySelector(".cat-about__edite");
		this.buttonSave = this.element.querySelector(".cat-about__save");
		this.buttonFavour = this.element.querySelector(".cat-about__favourite");
		this.buttonDelete = this.element.querySelector(".cat-about__delete");
		this.catPicture = this.element.querySelector(".cat-about__image");
		this.catName = this.element.querySelector(".cat-about__name");
		this.catId = this.element.querySelector(".cat-about__id");
		this.catRaiting = this.element.querySelector(".cat-about__rating-cat");
		this.catAge = this.element.querySelector(".cat-about__age-val");
		this.catAgeText = this.element.querySelector(".cat-about__age-text");
		this.catDescription = this.element.querySelector(".cat-about__description");

		this.setEventListener();
		return this.element;
	}
	setEventListener() {
		this.buttonDelete.addEventListener('click', () => this._handleCatDelete(this._cardExample));
		this.buttonEdite.addEventListener('click', this._toggleContentEditeInfo);
		this.buttonSave.addEventListener('click', this._saveDataAboutCat);
		this.buttonFavour.addEventListener('click', this._setLikeCatCard);
	}

}