/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors located at https://github.com/opencrvs/opencrvs-core/blob/master/AUTHORS.
 */

import { SerializedFormField } from '../types/types'
import { getCustomFieldMapping } from '@countryconfig/utils/mapping/field-mapping-utils'

export function deceasedIdentityUnknown(): SerializedFormField {
  const fieldName: string = 'deceasedIdentityUnknown'
  const fieldId: string = `death.deceased.deceased-view-group.${fieldName}`

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: true,
    type: 'CHECKBOX',
    label: {
      id: 'form.customField.label.deceasedIdentityUnknown',
      description: 'A form field that asks if deceased identity is unknown',
      defaultMessage: 'Deceased identity is unknown'
    },
    checkedValue: true,
    uncheckedValue: false,
    hideHeader: true,
    initialValue: false,
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals: []
  }
}

export function reasonWhyUnidentifiable(): SerializedFormField {
  const fieldName: string = 'reasonWhyUnidentifiable'
  const fieldId: string = `death.deceased.deceased-view-group.${fieldName}`

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: true,
    type: 'TEXT',
    label: {
      id: 'form.customField.label.reasonWhyUnidentifiable',
      description: 'A form field that asks why the deceased is unidentifiable',
      defaultMessage: 'Reason why individual is not identifiable'
    },
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals: [
      { action: 'hide', expression: 'values.deceasedIdentityUnknown === false' }
    ],
    maxLength: 250
  }
}
