/* tslint:disable */
/* eslint-disable */
/**
 * PortIQ API
 * PortIQ API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SocialLogin
 */
export interface SocialLogin {
    /**
     * 
     * @type {string}
     * @memberof SocialLogin
     */
    accessToken?: string;
    /**
     * 
     * @type {string}
     * @memberof SocialLogin
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof SocialLogin
     */
    idToken?: string;
}

/**
 * Check if a given object implements the SocialLogin interface.
 */
export function instanceOfSocialLogin(value: object): value is SocialLogin {
    return true;
}

export function SocialLoginFromJSON(json: any): SocialLogin {
    return SocialLoginFromJSONTyped(json, false);
}

export function SocialLoginFromJSONTyped(json: any, ignoreDiscriminator: boolean): SocialLogin {
    if (json == null) {
        return json;
    }
    return {
        
        'accessToken': json['access_token'] == null ? undefined : json['access_token'],
        'code': json['code'] == null ? undefined : json['code'],
        'idToken': json['id_token'] == null ? undefined : json['id_token'],
    };
}

export function SocialLoginToJSON(json: any): SocialLogin {
    return SocialLoginToJSONTyped(json, false);
}

export function SocialLoginToJSONTyped(value?: SocialLogin | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'access_token': value['accessToken'],
        'code': value['code'],
        'id_token': value['idToken'],
    };
}

