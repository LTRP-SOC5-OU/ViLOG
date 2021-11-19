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
import {
    ApiV2BookBookIdKeywords,
    ApiV2BookBookIdKeywordsFromJSON,
    ApiV2BookBookIdKeywordsFromJSONTyped,
    ApiV2BookBookIdKeywordsToJSON,
    ApiV2TopicTopicIdResource,
    ApiV2TopicTopicIdResourceFromJSON,
    ApiV2TopicTopicIdResourceFromJSONTyped,
    ApiV2TopicTopicIdResourceToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineObject7
 */
export interface InlineObject7 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject7
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject7
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof InlineObject7
     */
    timeRequired?: number;
    /**
     * 
     * @type {boolean}
     * @memberof InlineObject7
     */
    shared?: boolean;
    /**
     * 
     * @type {string}
     * @memberof InlineObject7
     */
    description?: string;
    /**
     * 
     * @type {ApiV2TopicTopicIdResource}
     * @memberof InlineObject7
     */
    resource?: ApiV2TopicTopicIdResource;
    /**
     * 
     * @type {Array<ApiV2BookBookIdKeywords>}
     * @memberof InlineObject7
     */
    keywords?: Array<ApiV2BookBookIdKeywords>;
}

export function InlineObject7FromJSON(json: any): InlineObject7 {
    return InlineObject7FromJSONTyped(json, false);
}

export function InlineObject7FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject7 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'timeRequired': !exists(json, 'timeRequired') ? undefined : json['timeRequired'],
        'shared': !exists(json, 'shared') ? undefined : json['shared'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'resource': !exists(json, 'resource') ? undefined : ApiV2TopicTopicIdResourceFromJSON(json['resource']),
        'keywords': !exists(json, 'keywords') ? undefined : ((json['keywords'] as Array<any>).map(ApiV2BookBookIdKeywordsFromJSON)),
    };
}

export function InlineObject7ToJSON(value?: InlineObject7 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'language': value.language,
        'timeRequired': value.timeRequired,
        'shared': value.shared,
        'description': value.description,
        'resource': ApiV2TopicTopicIdResourceToJSON(value.resource),
        'keywords': value.keywords === undefined ? undefined : ((value.keywords as Array<any>).map(ApiV2BookBookIdKeywordsToJSON)),
    };
}


