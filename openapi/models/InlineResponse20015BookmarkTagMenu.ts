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
/**
 * 
 * @export
 * @interface InlineResponse20015BookmarkTagMenu
 */
export interface InlineResponse20015BookmarkTagMenu {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20015BookmarkTagMenu
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20015BookmarkTagMenu
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20015BookmarkTagMenu
     */
    color: string;
}

export function InlineResponse20015BookmarkTagMenuFromJSON(json: any): InlineResponse20015BookmarkTagMenu {
    return InlineResponse20015BookmarkTagMenuFromJSONTyped(json, false);
}

export function InlineResponse20015BookmarkTagMenuFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20015BookmarkTagMenu {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'label': json['label'],
        'color': json['color'],
    };
}

export function InlineResponse20015BookmarkTagMenuToJSON(value?: InlineResponse20015BookmarkTagMenu | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'label': value.label,
        'color': value.color,
    };
}


