/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
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
 * @interface InlineResponse201
 */
export interface InlineResponse201 {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse201
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse201
     */
    kind?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse201
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse201
     */
    url?: string;
}

export function InlineResponse201FromJSON(json: any): InlineResponse201 {
    return InlineResponse201FromJSONTyped(json, false);
}

export function InlineResponse201FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse201 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function InlineResponse201ToJSON(value?: InlineResponse201 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'kind': value.kind,
        'language': value.language,
        'url': value.url,
    };
}


