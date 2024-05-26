import axios from 'axios'

export interface PlaceDetail {
    id: string,
    address: AddressDetail
}

export interface AddressDetail {
    placeId: string;
    streetNumber: string;
    streetName: string;
    municipality: string;
    countryCode: string;
    country: string;
    freeformAddress: string;
}

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string, countryCode: string): Promise<AddressDetail[]> {
    const request = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json?countrySet=${countryCode}`, {
        params: {
            key,
            limit: 100,
        }
    });
    if(request.status === 200) {
        return request.data.results.map((result: PlaceDetail) => {
            const details: AddressDetail = {
                placeId: result.id,
                streetNumber: result.address.streetNumber,
                streetName: result.address.streetName,
                municipality: result.address.municipality,
                countryCode: result.address.countryCode,
                country: result.address.country,
                freeformAddress: result.address.freeformAddress,

                //  --- Other Options Included In lieu of future expansion to requirements ---

                // municipalitySubdivision: result.address.municipalitySubdivision,
                // countrySecondarySubdivision: result.address.countrySecondarySubdivision,
                // countryTertiarySubdivision: result.address.countryTertiarySubdivision,
                // countrySubdivision: result.address.countrySubdivision,
                // postalCode: result.address.postalCode,
                // extendedPostalCode: result.address.extendedPostalCode,
                // countryCodeISO3: result.address.countryCodeISO3,
                // countrySubdivisionName: result.address.countrySubdivisionName,
                // localName: result.address.localName,
            };
            return details;
        });
    };
    console.log(`getPlaceAutoComplete Error - Status Code: ${request.status} -`);
    throw Error();
}
