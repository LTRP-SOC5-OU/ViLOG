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
/**
 * 
 * @export
 * @interface InlineResponse2005ResourceTracks
 */
export interface InlineResponse2005ResourceTracks {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005ResourceTracks
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005ResourceTracks
     */
    kind?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005ResourceTracks
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005ResourceTracks
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005ResourceTracks
     */
    accessToken?: string;
}

export function InlineResponse2005ResourceTracksFromJSON(json: any): InlineResponse2005ResourceTracks {
    return InlineResponse2005ResourceTracksFromJSONTyped(json, false);
}

export function InlineResponse2005ResourceTracksFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2005ResourceTracks {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'accessToken': !exists(json, 'accessToken') ? undefined : json['accessToken'],
    };
}

export function InlineResponse2005ResourceTracksToJSON(value?: InlineResponse2005ResourceTracks | null): any {
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
        'accessToken': value.accessToken,
    };
}


