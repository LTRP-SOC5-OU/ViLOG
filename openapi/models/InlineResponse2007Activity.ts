/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    InlineResponse2007Learner,
    InlineResponse2007LearnerFromJSON,
    InlineResponse2007LearnerFromJSONTyped,
    InlineResponse2007LearnerToJSON,
    InlineResponse2007TimeRanges,
    InlineResponse2007TimeRangesFromJSON,
    InlineResponse2007TimeRangesFromJSONTyped,
    InlineResponse2007TimeRangesToJSON,
    InlineResponse2007Topic,
    InlineResponse2007TopicFromJSON,
    InlineResponse2007TopicFromJSONTyped,
    InlineResponse2007TopicToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2007Activity
 */
export interface InlineResponse2007Activity {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2007Activity
     */
    id: number;
    /**
     * 
     * @type {InlineResponse2007Learner}
     * @memberof InlineResponse2007Activity
     */
    learner: InlineResponse2007Learner;
    /**
     * 
     * @type {InlineResponse2007Topic}
     * @memberof InlineResponse2007Activity
     */
    topic: InlineResponse2007Topic;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2007Activity
     */
    completed: boolean;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2007Activity
     */
    totalTimeMs: number;
    /**
     * 
     * @type {Array<InlineResponse2007TimeRanges>}
     * @memberof InlineResponse2007Activity
     */
    timeRanges: Array<InlineResponse2007TimeRanges>;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2007Activity
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2007Activity
     */
    updatedAt: Date;
}

export function InlineResponse2007ActivityFromJSON(json: any): InlineResponse2007Activity {
    return InlineResponse2007ActivityFromJSONTyped(json, false);
}

export function InlineResponse2007ActivityFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2007Activity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'learner': InlineResponse2007LearnerFromJSON(json['learner']),
        'topic': InlineResponse2007TopicFromJSON(json['topic']),
        'completed': json['completed'],
        'totalTimeMs': json['totalTimeMs'],
        'timeRanges': ((json['timeRanges'] as Array<any>).map(InlineResponse2007TimeRangesFromJSON)),
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function InlineResponse2007ActivityToJSON(value?: InlineResponse2007Activity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'learner': InlineResponse2007LearnerToJSON(value.learner),
        'topic': InlineResponse2007TopicToJSON(value.topic),
        'completed': value.completed,
        'totalTimeMs': value.totalTimeMs,
        'timeRanges': ((value.timeRanges as Array<any>).map(InlineResponse2007TimeRangesToJSON)),
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
    };
}

