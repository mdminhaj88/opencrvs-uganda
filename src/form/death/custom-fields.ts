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
  AddressCases,
  Conditional,
  EventLocationAddressCases,
  SerializedFormField
} from '../types/types'
import { getCustomFieldMapping } from '@countryconfig/utils/mapping/field-mapping-utils'
import { formMessageDescriptors } from '../common/messages'
import { getAddressFields } from '../addresses/address-fields'
import { divider } from '../common/common-optional-fields'
import { idTypeOptions } from '../custom-fields'
import { uppercaseFirstLetter } from '@countryconfig/utils'
import { camelCase } from 'lodash'

export function deceasedPlaceOfBirth(): SerializedFormField[] {
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
    ...getAddressFields('', EventLocationAddressCases.PLACE_OF_BIRTH)
      .filter(
        ({ name }) =>
          !['place-of-birth', 'placeOfBirth', 'birthLocation'].includes(name)
      )
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
      }))
  ]
}

export function reasonForLateRegistration(): SerializedFormField {
  const fieldName: string = 'lateRegistrationReason'
  const fieldId: string = `death.deathEvent.death-event-details.${fieldName}`

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: false,
    type: 'TEXT',
    label: {
      id: 'form.customField.label.lateRegistrationReason',
      description:
        'A form field that asks for the reason for late registration',
      defaultMessage: 'Reason for late registration (after 90 days)'
    },
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals: [
      {
        action: 'hide',
        expression:
          '!values.deathDate || (Math.ceil((new Date() - new Date(values.deathDate)) / (1000 * 60 * 60 * 24)) <= 90)'
      }
    ],
    maxLength: 250
  }
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
      required: true,
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

export function icd11code(): SerializedFormField {
  const fieldName: string = 'icdCode'
  const fieldId: string = `death.deathEvent.death-event-details.${fieldName}`

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: false,
    type: 'TEXT',
    label: {
      id: 'form.customField.label.icdCode',
      description: 'A form field that asks for the ICD11 code & description',
      defaultMessage: 'ICD11 code and description'
    },
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals: [
      {
        action: 'hide',
        expression: 'values.causeOfDeathEstablished === "false"'
      }
    ],
    maxLength: 250
  }
}

export function pointOfContactHeader(): SerializedFormField {
  return {
    name: 'pointOfContactTitle',
    type: 'HEADING3',
    readonly: true,
    label: {
      id: 'form.customField.label.pointOfContact',
      description: 'A form field header with label Point of contact',
      defaultMessage: 'Point of contact'
    },
    previewGroup: 'placeOfBirth',
    initialValue: '',
    validator: [],
    conditionals: []
  }
}

export function declarationWitness(): SerializedFormField[] {
  return [
    {
      name: 'declarationWitnessHeading',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.declarationWitnessHeading',
      custom: true,
      readonly: true,
      type: 'HEADING3',
      label: {
        id: 'form.customField.label.declarationWitnessHeading',
        description:
          'A form field heading for the details of the declaration witness',
        defaultMessage: 'Declaration witness'
      },
      validator: [],
      conditionals: []
    },
    {
      name: 'witnessSurname',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.witnessSurname',
      custom: true,
      required: true,
      type: 'TEXT',
      label: formMessageDescriptors.firstNames,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        'death.deathEvent.death-event-details.witnessSurname'
      ),
      conditionals: [],
      maxLength: 250
    },
    {
      name: 'witnessGivenName',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.witnessGivenName',
      custom: true,
      required: true,
      type: 'TEXT',
      label: formMessageDescriptors.middleName,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        'death.deathEvent.death-event-details.witnessGivenName'
      ),
      conditionals: [],
      maxLength: 250
    },
    {
      name: 'witnessOtherName',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.witnessOtherName',
      custom: true,
      required: true,
      type: 'TEXT',
      label: formMessageDescriptors.familyName,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        'death.deathEvent.death-event-details.witnessOtherName'
      ),
      conditionals: [],
      maxLength: 250
    },
    {
      name: 'witnessIdType',
      customQuestionMappingId:
        'death.deathEvent.death-event-details.witnessIdType',
      custom: true,
      required: true,
      type: 'SELECT_WITH_OPTIONS',
      label: {
        id: 'form.field.label.iDType',
        description: 'A form field that asks for the type of ID.',
        defaultMessage: 'Type of ID'
      },
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        'death.deathEvent.death-event-details.witnessIdType'
      ),
      placeholder: formMessageDescriptors.formSelectPlaceholder,
      conditionals: [],
      options: idTypeOptions
    },
    ...idTypeOptions
      .filter((opt) => opt.value !== 'NONE')
      .map(({ value }): SerializedFormField => {
        const fieldName = `witness${uppercaseFirstLetter(camelCase(value))}`
        return {
          name: fieldName,
          required: true,
          custom: true,
          type: 'TEXT',
          label: {
            id: 'form.field.label.iD',
            description: 'A form field that asks for the id number.',
            defaultMessage: 'ID number'
          },
          initialValue: '',
          validator: [],
          mapping: {
            template: {
              fieldName,
              operation: 'identityToFieldTransformer',
              parameters: ['id', value]
            },
            mutation: {
              operation: 'fieldToIdentityTransformer',
              parameters: ['id', value]
            },
            query: {
              operation: 'identityToFieldTransformer',
              parameters: ['id', value]
            }
          },
          conditionals: [
            {
              action: 'hide',
              expression: `(values.witnessIdType!=="${value}") || (values.witnessIdType==="NONE")`
            }
          ],
          maxLength: 250
        }
      }),
    {
      name: 'placeOfResidenceTitle',
      type: 'HEADING3',
      label: formMessageDescriptors.primaryAddress,
      previewGroup: 'placeOfResidence',
      initialValue: '',
      validator: [],
      conditionals: []
    },
    ...getAddressFields('witness', AddressCases.PRIMARY_ADDRESS).map(
      (field) => ({
        ...field,
        custom: true,
        customQuestionMappingId: `death.informant.informant-view-group.${field.name}`,
        previewGroup: 'placeOfResidence',
        mapping: getCustomFieldMapping(
          `death.informant.informant-view-group.${field.name}`
        )
      })
    )
  ]
}
