export function setDataUpdate(minutes, key) {
	const setTime = new Date(new Date().getTime() + minutes * 60000)
	localStorage.setItem(key, setTime);
	return setTime;
}

export function serializeForm(elems) {
	const formData = {};

	elems.forEach(input => {

		if (input.type === "submit") return;
		if (input.type !== "checkbox") {
			formData[input.name] = input.value;
		};
		if (input.type === "checkbox") {
			formData[input.name] = input.checked;
		};

	})

	return formData;
}

export const printNumerals = (number, titles) => {
	number = Math.abs(number);
	if (Number.isInteger(number)) {
		const cases = [2, 0, 1, 1, 1, 2];
		const text =
			titles[
			number % 100 > 4 && number % 100 < 20
				? 2
				: cases[number % 10 < 5 ? number % 10 : 5]
			];
		return `${text}`;
	}
	return `${titles[1]}`;
};
