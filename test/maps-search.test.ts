import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutocomplete } from '../src/maps-api';
import { getAutoCompleteDetails } from '../src'

config();

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it ('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street');
            expect(res).toBeInstanceOf(Promise);
        })

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street');
            const firstRes = res[0];
            expect(firstRes).toHaveProperty('placeId');
            expect(firstRes).toHaveProperty('streetNumber');
            expect(firstRes).toHaveProperty('countryCode');
            expect(firstRes).toHaveProperty('country');
            expect(firstRes).toHaveProperty('freeformAddress');
            expect(firstRes).toHaveProperty('municipality');
        })

        it('fetches only from AU', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street');
            res.forEach((result) => expect(result.countryCode).toEqual('AU'));
        })
    })

    describe('getPlaceAutoComplete', () => {
        const apiKey = process.env.TOMTOM_API_KEY ?? '';
        const countryCode = process.env.TARGET_COUNTRY ?? '';

        it('handles no results', async () => {
            const res = await getPlaceAutocomplete(apiKey, 'asfasffasfasafsafs', countryCode);
            expect(res).toStrictEqual([]);
        })

        it('handles api error', async () => {
            expect(getPlaceAutocomplete('', 'Charlotte Street', countryCode)).rejects.toThrow();
        })

        it('handles error', async () => {
            expect(getPlaceAutocomplete(apiKey, '', countryCode)).rejects.toThrow();
        })
    })
})
