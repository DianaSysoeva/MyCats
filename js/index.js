const cardsBox = document.querySelector(".cards");
const buttonOpenPopup = document.querySelector("#addCat");
const formNewCat = document.querySelector("#form-cats");

function serializeForm(elems){
	const formData = {};

	elems.forEach(input => {

	if(input.type === "submit") return;
	if(input.type !== "checkbox") {
		formData[input.name] = input.value;
		};
	if(input.type === "checkbox") {
		formData[input.name] = input.checked;
		};

	})

	return formData;
}


// console.log(elemsForm);

function handleFormNewCat(e){
	e.preventDefault();
	const elemsForm = [...formNewCat.elements];
	const dataCatFromForm = serializeForm(elemsForm);

	const cardExample = new CardCat(dataCatFromForm, "#card-templ");
	const newCardElem = cardExample.getElem();
	cardsBox.append(newCardElem);

	addPopupCat.closePopup();
}

	//собрать данные из форма
	//создать карточку из данных
	//добавить карточку на страницу

	

cats.forEach(function (catData) {
	const cardExample = new CardCat(catData, "#card-templ");
	const newCardElem = cardExample.getElem();
	cardsBox.append(newCardElem);

})

const addPopupCat = new PopupCat("popup-new-cats");
addPopupCat.setEventListener();

buttonOpenPopup.addEventListener("click", () => addPopupCat.openPopup());
formNewCat.addEventListener("submit", handleFormNewCat);
console.log(addPopupCat);






