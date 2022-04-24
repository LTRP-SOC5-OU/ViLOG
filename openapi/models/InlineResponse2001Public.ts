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
 * @interface InlineResponse2001Public
 */
export interface InlineResponse2001Public {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2001Public
     */
    id?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof InlineResponse2001Public
     */
    domains?: Array<string>;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2001Public
     */
    expireAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001Public
     */
    token?: string;
}

export function InlineResponse2001PublicFromJSON(json: any): InlineResponse2001Public {
    return InlineResponse2001PublicFromJSONTyped(json, false);
}

export function InlineResponse2001PublicFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2001Public {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'domains': !exists(json, 'domains') ? undefined : json['domains'],
        'expireAt': !exists(json, 'expireAt') ? undefined : (new Date(json['expireAt'])),
        'token': !exists(json, 'token') ? undefined : json['token'],
    };
}

export function InlineResponse2001PublicToJSON(value?: InlineResponse2001Public | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'domains': value.domains,
        'expireAt': value.expireAt === undefined ? undefined : (value.expireAt.toISOString()),
        'token': value.token,
    };
}


