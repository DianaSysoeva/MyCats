

// GET https://sb-cats.herokuapp.com/api/show - отобразить всех котиков
// GET https://sb-cats.herokuapp.com/api/ids - отобразить все возможные айди котиков
// GET https://sb-cats.herokuapp.com/api/show/:id  - отобразить конкретного котика
// POST https://sb-cats.herokuapp.com/api/add - добавить котика
// PUT https://sb-cats.herokuapp.com/api/update/:id - изменить информацию о котике
// DELETE  https://sb-cats.herokuapp.com/api/:id - удалить котика из базы данных



const CONFIG_API = {
	url: 'https://sb-cats.herokuapp.com/api/2/dianasysoeva',
	headers: {
		'Content-type': 'application/json'
	}
}

class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;

	}

	_onRes(response) {
		return response.ok ? response.json() : Promise.reject({ ...response, message: "Ошибка на стороне сервиса" });
	}

	getAllCats() {
		return fetch(`${this._url}/show`, {
			method: "GET"
		}).then(this._onRes)
	}

	addNewCat(data) {
		return fetch(`${this._url}/add`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: this._headers
		}).then(this._onRes)
	}

	updateCatById(idCat, data) {
		fetch(`${this._url}/update/${idCat}`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: this._headers
		})
	}

	getCatById(idCat) {
		fetch(`${this._url}/show/${idCat}`, {
			method: "GET",

		})
	}

	deleteCatById(idCat) {
		fetch(`${this._url}/delete/${idCat}`, {
			method: "DELETE",

		})
	}

}


export const api = new Api(CONFIG_API);
api.getAllCats();

