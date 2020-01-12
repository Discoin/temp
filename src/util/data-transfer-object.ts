import {APICurrency, APIBot, APIGetManyDTO, APITransaction} from '../types/api';
import {Currency, Bot} from '../types/discoin';

/**
 * Convert an API currency to a regular currency.
 * @param currency API currency to convert
 * @returns The parsed currency
 */
export function apiCurrencyToCurrency(currency: APICurrency): Currency {
	const {value, ...rest} = currency;

	return {...rest, value: parseFloat(value)};
}

/**
 * Convert an API bot to a regular bot.
 * Wrapper around `apiCurrencyToCurrency()`.
 * @param bot The API bot to convert
 */
export function apiBotToBot(bot: APIBot): Bot {
	const {currency, ...rest} = bot;

	return {...rest, currency: apiCurrencyToCurrency(currency)};
}

type GetManyResponse = APIBot[] | APICurrency[] | APITransaction[];

/**
 * Check if a `getMany` response from the API is a DTO.
 * @param getManyResponse The `getMany` response to check
 * @returns Boolean of whether or not the provided response is a DTO
 */
export function getManyResponseIsDTO<T>(
	getManyResponse: GetManyResponse | APIGetManyDTO<T>
): getManyResponse is APIGetManyDTO<T> {
	if (!Array.isArray(getManyResponse) && Object.prototype.hasOwnProperty.call(getManyResponse, 'data')) {
		return true;
	}

	return false;
}
