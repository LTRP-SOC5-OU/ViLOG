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
import {
    ApiV2BookBookIdAuthorsAuthors,
    ApiV2BookBookIdAuthorsAuthorsFromJSON,
    ApiV2BookBookIdAuthorsAuthorsFromJSONTyped,
    ApiV2BookBookIdAuthorsAuthorsToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineObject5
 */
export interface InlineObject5 {
    /**
     * 
     * @type {Array<ApiV2BookBookIdAuthorsAuthors>}
     * @memberof InlineObject5
     */
    authors: Array<ApiV2BookBookIdAuthorsAuthors>;
    /**
     * 
     * @type {string}
     * @memberof InlineObject5
     */
    provider: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject5
     */
    wowzaBaseUrl: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject5
     */
    json?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject5
     */
    file?: string;
}

export function InlineObject5FromJSON(json: any): InlineObject5 {
    return InlineObject5FromJSONTyped(json, false);
}

export function InlineObject5FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject5 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'authors': ((json['authors'] as Array<any>).map(ApiV2BookBookIdAuthorsAuthorsFromJSON)),
        'provider': json['provider'],
        'wowzaBaseUrl': json['wowzaBaseUrl'],
        'json': !exists(json, 'json') ? undefined : json['json'],
        'file': !exists(json, 'file') ? undefined : json['file'],
    };
}

export function InlineObject5ToJSON(value?: InlineObject5 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'authors': ((value.authors as Array<any>).map(ApiV2BookBookIdAuthorsAuthorsToJSON)),
        'provider': value.provider,
        'wowzaBaseUrl': value.wowzaBaseUrl,
        'json': value.json,
        'file': value.file,
    };
}


