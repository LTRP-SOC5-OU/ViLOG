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
    ApiV2TopicTopicIdActivityTimeRanges,
    ApiV2TopicTopicIdActivityTimeRangesFromJSON,
    ApiV2TopicTopicIdActivityTimeRangesFromJSONTyped,
    ApiV2TopicTopicIdActivityTimeRangesToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineObject9
 */
export interface InlineObject9 {
    /**
     * 
     * @type {Array<ApiV2TopicTopicIdActivityTimeRanges>}
     * @memberof InlineObject9
     */
    timeRanges: Array<ApiV2TopicTopicIdActivityTimeRanges>;
}

export function InlineObject9FromJSON(json: any): InlineObject9 {
    return InlineObject9FromJSONTyped(json, false);
}

export function InlineObject9FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject9 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'timeRanges': ((json['timeRanges'] as Array<any>).map(ApiV2TopicTopicIdActivityTimeRangesFromJSON)),
    };
}

export function InlineObject9ToJSON(value?: InlineObject9 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'timeRanges': ((value.timeRanges as Array<any>).map(ApiV2TopicTopicIdActivityTimeRangesToJSON)),
    };
}


