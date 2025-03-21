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
    LTIContext,
    LTIContextFromJSON,
    LTIContextFromJSONTyped,
    LTIContextToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse20018TopicBookmarks
 */
export interface InlineResponse20018TopicBookmarks {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20018TopicBookmarks
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20018TopicBookmarks
     */
    updatedAt: string;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse20018TopicBookmarks
     */
    tag?: object;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse20018TopicBookmarks
     */
    memoContent?: string;
    /**
     * 
     * @type {LTIContext}
     * @memberof InlineResponse20018TopicBookmarks
     */
    ltiContext: LTIContext;
}

export function InlineResponse20018TopicBookmarksFromJSON(json: any): InlineResponse20018TopicBookmarks {
    return InlineResponse20018TopicBookmarksFromJSONTyped(json, false);
}

export function InlineResponse20018TopicBookmarksFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20018TopicBookmarks {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'updatedAt': json['updatedAt'],
        'tag': !exists(json, 'tag') ? undefined : json['tag'],
        'memoContent': !exists(json, 'memoContent') ? undefined : json['memoContent'],
        'ltiContext': LTIContextFromJSON(json['ltiContext']),
    };
}

export function InlineResponse20018TopicBookmarksToJSON(value?: InlineResponse20018TopicBookmarks | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'updatedAt': value.updatedAt,
        'tag': value.tag,
        'memoContent': value.memoContent,
        'ltiContext': LTIContextToJSON(value.ltiContext),
    };
}


