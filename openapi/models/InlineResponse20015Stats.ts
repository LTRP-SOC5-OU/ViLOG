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
 * @interface InlineResponse20015Stats
 */
export interface InlineResponse20015Stats {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20015Stats
     */
    topicId: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20015Stats
     */
    tagLabel: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20015Stats
     */
    totalCount: number;
}

export function InlineResponse20015StatsFromJSON(json: any): InlineResponse20015Stats {
    return InlineResponse20015StatsFromJSONTyped(json, false);
}

export function InlineResponse20015StatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20015Stats {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'topicId': json['topicId'],
        'tagLabel': json['tagLabel'],
        'totalCount': json['totalCount'],
    };
}

export function InlineResponse20015StatsToJSON(value?: InlineResponse20015Stats | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'topicId': value.topicId,
        'tagLabel': value.tagLabel,
        'totalCount': value.totalCount,
    };
}


