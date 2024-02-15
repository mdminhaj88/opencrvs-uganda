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
import { getCustomFieldMapping } from '@countryconfig/utils/mapping/field-mapping-utils'
import { formMessageDescriptors } from '../common/messages'
import { SerializedFormField } from '../types/types'
import { detailsExistConditional } from '../common/default-validation-conditionals'

export function timeOfBirth(): SerializedFormField {
  const fieldName = 'timeOfBirth'
  const fieldId = `birth.child.child-view-group.${fieldName}`

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: false,
    type: 'TIME',
    label: formMessageDescriptors.timeOfBirth,
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals: []
  }
}

export function motherMaidenName(): SerializedFormField {
  const fieldName: string = 'motherMaidenName'
  const fieldId: string = `birth.mother.mother-view-group.${fieldName}`

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: false,
    type: 'TEXT',
    label: {
      id: 'form.customField.label.mother',
      description: "A form field that asks for the mother's maiden name",
      defaultMessage: 'Maiden name'
    },
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals: detailsExistConditional,
    maxLength: 250
  }
}
