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
    InlineResponse2004,
    InlineResponse2004FromJSON,
    InlineResponse2004FromJSONTyped,
    InlineResponse2004ToJSON,
    InlineResponse2005Keywords,
    InlineResponse2005KeywordsFromJSON,
    InlineResponse2005KeywordsFromJSONTyped,
    InlineResponse2005KeywordsToJSON,
    InlineResponse2005PublicBooks,
    InlineResponse2005PublicBooksFromJSON,
    InlineResponse2005PublicBooksFromJSONTyped,
    InlineResponse2005PublicBooksToJSON,
    InlineResponse2005Sections,
    InlineResponse2005SectionsFromJSON,
    InlineResponse2005SectionsFromJSONTyped,
    InlineResponse2005SectionsToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2006Books
 */
export interface InlineResponse2006Books {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2006Books
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006Books
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006Books
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006Books
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2006Books
     */
    timeRequired?: number;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2006Books
     */
    shared?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2006Books
     */
    publishedAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2006Books
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2006Books
     */
    updatedAt?: Date;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse2006Books
     */
    details?: object;
    /**
     * 
     * @type {Array<InlineResponse2003BookAuthors>}
     * @memberof InlineResponse2006Books
     */
    authors?: Array<InlineResponse2003BookAuthors>;
    /**
     * 
     * @type {Array<InlineResponse2005Keywords>}
     * @memberof InlineResponse2006Books
     */
    keywords?: Array<InlineResponse2005Keywords>;
    /**
     * 
     * @type {Array<InlineResponse2005Sections>}
     * @memberof InlineResponse2006Books
     */
    sections?: Array<InlineResponse2005Sections>;
    /**
     * 
     * @type {Array<InlineResponse2004>}
     * @memberof InlineResponse2006Books
     */
    ltiResourceLinks?: Array<InlineResponse2004>;
    /**
     * 
     * @type {Array<InlineResponse2005PublicBooks>}
     * @memberof InlineResponse2006Books
     */
    publicBooks?: Array<InlineResponse2005PublicBooks>;
}

export function InlineResponse2006BooksFromJSON(json: any): InlineResponse2006Books {
    return InlineResponse2006BooksFromJSONTyped(json, false);
}

export function InlineResponse2006BooksFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2006Books {
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
        'authors': !exists(json, 'authors') ? undefined : ((json['authors'] as Array<any>).map(InlineResponse2003BookAuthorsFromJSON)),
        'keywords': !exists(json, 'keywords') ? undefined : ((json['keywords'] as Array<any>).map(InlineResponse2005KeywordsFromJSON)),
        'sections': !exists(json, 'sections') ? undefined : ((json['sections'] as Array<any>).map(InlineResponse2005SectionsFromJSON)),
        'ltiResourceLinks': !exists(json, 'ltiResourceLinks') ? undefined : ((json['ltiResourceLinks'] as Array<any>).map(InlineResponse2004FromJSON)),
        'publicBooks': !exists(json, 'publicBooks') ? undefined : ((json['publicBooks'] as Array<any>).map(InlineResponse2005PublicBooksFromJSON)),
    };
}

export function InlineResponse2006BooksToJSON(value?: InlineResponse2006Books | null): any {
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
        'authors': value.authors === undefined ? undefined : ((value.authors as Array<any>).map(InlineResponse2003BookAuthorsToJSON)),
        'keywords': value.keywords === undefined ? undefined : ((value.keywords as Array<any>).map(InlineResponse2005KeywordsToJSON)),
        'sections': value.sections === undefined ? undefined : ((value.sections as Array<any>).map(InlineResponse2005SectionsToJSON)),
        'ltiResourceLinks': value.ltiResourceLinks === undefined ? undefined : ((value.ltiResourceLinks as Array<any>).map(InlineResponse2004ToJSON)),
        'publicBooks': value.publicBooks === undefined ? undefined : ((value.publicBooks as Array<any>).map(InlineResponse2005PublicBooksToJSON)),
    };
}


