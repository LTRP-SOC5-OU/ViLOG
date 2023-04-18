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
 * @interface InlineObject11
 */
export interface InlineObject11 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject11
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject11
     */
    content?: string;
}

export function InlineObject11FromJSON(json: any): InlineObject11 {
    return InlineObject11FromJSONTyped(json, false);
}

export function InlineObject11FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject11 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'language': !exists(json, 'language') ? undefined : json['language'],
        'content': !exists(json, 'content') ? undefined : json['content'],
    };
}

export function InlineObject11ToJSON(value?: InlineObject11 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'language': value.language,
        'content': value.content,
    };
}


