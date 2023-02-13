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
    InlineResponse2007Topic,
    InlineResponse2007TopicFromJSON,
    InlineResponse2007TopicFromJSONTyped,
    InlineResponse2007TopicToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse20013Sections
 */
export interface InlineResponse20013Sections {
    /**
     * 
     * @type {Array<InlineResponse2007Topic>}
     * @memberof InlineResponse20013Sections
     */
    topics: Array<InlineResponse2007Topic>;
}

export function InlineResponse20013SectionsFromJSON(json: any): InlineResponse20013Sections {
    return InlineResponse20013SectionsFromJSONTyped(json, false);
}

export function InlineResponse20013SectionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20013Sections {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'topics': ((json['topics'] as Array<any>).map(InlineResponse2007TopicFromJSON)),
    };
}

export function InlineResponse20013SectionsToJSON(value?: InlineResponse20013Sections | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'topics': ((value.topics as Array<any>).map(InlineResponse2007TopicToJSON)),
    };
}


