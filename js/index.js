import { api } from "./api.js";
import { CardCat } from "./card.js";
import { CatsAbout } from "./cats-about.js";
import { MAX_LIVE_STORAGE } from "./constants.js";
import { PopupPicture } from "./popup-picture.js";
import { PopupCat } from "./popup.js";
import { setDataUpdate, serializeForm } from "./utils.js";




const cardsBox = document.querySelector(".cards");
const buttonOpenPopup = document.querySelector("#addCat");
const buttonOpenPopupLogin = document.querySelector("#addLogin");
const formNewCat = document.querySelector("#form-cats");
const formLoginAuth = document.querySelector("#form-cat-login");


const addPopupCat = new PopupCat("popup-new-cats");
addPopupCat.setEventListener();

const popupLogin = new PopupCat("popup-login");
popupLogin.setEventListener();

const popupCatAbout = new PopupCat("popup-cat-about");
popupCatAbout.setEventListener();

const popupPicture = new PopupPicture("popup-picture");
popupPicture.setEventListener();

const catsAboutExample = new CatsAbout('#cats-about-templ')
const catsAboutElem = catsAboutExample.getElement()

function createNewCat(dataCat) {
	const cardExample = new CardCat(
		dataCat,
		"#card-templ",
		handleOpenCatTitle,
		handleOpenCatPicture
	);
	const newCardElem = cardExample.getElem();
	cardsBox.append(newCardElem);
}

function handleFormNewCat(e) {
	e.preventDefault();
	const elemsForm = [...formNewCat.elements];
	const dataCatFromForm = serializeForm(elemsForm);

	api.addNewCat(dataCatFromForm)
		.then(() => {
			createNewCat(dataCatFromForm);
			updateLocalStorage(dataCatFromForm, { type: 'ADD_CAT' });
			addPopupCat.closePopup();
		})
}

function handleFormCatLogin(e) {
	e.preventDefault();
	const elemsForm = [...formLoginAuth.elements];
	const dataCatFromForm = serializeForm(elemsForm);
	Cookies.set("email", `email=${dataCatFromForm.email}`);
	buttonOpenPopup.classList.remove("visually-hidden");
	popupLogin.closePopup();

}

function checkLocalStorage() {
	const localData = JSON.parse(localStorage.getItem('cats'));
	const getTimeExpires = localStorage.getItem('catsRefreshData')

	if (localData && localData.length && new Date() < new Date(getTimeExpires)) {
		localData.forEach(function (catData) {
			createNewCat(catData)
		})
	} else {
		api.getAllCats()
			.then(({ data }) => {
				data.forEach(function (catData) {
					createNewCat(catData)
				})
				updateLocalStorage(data, { type: 'ALL_CATS' })


			})
	}
}

function updateLocalStorage(data, actions) {
	const oldStorage = JSON.parse(localStorage.getItem('cats'));

	switch (actions.type) {
		case "ADD_CAT":
			oldStorage.push(data);
			localStorage.setItem('cats', JSON.stringify(oldStorage))
			return;
		case "ALL_CATS":
			localStorage.setItem("cats", JSON.stringify(data))
			setDataUpdate(MAX_LIVE_STORAGE, 'catsUpdateData');
			return;
		case "DELETE_CAT":
			const newStorage = oldStorage.filter(cat => cat.id !== data.id)
			localStorage.setItem("cats", JSON.stringify(newStorage));
			return;

		default:
			break;

	}
}

function handleOpenCatTitle(cardExample) {
	console.log(cardExample)
	catsAboutExample.setData(cardExample)
	popupCatAbout.setContentCat(catsAboutElem)
	popupCatAbout.openPopup()
}

function handleOpenCatPicture(dataCardCat) {
	popupPicture.openPopup(dataCardCat);
}

buttonOpenPopup.addEventListener("click", () => addPopupCat.openPopup());
buttonOpenPopupLogin.addEventListener("click", () => popupLogin.openPopup());
formNewCat.addEventListener("submit", handleFormNewCat);
formLoginAuth.addEventListener("submit", handleFormCatLogin);

const isAuthPerson = Cookies.get("email");

if (!isAuthPerson) {
	popupLogin.openPopup();
	buttonOpenPopup.classList.add("visually-hidden");

}

checkLocalStorage();


