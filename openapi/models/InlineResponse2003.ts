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
    InlineResponse2003Contents,
    InlineResponse2003ContentsFromJSON,
    InlineResponse2003ContentsFromJSONTyped,
    InlineResponse2003ContentsToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2003
 */
export interface InlineResponse2003 {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2003
     */
    totalCount: number;
    /**
     * 
     * @type {Array<InlineResponse2003Contents>}
     * @memberof InlineResponse2003
     */
    contents: Array<InlineResponse2003Contents>;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2003
     */
    page: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2003
     */
    perPage: number;
}

export function InlineResponse2003FromJSON(json: any): InlineResponse2003 {
    return InlineResponse2003FromJSONTyped(json, false);
}

export function InlineResponse2003FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2003 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'totalCount': json['totalCount'],
        'contents': ((json['contents'] as Array<any>).map(InlineResponse2003ContentsFromJSON)),
        'page': json['page'],
        'perPage': json['perPage'],
    };
}

export function InlineResponse2003ToJSON(value?: InlineResponse2003 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'totalCount': value.totalCount,
        'contents': ((value.contents as Array<any>).map(InlineResponse2003ContentsToJSON)),
        'page': value.page,
        'perPage': value.perPage,
    };
}


