import { AddressDetail, getPlaceAutocomplete } from './maps-api'

export async function getAutoCompleteDetails(address: string): Promise<AddressDetail[]> {
    const apiKey = process.env.TOMTOM_API_KEY ?? '';
    const countryCode = process.env.TARGET_COUNTRY ?? '';

    return await getPlaceAutocomplete(apiKey, address, countryCode);
}
