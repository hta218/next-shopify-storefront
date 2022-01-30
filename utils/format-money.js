export const formatMoney = (cents, format) => {
	if (typeof cents === 'string') {
		cents = cents.replace('.', '');
	}
	var value = '';
	var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
	var formatString = format || '${{amount}}';

	function formatWithDelimiters(number) {
		var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
		var thousands = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
		var decimal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

		if (isNaN(number) || number == null) {
			return 0;
		}

		number = (number / 100.0).toFixed(precision);

		var parts = number.split('.');
		var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
		var centsAmount = parts[1] ? decimal + parts[1] : '';

		return dollarsAmount + centsAmount;
	}

	switch (formatString.match(placeholderRegex)[1]) {
		case 'amount':
			value = formatWithDelimiters(cents, 2);
			break;
		case 'amount_no_decimals':
			value = formatWithDelimiters(cents, 0);
			break;
		case 'amount_with_comma_separator':
			value = formatWithDelimiters(cents, 2, '.', ',');
			break;
		case 'amount_no_decimals_with_comma_separator':
			value = formatWithDelimiters(cents, 0, '.', ',');
			break;
	}

	return formatString.replace(placeholderRegex, value);
}
