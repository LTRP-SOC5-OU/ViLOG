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
    InlineResponse2003BookAuthors,
    InlineResponse2003BookAuthorsFromJSON,
    InlineResponse2003BookAuthorsFromJSONTyped,
    InlineResponse2003BookAuthorsToJSON,
    InlineResponse2005Keywords,
    InlineResponse2005KeywordsFromJSON,
    InlineResponse2005KeywordsFromJSONTyped,
    InlineResponse2005KeywordsToJSON,
    InlineResponse2005RelatedBooks,
    InlineResponse2005RelatedBooksFromJSON,
    InlineResponse2005RelatedBooksFromJSONTyped,
    InlineResponse2005RelatedBooksToJSON,
    InlineResponse2005Resource,
    InlineResponse2005ResourceFromJSON,
    InlineResponse2005ResourceFromJSONTyped,
    InlineResponse2005ResourceToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2005Topics
 */
export interface InlineResponse2005Topics {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005Topics
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Topics
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Topics
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005Topics
     */
    timeRequired?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005Topics
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005Topics
     */
    stopTime?: number;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2005Topics
     */
    shared?: boolean;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Topics
     */
    license?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Topics
     */
    description?: string;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2005Topics
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2005Topics
     */
    updatedAt?: Date;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse2005Topics
     */
    details?: object;
    /**
     * 
     * @type {Array<InlineResponse2003BookAuthors>}
     * @memberof InlineResponse2005Topics
     */
    authors?: Array<InlineResponse2003BookAuthors>;
    /**
     * 
     * @type {Array<InlineResponse2005Keywords>}
     * @memberof InlineResponse2005Topics
     */
    keywords?: Array<InlineResponse2005Keywords>;
    /**
     * 
     * @type {Array<InlineResponse2005RelatedBooks>}
     * @memberof InlineResponse2005Topics
     */
    relatedBooks?: Array<InlineResponse2005RelatedBooks>;
    /**
     * 
     * @type {InlineResponse2005Resource}
     * @memberof InlineResponse2005Topics
     */
    resource?: InlineResponse2005Resource;
}

export function InlineResponse2005TopicsFromJSON(json: any): InlineResponse2005Topics {
    return InlineResponse2005TopicsFromJSONTyped(json, false);
}

export function InlineResponse2005TopicsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2005Topics {
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
        'authors': !exists(json, 'authors') ? undefined : ((json['authors'] as Array<any>).map(InlineResponse2003BookAuthorsFromJSON)),
        'keywords': !exists(json, 'keywords') ? undefined : ((json['keywords'] as Array<any>).map(InlineResponse2005KeywordsFromJSON)),
        'relatedBooks': !exists(json, 'relatedBooks') ? undefined : ((json['relatedBooks'] as Array<any>).map(InlineResponse2005RelatedBooksFromJSON)),
        'resource': !exists(json, 'resource') ? undefined : InlineResponse2005ResourceFromJSON(json['resource']),
    };
}

export function InlineResponse2005TopicsToJSON(value?: InlineResponse2005Topics | null): any {
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
        'authors': value.authors === undefined ? undefined : ((value.authors as Array<any>).map(InlineResponse2003BookAuthorsToJSON)),
        'keywords': value.keywords === undefined ? undefined : ((value.keywords as Array<any>).map(InlineResponse2005KeywordsToJSON)),
        'relatedBooks': value.relatedBooks === undefined ? undefined : ((value.relatedBooks as Array<any>).map(InlineResponse2005RelatedBooksToJSON)),
        'resource': InlineResponse2005ResourceToJSON(value.resource),
    };
}


