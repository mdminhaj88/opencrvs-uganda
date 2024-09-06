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
import {
  Conditional,
  EventLocationAddressCases,
  SerializedFormField
} from '../types/types'
import { getCustomFieldMapping } from '@countryconfig/utils/mapping/field-mapping-utils'
import { formMessageDescriptors } from '../common/messages'
import { getAddressFields } from '../addresses/address-fields'
import { divider } from '../common/common-optional-fields'

export function timeOfDeath(): SerializedFormField {
  const fieldName = 'timeOfDeath'
  const fieldId = `death.deathEvent.death-event-details.${fieldName}`

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: false,
    type: 'TIME',
    label: formMessageDescriptors.timeOfDeath,
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals: []
  }
}

export function deceasedPlaceOfBirth(
  addressHierarchy: string[]
): SerializedFormField[] {
  return [
    {
      name: 'placeOfBirthTitle',
      type: 'HEADING3',
      label: formMessageDescriptors.placeOfBirth,
      previewGroup: 'placeOfBirth',
      initialValue: '',
      validator: [],
      conditionals: []
    },
    ...getAddressFields(
      '',
      EventLocationAddressCases.PLACE_OF_BIRTH,
      addressHierarchy
    )
      .filter(({ name }) => name === 'countryPlaceofbirth')
      .map((field) => ({
        ...field,
        custom: true,
        customQuestionMappingId: `death.deceased.deceased-view-group.${field.name}`,
        conditionals: field.conditionals?.filter(
          ({ expression }) => !expression.includes('"PRIVATE_HOME"')
        ),
        previewGroup: 'placeOfBirth',
        mapping: getCustomFieldMapping(
          `death.deceased.deceased-view-group.${field.name}`
        )
      })),
    {
      name: 'townPlaceOfBirth',
      customQuestionMappingId:
        'death.deceased.deceased-view-group.townPlaceOfBirth',
      custom: true,
      required: true,
      type: 'TEXT',
      label: {
        id: 'form.customField.label.townOrVillage',
        description: 'Label for place of birth field town/village',
        defaultMessage: 'Town/Village'
      },
      initialValue: '',
      validator: [],
      previewGroup: 'placeOfBirth',
      mapping: getCustomFieldMapping(
        'death.deceased.deceased-view-group.townPlaceOfBirth'
      ),
      maxLength: 32
    }
  ]
}

const bodyFoundConditional: Conditional[] = [
  {
    action: 'hide',
    expression: 'values.mannerOfDeath !== "BODY_FOUND"'
  }
]

export function individualWhoFoundTheBody(): SerializedFormField[] {
  return [
    {
      name: 'detailsOfIndividualHeading',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.detailsOfIndividualHeading',
      custom: true,
      readonly: true,
      type: 'HEADING3',
      label: {
        id: 'form.customField.label.detailsOfIndividualHeading',
        description:
          'A form field heading for the details of the individual who found the body',
        defaultMessage: 'Details of individual who found body'
      },
      validator: [],
      conditionals: bodyFoundConditional
    },
    {
      name: 'individualSurname',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.individualSurname',
      custom: true,
      required: true,
      type: 'TEXT',
      label: formMessageDescriptors.firstNames,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        'death.deathEvent.death-event-details.individualSurname'
      ),
      conditionals: bodyFoundConditional,
      maxLength: 250
    },
    {
      name: 'individualGivenName',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.individualGivenName',
      custom: true,
      required: true,
      type: 'TEXT',
      label: formMessageDescriptors.middleName,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        'death.deathEvent.death-event-details.individualGivenName'
      ),
      conditionals: bodyFoundConditional,
      maxLength: 250
    },
    {
      name: 'individualOtherName',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.individualOtherName',
      custom: true,
      required: false,
      type: 'TEXT',
      label: formMessageDescriptors.familyName,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        'death.deathEvent.death-event-details.individualOtherName'
      ),
      conditionals: bodyFoundConditional,
      maxLength: 250
    },
    {
      name: 'circumstances',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.circumstances',
      custom: true,
      required: true,
      type: 'TEXTAREA',
      label: {
        id: 'form.customField.label.circumstances',
        description:
          'A form field that asks for the circumstances under which body was found',
        defaultMessage:
          'Description of circumstances under which body was found'
      },
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        'death.deathEvent.death-event-details.circumstances'
      ),
      conditionals: bodyFoundConditional,
      maxLength: 250
    },
    divider('individualDivier', bodyFoundConditional)
  ]
}

export function causeOfDeath(): SerializedFormField {
  const fieldName: string = 'causeOfDeath'
  const fieldId: string = `death.deathEvent.death-event-details.${fieldName}`

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: false,
    type: 'TEXT',
    label: {
      id: 'form.customField.label.causeOfDeath',
      description: 'A form field that asks for the cause of death',
      defaultMessage: 'Cause of death'
    },
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals: [],
    maxLength: 250
  }
}
