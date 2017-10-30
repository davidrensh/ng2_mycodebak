'use strict';
export const transTypes = [
    { value: 0, viewValue: 'Purchase' },
    { value: 1, viewValue: 'Redeem' },
    { value: 2, viewValue: 'Renew' },
    { value: 3, viewValue: 'Return' }];

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PHONE_REGEX = /\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
