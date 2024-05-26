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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutoCompleteDetails = void 0;
const maps_api_1 = require("./maps-api");
function getAutoCompleteDetails(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.TOMTOM_API_KEY;
        const countr;
        // get autocomplete results
        const res = yield (0, maps_api_1.getPlaceAutocomplete)(apiKey, address).then((autocompleteResults) => __awaiter(this, void 0, void 0, function* () {
            const res = [];
            res.push(...autocompleteResults);
            return res;
        }));
        console.log(res[0]);
        // loop over and get details and map results
        return res;
    });
}
exports.getAutoCompleteDetails = getAutoCompleteDetails;
