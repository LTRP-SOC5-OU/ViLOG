/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ApiV2BookBookIdKeywords
 */
export interface ApiV2BookBookIdKeywords {
    /**
     * 
     * @type {string}
     * @memberof ApiV2BookBookIdKeywords
     */
    name: string;
}

export function ApiV2BookBookIdKeywordsFromJSON(json: any): ApiV2BookBookIdKeywords {
    return ApiV2BookBookIdKeywordsFromJSONTyped(json, false);
}

export function ApiV2BookBookIdKeywordsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2BookBookIdKeywords {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
    };
}

export function ApiV2BookBookIdKeywordsToJSON(value?: ApiV2BookBookIdKeywords | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
    };
}


