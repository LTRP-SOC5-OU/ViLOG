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
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200FromJSONTyped,
    InlineResponse200ToJSON,
    InlineResponse2001Authors,
    InlineResponse2001AuthorsFromJSON,
    InlineResponse2001AuthorsFromJSONTyped,
    InlineResponse2001AuthorsToJSON,
    InlineResponse2001Sections,
    InlineResponse2001SectionsFromJSON,
    InlineResponse2001SectionsFromJSONTyped,
    InlineResponse2001SectionsToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2001Books
 */
export interface InlineResponse2001Books {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2001Books
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001Books
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001Books
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001Books
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2001Books
     */
    timeRequired?: number;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2001Books
     */
    shared?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2001Books
     */
    publishedAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2001Books
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2001Books
     */
    updatedAt?: Date;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse2001Books
     */
    details?: object;
    /**
     * 
     * @type {Array<InlineResponse2001Authors>}
     * @memberof InlineResponse2001Books
     */
    authors?: Array<InlineResponse2001Authors>;
    /**
     * 
     * @type {Array<InlineResponse2001Sections>}
     * @memberof InlineResponse2001Books
     */
    sections?: Array<InlineResponse2001Sections>;
    /**
     * 
     * @type {Array<InlineResponse200>}
     * @memberof InlineResponse2001Books
     */
    ltiResourceLinks?: Array<InlineResponse200>;
}

export function InlineResponse2001BooksFromJSON(json: any): InlineResponse2001Books {
    return InlineResponse2001BooksFromJSONTyped(json, false);
}

export function InlineResponse2001BooksFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2001Books {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'timeRequired': !exists(json, 'timeRequired') ? undefined : json['timeRequired'],
        'shared': !exists(json, 'shared') ? undefined : json['shared'],
        'publishedAt': !exists(json, 'publishedAt') ? undefined : (new Date(json['publishedAt'])),
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'details': !exists(json, 'details') ? undefined : json['details'],
        'authors': !exists(json, 'authors') ? undefined : ((json['authors'] as Array<any>).map(InlineResponse2001AuthorsFromJSON)),
        'sections': !exists(json, 'sections') ? undefined : ((json['sections'] as Array<any>).map(InlineResponse2001SectionsFromJSON)),
        'ltiResourceLinks': !exists(json, 'ltiResourceLinks') ? undefined : ((json['ltiResourceLinks'] as Array<any>).map(InlineResponse200FromJSON)),
    };
}

export function InlineResponse2001BooksToJSON(value?: InlineResponse2001Books | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'language': value.language,
        'timeRequired': value.timeRequired,
        'shared': value.shared,
        'publishedAt': value.publishedAt === undefined ? undefined : (value.publishedAt.toISOString()),
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'details': value.details,
        'authors': value.authors === undefined ? undefined : ((value.authors as Array<any>).map(InlineResponse2001AuthorsToJSON)),
        'sections': value.sections === undefined ? undefined : ((value.sections as Array<any>).map(InlineResponse2001SectionsToJSON)),
        'ltiResourceLinks': value.ltiResourceLinks === undefined ? undefined : ((value.ltiResourceLinks as Array<any>).map(InlineResponse200ToJSON)),
    };
}


