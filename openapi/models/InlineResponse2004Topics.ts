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
    InlineResponse2002BookAuthors,
    InlineResponse2002BookAuthorsFromJSON,
    InlineResponse2002BookAuthorsFromJSONTyped,
    InlineResponse2002BookAuthorsToJSON,
    InlineResponse2004Keywords,
    InlineResponse2004KeywordsFromJSON,
    InlineResponse2004KeywordsFromJSONTyped,
    InlineResponse2004KeywordsToJSON,
    InlineResponse2004RelatedBooks,
    InlineResponse2004RelatedBooksFromJSON,
    InlineResponse2004RelatedBooksFromJSONTyped,
    InlineResponse2004RelatedBooksToJSON,
    InlineResponse2004Resource,
    InlineResponse2004ResourceFromJSON,
    InlineResponse2004ResourceFromJSONTyped,
    InlineResponse2004ResourceToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2004Topics
 */
export interface InlineResponse2004Topics {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2004Topics
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2004Topics
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2004Topics
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2004Topics
     */
    timeRequired?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2004Topics
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2004Topics
     */
    stopTime?: number;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2004Topics
     */
    shared?: boolean;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2004Topics
     */
    license?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2004Topics
     */
    description?: string;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2004Topics
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2004Topics
     */
    updatedAt?: Date;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse2004Topics
     */
    details?: object;
    /**
     * 
     * @type {Array<InlineResponse2002BookAuthors>}
     * @memberof InlineResponse2004Topics
     */
    authors?: Array<InlineResponse2002BookAuthors>;
    /**
     * 
     * @type {Array<InlineResponse2004Keywords>}
     * @memberof InlineResponse2004Topics
     */
    keywords?: Array<InlineResponse2004Keywords>;
    /**
     * 
     * @type {Array<InlineResponse2004RelatedBooks>}
     * @memberof InlineResponse2004Topics
     */
    relatedBooks?: Array<InlineResponse2004RelatedBooks>;
    /**
     * 
     * @type {InlineResponse2004Resource}
     * @memberof InlineResponse2004Topics
     */
    resource?: InlineResponse2004Resource;
}

export function InlineResponse2004TopicsFromJSON(json: any): InlineResponse2004Topics {
    return InlineResponse2004TopicsFromJSONTyped(json, false);
}

export function InlineResponse2004TopicsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2004Topics {
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
        'authors': !exists(json, 'authors') ? undefined : ((json['authors'] as Array<any>).map(InlineResponse2002BookAuthorsFromJSON)),
        'keywords': !exists(json, 'keywords') ? undefined : ((json['keywords'] as Array<any>).map(InlineResponse2004KeywordsFromJSON)),
        'relatedBooks': !exists(json, 'relatedBooks') ? undefined : ((json['relatedBooks'] as Array<any>).map(InlineResponse2004RelatedBooksFromJSON)),
        'resource': !exists(json, 'resource') ? undefined : InlineResponse2004ResourceFromJSON(json['resource']),
    };
}

export function InlineResponse2004TopicsToJSON(value?: InlineResponse2004Topics | null): any {
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
        'authors': value.authors === undefined ? undefined : ((value.authors as Array<any>).map(InlineResponse2002BookAuthorsToJSON)),
        'keywords': value.keywords === undefined ? undefined : ((value.keywords as Array<any>).map(InlineResponse2004KeywordsToJSON)),
        'relatedBooks': value.relatedBooks === undefined ? undefined : ((value.relatedBooks as Array<any>).map(InlineResponse2004RelatedBooksToJSON)),
        'resource': InlineResponse2004ResourceToJSON(value.resource),
    };
}


