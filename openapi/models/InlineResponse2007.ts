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
    InlineResponse2007Books,
    InlineResponse2007BooksFromJSON,
    InlineResponse2007BooksFromJSONTyped,
    InlineResponse2007BooksToJSON,
} from './';

/**
 * 作成したブックの一覧
 * @export
 * @interface InlineResponse2007
 */
export interface InlineResponse2007 {
    /**
     * 
     * @type {Array<InlineResponse2007Books>}
     * @memberof InlineResponse2007
     */
    books?: Array<InlineResponse2007Books>;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2007
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2007
     */
    perPage?: number;
}

export function InlineResponse2007FromJSON(json: any): InlineResponse2007 {
    return InlineResponse2007FromJSONTyped(json, false);
}

export function InlineResponse2007FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2007 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'books': !exists(json, 'books') ? undefined : ((json['books'] as Array<any>).map(InlineResponse2007BooksFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'perPage': !exists(json, 'perPage') ? undefined : json['perPage'],
    };
}

export function InlineResponse2007ToJSON(value?: InlineResponse2007 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'books': value.books === undefined ? undefined : ((value.books as Array<any>).map(InlineResponse2007BooksToJSON)),
        'page': value.page,
        'perPage': value.perPage,
    };
}


