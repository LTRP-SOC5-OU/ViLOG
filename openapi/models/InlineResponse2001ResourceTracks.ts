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
/**
 * 
 * @export
 * @interface InlineResponse2001ResourceTracks
 */
export interface InlineResponse2001ResourceTracks {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2001ResourceTracks
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001ResourceTracks
     */
    kind?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001ResourceTracks
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001ResourceTracks
     */
    url?: string;
}

export function InlineResponse2001ResourceTracksFromJSON(json: any): InlineResponse2001ResourceTracks {
    return InlineResponse2001ResourceTracksFromJSONTyped(json, false);
}

export function InlineResponse2001ResourceTracksFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2001ResourceTracks {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function InlineResponse2001ResourceTracksToJSON(value?: InlineResponse2001ResourceTracks | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'kind': value.kind,
        'language': value.language,
        'url': value.url,
    };
}

