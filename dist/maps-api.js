"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaceAutocomplete = void 0;
const axios_1 = __importDefault(require("axios"));
// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
function getPlaceAutocomplete(key, address, countryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const autocomplete = yield axios_1.default.get(`https://api.tomtom.com/search/2/search/${address}.json&countrySet=${countryCode}'`, {
            params: {
                key,
                limit: 100,
            }
        });
        return autocomplete.data.results.map((result) => {
            if (result.address.countryCode === 'AU') {
                return {
                    placeId: result.id,
                    streetNumber: result.address.streetNumber,
                    streetName: result.address.streetName,
                    // municipalitySubdivision: result.address.municipalitySubdivision,
                    municipality: result.address.municipality,
                    // countrySecondarySubdivision: result.address.countrySecondarySubdivision,
                    // countryTertiarySubdivision: result.address.countryTertiarySubdivision,
                    // countrySubdivision: result.address.countrySubdivision,
                    // postalCode: result.address.postalCode,
                    // extendedPostalCode: result.address.extendedPostalCode,
                    countryCode: result.address.countryCode,
                    country: result.address.country,
                    // countryCodeISO3: result.address.countryCodeISO3,
                    freeformAddress: result.address.freeformAddress,
                    // countrySubdivisionName: result.address.countrySubdivisionName,
                    // localName: result.address.localName,
                };
            }
        });
    });
}
exports.getPlaceAutocomplete = getPlaceAutocomplete;
