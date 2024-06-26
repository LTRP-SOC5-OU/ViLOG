/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.5.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    InlineResponse2003BookAuthors,
    InlineResponse2003BookAuthorsFromJSON,
    InlineResponse2003BookAuthorsFromJSONTyped,
    InlineResponse2003BookAuthorsToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2003Book
 */
export interface InlineResponse2003Book {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2003Book
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2003Book
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2003Book
     */
    shared: boolean;
    /**
     * 
     * @type {Array<InlineResponse2003BookAuthors>}
     * @memberof InlineResponse2003Book
     */
    authors: Array<InlineResponse2003BookAuthors>;
}

export function InlineResponse2003BookFromJSON(json: any): InlineResponse2003Book {
    return InlineResponse2003BookFromJSONTyped(json, false);
}

export function InlineResponse2003BookFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2003Book {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'shared': json['shared'],
        'authors': ((json['authors'] as Array<any>).map(InlineResponse2003BookAuthorsFromJSON)),
    };
}

export function InlineResponse2003BookToJSON(value?: InlineResponse2003Book | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'shared': value.shared,
        'authors': ((value.authors as Array<any>).map(InlineResponse2003BookAuthorsToJSON)),
    };
}


