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
import { formMessageDescriptors } from './common/messages'
import {
  Conditional,
  IFormSectionData,
  ISelectOption,
  SerializedFormField
} from './types/types'
import { getCustomFieldMapping } from '@countryconfig/utils/mapping/field-mapping-utils'
import { getNationalIDValidators } from './common/default-validation-conditionals'
import { MessageDescriptor } from 'react-intl'

// ======================= CUSTOM FIELD CONFIGURATION =======================

// A CUSTOM FIELD CAN BE ADDED TO APPEAR IN ANY SECTION
// DUPLICATE AND RENAME FUNCTIONS LIKE THESE IN ORDER TO USE SIMILAR FIELDS

export const idTypeOptions = [
  {
    value: 'NATIONAL_ID' as const,
    label: {
      defaultMessage: 'National ID',
      description: 'Option for form field: Type of ID',
      id: 'form.field.label.iDTypeNationalID'
    }
  },
  {
    value: 'PASSPORT' as const,
    label: {
      defaultMessage: 'Passport',
      description: 'Option for form field: Type of ID',
      id: 'form.field.label.iDTypePassport'
    }
  },
  {
    value: 'ALIEN_ID' as const,
    label: {
      defaultMessage: 'Alien ID',
      description: 'Option for form field: Type of ID',
      id: 'form.field.label.iDTypeAlienID'
    }
  },
  {
    value: 'REFUGEE_ID' as const,
    label: {
      defaultMessage: 'Refugee ID',
      description: 'Option for form field: Type of ID',
      id: 'form.field.label.iDTypeRefugeeID'
    }
  },
  {
    value: 'REFUGEE_ATTESTATION_ID' as const,
    label: {
      defaultMessage: 'Refugee Attestation ID',
      description: 'Option for form field: Type of ID',
      id: 'form.field.label.iDTypeRefugeeAttestationID'
    }
  },
  {
    value: 'NONE' as const,
    label: {
      defaultMessage: 'None',
      description: 'Option for form field: Type of ID',
      id: 'form.field.label.iDTypeNone'
    }
  }
]

const idTypeConditional = ({
  field,
  values
}: {
  field: ISelectOption
  values: IFormSectionData
}) => {
  if (!values.nationality) {
    return true
  }
  if (
    ['ALIEN_ID', 'REFUGEE_ID', 'REFUGEE_ATTESTATION_ID'].includes(field.value)
  ) {
    return values.nationality !== 'UGA'
  }
  if (field.value === 'NATIONAL_ID') {
    return values.nationality === 'UGA'
  }
  return true
}

export function getIDType(
  event: 'birth' | 'death' | 'marriage',
  sectionId: string,
  conditionals: Conditional[] = [],
  required: boolean
): SerializedFormField {
  const fieldName: string = `${sectionId}IdType`
  const fieldId: string = `${event}.${sectionId}.${sectionId}-view-group.${fieldName}`
  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required,
    type: 'SELECT_WITH_OPTIONS',
    label: {
      id: 'form.field.label.iDType',
      description: 'A form field that asks for the type of ID.',
      defaultMessage: 'Type of ID'
    },
    initialValue: '',
    optionCondition: `${idTypeConditional}`,
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    placeholder: formMessageDescriptors.formSelectPlaceholder,
    conditionals,
    options: idTypeOptions
  }
}

export function getIdNumberFields(
  sectionId: string,
  conditionals: Conditional[] = [],
  required = true
): SerializedFormField[] {
  return [
    {
      name: `${sectionId}NationalId`,
      required,
      custom: true,
      type: 'TEXT',
      label: {
        id: 'form.field.label.nin',
        description: 'A form field that asks for the nin',
        defaultMessage: 'NIN'
      },
      initialValue: '',
      validator: getNationalIDValidators(sectionId),
      mapping: {
        template: {
          fieldName: `${sectionId}NationalId`,
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'NATIONAL_ID']
        },
        mutation: {
          operation: 'fieldToIdentityTransformer',
          parameters: ['id', 'NATIONAL_ID']
        },
        query: {
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'NATIONAL_ID']
        }
      },
      conditionals: [
        {
          action: 'hide',
          expression: `values.${sectionId}IdType !== "NATIONAL_ID" || values.${sectionId}IdType === "NONE"`
        }
      ].concat(conditionals),
      maxLength: 14
    },
    {
      name: `${sectionId}Passport`,
      required,
      custom: true,
      type: 'TEXT',
      label: {
        id: 'form.field.label.passportNumber',
        description: 'A form field that asks for the passport number',
        defaultMessage: 'Passport Number'
      },
      initialValue: '',
      validator: [],
      mapping: {
        template: {
          fieldName: `${sectionId}Passport`,
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'PASSPORT']
        },
        mutation: {
          operation: 'fieldToIdentityTransformer',
          parameters: ['id', 'PASSPORT']
        },
        query: {
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'PASSPORT']
        }
      },
      conditionals: [
        {
          action: 'hide',
          expression: `values.${sectionId}IdType !== "PASSPORT" || values.${sectionId}IdType === "NONE"`
        }
      ].concat(conditionals),
      maxLength: 32
    },
    {
      name: `${sectionId}AlienId`,
      required,
      custom: true,
      type: 'TEXT',
      label: {
        defaultMessage: 'Alien ID',
        description: 'Option for form field: Type of ID',
        id: 'form.field.label.iDTypeAlienID'
      },
      initialValue: '',
      validator: [],
      mapping: {
        template: {
          fieldName: `${sectionId}AlienId`,
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'ALIEN_ID']
        },
        mutation: {
          operation: 'fieldToIdentityTransformer',
          parameters: ['id', 'ALIEN_ID']
        },
        query: {
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'ALIEN_ID']
        }
      },
      conditionals: [
        {
          action: 'hide',
          expression: `values.${sectionId}IdType !== "ALIEN_ID" || values.${sectionId}IdType === "NONE"`
        }
      ].concat(conditionals),
      maxLength: 32
    },
    {
      name: `${sectionId}RefugeeId`,
      required,
      custom: true,
      type: 'TEXT',
      label: {
        defaultMessage: 'Refugee ID',
        description: 'Option for form field: Type of ID',
        id: 'form.field.label.iDTypeRefugeeID'
      },
      initialValue: '',
      validator: [],
      mapping: {
        template: {
          fieldName: `${sectionId}RefugeeId`,
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'REFUGEE_ID']
        },
        mutation: {
          operation: 'fieldToIdentityTransformer',
          parameters: ['id', 'REFUGEE_ID']
        },
        query: {
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'REFUGEE_ID']
        }
      },
      conditionals: [
        {
          action: 'hide',
          expression: `values.${sectionId}IdType !== "REFUGEE_ID" || values.${sectionId}IdType === "NONE"`
        }
      ].concat(conditionals),
      maxLength: 32
    },
    {
      name: `${sectionId}RefugeeAttestationId`,
      required,
      custom: true,
      type: 'TEXT',
      label: formMessageDescriptors.iDTypeRefugeeAttestationID,
      initialValue: '',
      validator: [],
      mapping: {
        template: {
          fieldName: `${sectionId}RefugeeAttestationId`,
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'REFUGEE_ATTESTATION_ID']
        },
        mutation: {
          operation: 'fieldToIdentityTransformer',
          parameters: ['id', 'REFUGEE_ATTESTATION_ID']
        },
        query: {
          operation: 'identityToFieldTransformer',
          parameters: ['id', 'REFUGEE_ATTESTATION_ID']
        }
      },
      conditionals: [
        {
          action: 'hide',
          expression: `values.${sectionId}IdType !== "REFUGEE_ATTESTATION_ID" || values.${sectionId}IdType === "NONE"`
        }
      ].concat(conditionals),
      maxLength: 32
    }
  ]
}

export function reasonForLateRegistration(
  fieldId: string,
  label: MessageDescriptor,
  conditionals: Conditional[]
): SerializedFormField {
  return {
    name: fieldId.split('.')[3],
    customQuestionMappingId: fieldId,
    custom: true,
    required: true,
    type: 'TEXT',
    label,
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals,
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

export function declarationWitnessFields(
  event: 'birth' | 'death',
  required: boolean
): SerializedFormField[] {
  return [
    {
      name: 'witnessSurname',
      customQuestionMappingId: `${event}.witness.witness-view-group.witnessSurname`,
      custom: true,
      required,
      previewGroup: 'witnessNameInEnglish',
      type: 'TEXT',
      label: formMessageDescriptors.firstNames,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        `${event}.witness.witness-view-group.witnessSurname`
      ),
      conditionals: [],
      maxLength: 250
    },
    {
      name: 'witnessGivenName',
      customQuestionMappingId: `${event}.witness.witness-view-group.witnessGivenName`,
      custom: true,
      required,
      previewGroup: 'witnessNameInEnglish',
      type: 'TEXT',
      label: formMessageDescriptors.middleName,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        `${event}.witness.witness-view-group.witnessGivenName`
      ),
      conditionals: [],
      maxLength: 250
    },
    {
      name: 'witnessOtherName',
      customQuestionMappingId: `${event}.witness.witness-view-group.witnessOtherName`,
      custom: true,
      required: false,
      previewGroup: 'witnessNameInEnglish',
      type: 'TEXT',
      label: formMessageDescriptors.familyName,
      initialValue: '',
      validator: [],
      mapping: getCustomFieldMapping(
        `${event}.witness.witness-view-group.witnessOtherName`
      ),
      conditionals: [],
      maxLength: 250
    },
    getIDType(event, 'witness', [], required),
    ...getIdNumberFields('witness', [], required).map((fieldDef) => {
      return {
        ...fieldDef,
        customQuestionMappingId: `${event}.witness.witness-view-group.${fieldDef.name}`,
        mapping: getCustomFieldMapping(
          `${event}.witness.witness-view-group.${fieldDef.name}`
        )
      }
    }),
    pointOfContactHeader(),
    {
      name: 'registrationPhone',
      customQuestionMappingId: `${event}.witness.witness-view-group.registrationPhone`,
      custom: true,
      type: 'TEL',
      label: formMessageDescriptors.phoneNumber,
      required: false,
      initialValue: '',
      validator: [
        {
          operation: 'phoneNumberFormat'
        }
      ],
      conditionals: [],
      mapping: getCustomFieldMapping(
        `${event}.witness.witness-view-group.registrationPhone`
      )
    },
    {
      name: 'registrationEmail',
      customQuestionMappingId: `${event}.witness.witness-view-group.registrationEmail`,
      custom: true,
      type: 'TEXT',
      label: formMessageDescriptors.email,
      required: false,
      initialValue: '',
      validator: [
        {
          operation: 'emailAddressFormat'
        }
      ],
      conditionals: [],
      mapping: getCustomFieldMapping(
        `${event}.witness.witness-view-group.registrationEmail`
      )
    }
  ]
}
export function createCustomFieldExample(): SerializedFormField {
  // GIVE THE FIELD A UNIQUE NAME.  IF THE NAME IS ALREADY IN USE, YOU WILL NOTICE AN ERROR ON PAGE LOAD IN DEVELOPMENT
  const fieldName: string = 'favoriteColor'
  // THE fieldId STRING IS A DOT SEPARATED STRING AND IS IMPORTANT TO SET CORRECTLY DEPENDING ON WHERE THE CUSTOM FIELD IS LOCATED
  // THE FORMAT IS event.sectionId.groupId.uniqueFieldName
  const fieldId: string = `birth.child.child-view-group.${fieldName}`
  // IN ORDER TO USE THE VALUE ON A CERTIFICATE
  // THE groupId IS IGNORED AND THE HANDLEBAR WILL LOG IN THE CONSOLE
  // IN THIS EXAMPLE, IT WILL RESOLVE IN CAMELCASE TO "{{birthChildFavouriteColor}}"

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    required: true,
    type: 'TEXT', // ANY FORM FIELD TYPE IS POSSIBLE. ADD ADDITIONAL PROPS AS REQUIRED.  REFER TO THE form/README.md FILE
    label: {
      id: 'form.customField.label.favoriteColor',
      description: 'A form field that asks for the persons favorite color.',
      defaultMessage: 'What is your favorite color?'
    },
    initialValue: '',
    validator: [], // EDIT VALIDATORS AS YOU SEE FIT
    mapping: getCustomFieldMapping(fieldId), // ALL CUSTOM FIELDS MUST USE THIS MAPPING FUNCTION
    conditionals: [], // EDIT VALIDATORS AS YOU SEE FIT
    maxLength: 250
  }
}

export function getCertificateIsFree(
  conditionals: Conditional[]
): SerializedFormField {
  /**/
  // GIVE THE FIELD A UNIQUE NAME.  IF THE NAME IS ALREADY IN USE, YOU WILL NOTICE AN ERROR ON PAGE LOAD IN DEVELOPMENT
  const fieldName: string = 'certificateCost'
  // THE fieldId STRING IS A DOT SEPARATED STRING AND IS IMPORTANT TO SET CORRECTLY DEPENDING ON WHERE THE CUSTOM FIELD IS LOCATED
  // THE FORMAT IS event.sectionId.groupId.uniqueFieldName
  const fieldId: string = `birth.child.child-view-group.${fieldName}`
  // IN ORDER TO USE THE VALUE ON A CERTIFICATE
  // THE groupId IS IGNORED AND THE HANDLEBAR WILL LOG IN THE CONSOLE
  // IN THIS EXAMPLE, IT WILL RESOLVE IN CAMELCASE TO "{{birthChildFavouriteColor}}"

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    type: 'PARAGRAPH', // ANY FORM FIELD TYPE IS POSSIBLE. ADD ADDITIONAL PROPS AS REQUIRED.  REFER TO THE form/README.md FILE
    label: {
      id: 'form.customField.label.certificateCostIsFree',
      description: '',
      defaultMessage: 'Your paper certificate is free'
    },
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals
  }
}

export function getCertificateLateCost(
  conditionals: Conditional[]
): SerializedFormField {
  // GIVE THE FIELD A UNIQUE NAME.  IF THE NAME IS ALREADY IN USE, YOU WILL NOTICE AN ERROR ON PAGE LOAD IN DEVELOPMENT
  const fieldName: string = 'certificateLateCost'
  // THE fieldId STRING IS A DOT SEPARATED STRING AND IS IMPORTANT TO SET CORRECTLY DEPENDING ON WHERE THE CUSTOM FIELD IS LOCATED
  // THE FORMAT IS event.sectionId.groupId.uniqueFieldName
  const fieldId: string = `birth.child.child-view-group.${fieldName}`
  // IN ORDER TO USE THE VALUE ON A CERTIFICATE
  // THE groupId IS IGNORED AND THE HANDLEBAR WILL LOG IN THE CONSOLE
  // IN THIS EXAMPLE, IT WILL RESOLVE IN CAMELCASE TO "{{birthChildFavouriteColor}}"

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    type: 'PARAGRAPH', // ANY FORM FIELD TYPE IS POSSIBLE. ADD ADDITIONAL PROPS AS REQUIRED.  REFER TO THE form/README.md FILE
    label: {
      id: 'form.customField.label.certificateLateCost',
      description: '',
      defaultMessage: 'Your paper certificate is late'
    },
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals
  }
}

export function getCertificateDelayedCost(
  conditionals: Conditional[]
): SerializedFormField {
  // GIVE THE FIELD A UNIQUE NAME.  IF THE NAME IS ALREADY IN USE, YOU WILL NOTICE AN ERROR ON PAGE LOAD IN DEVELOPMENT
  const fieldName: string = 'certificateDelayedCost'
  // THE fieldId STRING IS A DOT SEPARATED STRING AND IS IMPORTANT TO SET CORRECTLY DEPENDING ON WHERE THE CUSTOM FIELD IS LOCATED
  // THE FORMAT IS event.sectionId.groupId.uniqueFieldName
  const fieldId: string = `birth.child.child-view-group.${fieldName}`
  // IN ORDER TO USE THE VALUE ON A CERTIFICATE
  // THE groupId IS IGNORED AND THE HANDLEBAR WILL LOG IN THE CONSOLE
  // IN THIS EXAMPLE, IT WILL RESOLVE IN CAMELCASE TO "{{birthChildFavouriteColor}}"

  return {
    name: fieldName,
    customQuestionMappingId: fieldId,
    custom: true,
    type: 'PARAGRAPH', // ANY FORM FIELD TYPE IS POSSIBLE. ADD ADDITIONAL PROPS AS REQUIRED.  REFER TO THE form/README.md FILE
    label: {
      id: 'form.customField.label.certificateDelayedCost',
      description: '',
      defaultMessage: 'Your paper certificate is delayed'
    },
    initialValue: '',
    validator: [],
    mapping: getCustomFieldMapping(fieldId),
    conditionals
  }
}
