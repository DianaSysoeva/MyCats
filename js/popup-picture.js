import { PopupCat } from "./popup.js";

// наследуется класс от попапа
export class PopupPicture extends PopupCat {
	constructor(className) {
		super(className)
	}


	openPopup(dataCat) {

		const picturePopup = this.popupCat.querySelector('.popup__picture');
		picturePopup.src = dataCat.img_link;
		super.openPopup()
	}



}