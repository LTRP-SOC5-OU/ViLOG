/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.1.0
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
 * @interface InlineResponse20010Book
 */
export interface InlineResponse20010Book {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20010Book
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20010Book
     */
    name: string;
}

export function InlineResponse20010BookFromJSON(json: any): InlineResponse20010Book {
    return InlineResponse20010BookFromJSONTyped(json, false);
}

export function InlineResponse20010BookFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20010Book {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
    };
}

export function InlineResponse20010BookToJSON(value?: InlineResponse20010Book | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
    };
}

