export const checkUpper = (str) => {
	const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	const symbols = [
		"~",
		"!",
		"@",
		"#",
		"$",
		"%",
		"&",
		"^",
		"*",
		"(",
		")",
		"_",
		"-",
		"+",
		"=",
		"{",
		"[",
		"}",
		"]",
		"<",
		",",
		">",
		"?",
		"/",
	];
	for (let i = 0; i < str.length; i++) {
		if (
			str[i] === str[i].toUpperCase() &&
			!nums.includes(str[i]) &&
			!symbols.includes(str[i])
		) {
			return true;
		}
	}
	return false;
};

export const checkNumber = (str) => {
	const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for (let i = 0; i < str.length; i++) {
		if (nums.includes(str[i])) {
			return true;
		}
	}
	return false;
};

export const checkSymbol = (str) => {
	const symbols = [
		"~",
		"!",
		"@",
		"#",
		"$",
		"%",
		"&",
		"*",
		"^",
		"(",
		")",
		"_",
		"-",
		"+",
		"=",
		"{",
		"[",
		"}",
		"]",
		"<",
		",",
		">",
		"?",
		"/",
	];
	for (let i = 0; i < str.length; i++) {
		if (symbols.includes(str[i])) {
			return true;
		}
	}
	return false;
};
