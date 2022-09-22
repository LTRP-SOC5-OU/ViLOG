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
    InlineResponse2001Authors,
    InlineResponse2001AuthorsFromJSON,
    InlineResponse2001AuthorsFromJSONTyped,
    InlineResponse2001AuthorsToJSON,
    InlineResponse2001Keywords,
    InlineResponse2001KeywordsFromJSON,
    InlineResponse2001KeywordsFromJSONTyped,
    InlineResponse2001KeywordsToJSON,
    InlineResponse2001Resource,
    InlineResponse2001ResourceFromJSON,
    InlineResponse2001ResourceFromJSONTyped,
    InlineResponse2001ResourceToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2001Topics
 */
export interface InlineResponse2001Topics {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2001Topics
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001Topics
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001Topics
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2001Topics
     */
    timeRequired?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2001Topics
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2001Topics
     */
    stopTime?: number;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2001Topics
     */
    shared?: boolean;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001Topics
     */
    license?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001Topics
     */
    description?: string;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2001Topics
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2001Topics
     */
    updatedAt?: Date;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse2001Topics
     */
    details?: object;
    /**
     * 
     * @type {Array<InlineResponse2001Authors>}
     * @memberof InlineResponse2001Topics
     */
    authors?: Array<InlineResponse2001Authors>;
    /**
     * 
     * @type {Array<InlineResponse2001Keywords>}
     * @memberof InlineResponse2001Topics
     */
    keywords?: Array<InlineResponse2001Keywords>;
    /**
     * 
     * @type {InlineResponse2001Resource}
     * @memberof InlineResponse2001Topics
     */
    resource?: InlineResponse2001Resource;
}

export function InlineResponse2001TopicsFromJSON(json: any): InlineResponse2001Topics {
    return InlineResponse2001TopicsFromJSONTyped(json, false);
}

export function InlineResponse2001TopicsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2001Topics {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'timeRequired': !exists(json, 'timeRequired') ? undefined : json['timeRequired'],
        'startTime': !exists(json, 'startTime') ? undefined : json['startTime'],
        'stopTime': !exists(json, 'stopTime') ? undefined : json['stopTime'],
        'shared': !exists(json, 'shared') ? undefined : json['shared'],
        'license': !exists(json, 'license') ? undefined : json['license'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'details': !exists(json, 'details') ? undefined : json['details'],
        'authors': !exists(json, 'authors') ? undefined : ((json['authors'] as Array<any>).map(InlineResponse2001AuthorsFromJSON)),
        'keywords': !exists(json, 'keywords') ? undefined : ((json['keywords'] as Array<any>).map(InlineResponse2001KeywordsFromJSON)),
        'resource': !exists(json, 'resource') ? undefined : InlineResponse2001ResourceFromJSON(json['resource']),
    };
}

export function InlineResponse2001TopicsToJSON(value?: InlineResponse2001Topics | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'language': value.language,
        'timeRequired': value.timeRequired,
        'startTime': value.startTime,
        'stopTime': value.stopTime,
        'shared': value.shared,
        'license': value.license,
        'description': value.description,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'details': value.details,
        'authors': value.authors === undefined ? undefined : ((value.authors as Array<any>).map(InlineResponse2001AuthorsToJSON)),
        'keywords': value.keywords === undefined ? undefined : ((value.keywords as Array<any>).map(InlineResponse2001KeywordsToJSON)),
        'resource': InlineResponse2001ResourceToJSON(value.resource),
    };
}


