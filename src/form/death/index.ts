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
  exactDateOfBirthUnknown,
  getAgeOfIndividualInYears,
  registrationEmail,
  registrationPhone,
  divider,
  getOccupation
} from '../common/common-optional-fields'
import {
  getGender,
  getBirthDate,
  getFamilyNameField,
  getFirstNameField,
  getNationality,
  otherInformantType,
  getMiddleNameField
} from '../common/common-required-fields'
import {
  deathInformantType,
  getCauseOfDeathEstablished,
  getDeathDate,
  getMannerOfDeath
} from './required-fields'
import { formMessageDescriptors } from '../common/messages'
import { Event, ISerializedForm } from '../types/types'
import {
  informantBirthDateConditionals,
  informantFamilyNameConditionals,
  ageOfIndividualValidators,
  ageOfDeceasedConditionals,
  informantFirstNameConditionals,
  exactDateOfBirthUnknownConditional,
  deathLateRegistrationReason,
  isValidBirthDate,
  /*fathersDetailsExistConditionals,
  fatherFirstNameConditionals,
  fatherFamilyNameConditionals,
  fathersBirthDateConditionals,
  parentsBirthDateValidators,
  detailsExistConditional,
  motherFirstNameConditionals,
  motherFamilyNameConditionals,
  mothersBirthDateConditionals,
  mothersDetailsExistConditionals,
  spouseDetailsExistConditionals,
  detailsExist,
  spouseBirthDateConditionals,
  spouseFamilyNameConditionals,
  spouseFirstNameConditionals,*/
  hideIfNidIntegrationEnabled
} from '../common/default-validation-conditionals'
import {
  documentsSection,
  previewSection,
  registrationSection,
  reviewSection
} from './required-sections'
import {
  deceasedNameInEnglish,
  deceasedPlaceOfBirth as deceasedPlaceOfBirthPreviewGroup,
  informantNameInEnglish,
  witnessNameInEnglish,
  witnessPlaceOfResidence
} from '../common/preview-groups'
import { certificateHandlebars } from './certficate-handlebars'
import { getCommonSectionMapping } from '@countryconfig/utils/mapping/field-mapping-utils'
import {
  declarationWitnessFields,
  getIdNumberFields,
  getIDType,
  pointOfContactHeader,
  reasonForLateRegistration
} from '../custom-fields'
import {
  deceasedPlaceOfBirth,
  causeOfDeath,
  individualWhoFoundTheBody,
  timeOfDeath
} from './custom-fields'
//import { getSectionMapping } from '@countryconfig/utils/mapping/section/death/mapping-utils'

// import { createCustomFieldExample } from '../custom-fields'

// ======================= FORM CONFIGURATION =======================

// A REGISTRATION FORM IS MADE UP OF PAGES OR "SECTIONS"

// A "SECTION" CAN BE SPLIT OVER MULTIPLE SUB-PAGES USING "GROUPS"

// GROUPS CONTAIN A FIELDS ARRAY AND EACH FIELD IS RENDERED BY A FORM FIELD FUNCTION

// MOVE FORM FIELD FUNCTIONS UP AND DOWN TO CHANGE THE VERTICAL ORDER OF FIELDS

// IN EACH GROUP, REQUIRED FIELDS MUST BE INCLUDED AS-IS FOR OPENCRVS TO FUNCTION

// OPTIONAL FIELDS CAN BE COMMENTED OUT OR REMOVED IF NOT REQUIRED

// DUPLICATE & FOLLOW THE INSTRUCTIONS IN THE createCustomFieldExample FUNCTION WHEN REQUIRED FOR ADDING NEW CUSTOM FIELDS

export const deathForm = (addressHierarchy: string[]): ISerializedForm => ({
  sections: [
    registrationSection, // REQUIRED HIDDEN SECTION CONTAINING IDENTIFIERS
    {
      id: 'information',
      viewType: 'form',
      name: {
        defaultMessage: 'Information',
        description: 'Form section name for Information',
        id: 'form.section.information.name'
      },
      groups: [
        {
          id: 'information-group',
          title: {
            defaultMessage:
              'Introduce the death registration process to the informant',
            description: 'Event information title for the birth',
            id: 'register.eventInfo.death.title'
          },
          conditionals: [
            {
              action: 'hide',
              expression: 'window.config.HIDE_DEATH_EVENT_REGISTER_INFORMATION'
            }
          ],
          fields: [
            {
              name: 'list',
              type: 'BULLET_LIST',
              items: [
                {
                  defaultMessage:
                    'I am going to help you make a declaration of death.',
                  description: 'Form information for birth',
                  id: 'form.section.information.death.bullet1'
                },
                {
                  defaultMessage:
                    'As the legal Informant it is important that all the information provided by you is accurate.',
                  description: 'Form information for birth',
                  id: 'form.section.information.death.bullet2'
                },
                {
                  defaultMessage:
                    'Once the declaration is processed you will receive an SMS to tell you when to visit the office to collect the certificate - Take your ID with you.',
                  description: 'Form information for birth',
                  id: 'form.section.information.death.bullet3'
                },
                {
                  defaultMessage:
                    'Make sure you collect the certificate. A death certificate is critical to support with inheritance claims and to resolve the affairs of the deceased e.g. closing bank accounts and setting loans.',
                  description: 'Form information for birth',
                  id: 'form.section.information.death.bullet4'
                }
              ],
              label: {
                id: 'register.eventInfo.death.title'
              },
              initialValue: '',
              validator: []
            }
          ]
        }
      ]
    },
    {
      id: 'deceased',
      viewType: 'form',
      name: formMessageDescriptors.deceasedName,
      title: formMessageDescriptors.deceasedTitle,
      groups: [
        {
          id: 'deceased-view-group',
          fields: [
            getFirstNameField(
              'deceasedNameInEnglish',
              [],
              certificateHandlebars.deceasedFirstName
            ), // Required field.  Names in Latin characters must be provided for international passport
            getMiddleNameField(
              'deceasedNameInEnglish',
              [],
              certificateHandlebars.deceasedMiddleName
            ),
            getFamilyNameField(
              'deceasedNameInEnglish',
              [],
              certificateHandlebars.deceasedFamilyName
            ), // Required field.  Names in Latin characters must be provided for international passport
            getNationality(certificateHandlebars.deceasedNationality, []),
            getIDType('death', 'deceased', [], true),
            ...getIdNumberFields('deceased', [], true),
            getGender(certificateHandlebars.deceasedGender), // Required field.
            getBirthDate(
              'deceasedBirthDate',
              [
                {
                  action: 'hide',
                  expression: 'values.exactDateOfBirthUnknown'
                }
              ],
              isValidBirthDate,
              certificateHandlebars.deceasedBirthDate
            ), // Required field.,
            exactDateOfBirthUnknown([]),
            getAgeOfIndividualInYears(
              formMessageDescriptors.ageOfDeceased,
              exactDateOfBirthUnknownConditional,
              ageOfDeceasedConditionals,
              certificateHandlebars.ageOfDeceasedInYears
            ),
            getOccupation(certificateHandlebars.deceasedOccupation),
            ...deceasedPlaceOfBirth(addressHierarchy),
            divider('place-of-birth-seperator')
            // PLACE OF BIRTH FIEDLS WILL RENDER HERE
          ],
          previewGroups: [
            deceasedNameInEnglish,
            deceasedPlaceOfBirthPreviewGroup
          ]
        }
      ]
    },
    {
      id: 'deathEvent',
      viewType: 'form',
      name: formMessageDescriptors.deathEventName,
      title: formMessageDescriptors.deathEventTitle,
      groups: [
        {
          id: 'death-event-details',
          fields: [
            getDeathDate(
              'deathDate',
              [],
              [
                {
                  operation: 'isValidDeathOccurrenceDate'
                }
              ]
            ),
            timeOfDeath(),
            reasonForLateRegistration(
              'death.deathEvent.death-event-details.lateRegistrationReason',
              formMessageDescriptors.deathLateRegistrationReason,
              deathLateRegistrationReason
            ),
            // PLACE OF DEATH FIELDS WILL RENDER HERE
            getMannerOfDeath,
            ...individualWhoFoundTheBody(),
            getCauseOfDeathEstablished,
            causeOfDeath()
          ]
        }
      ]
    },
    {
      id: 'informant',
      viewType: 'form',
      name: formMessageDescriptors.informantName,
      title: formMessageDescriptors.deathInformantTitle,
      groups: [
        {
          id: 'informant-view-group',
          fields: [
            deathInformantType,
            otherInformantType(Event.Death),
            getFirstNameField(
              'informantNameInEnglish',
              informantFirstNameConditionals,
              certificateHandlebars.informantFirstName
            ), // Required field.
            getMiddleNameField(
              'informantNameInEnglish',
              [],
              certificateHandlebars.informantMiddleName
            ),
            getFamilyNameField(
              'informantNameInEnglish',
              informantFamilyNameConditionals,
              certificateHandlebars.informantFamilyName
            ), // Required field.
            getBirthDate(
              'informantBirthDate',
              informantBirthDateConditionals,
              [
                {
                  operation: 'dateFormatIsCorrect',
                  parameters: []
                },
                {
                  operation: 'dateInPast',
                  parameters: []
                }
              ],
              certificateHandlebars.informantBirthDate
            ), // Required field.
            exactDateOfBirthUnknown([]),
            getAgeOfIndividualInYears(
              formMessageDescriptors.ageOfInformant,
              exactDateOfBirthUnknownConditional,
              ageOfIndividualValidators
            ),
            getNationality(certificateHandlebars.informantNationality, []),
            getIDType('death', 'informant', hideIfNidIntegrationEnabled, true),
            ...getIdNumberFields(
              'informant',
              hideIfNidIntegrationEnabled,
              true
            ),
            // ADDRESS FIELDS WILL RENDER HERE
            pointOfContactHeader(),
            registrationPhone,
            registrationEmail
          ],
          previewGroups: [
            informantNameInEnglish,
            witnessNameInEnglish,
            witnessPlaceOfResidence
          ]
        }
      ],
      mapping: getCommonSectionMapping('informant')
    },
    /*
    OTHER POSSIBLE SECTIONS FOR DEATH INCLUDE:
    {
      id: 'spouse',
      viewType: 'form',
      name: formMessageDescriptors.spouseSectionName,
      title: formMessageDescriptors.spouseSectionName,
      groups: [
        {
          id: 'spouse-view-group',
          fields: [
            getDetailsExist(
              formMessageDescriptors.spouseDetailsExist,
              spouseDetailsExistConditionals
            ),
            divider('spouse-details-seperator', spouseDetailsExistConditionals),
            getReasonNotExisting(certificateHandlebars.spouseReasonNotApplying),
            getFirstNameField(
              'spouseNameInEnglish',
              spouseFirstNameConditionals,
              certificateHandlebars.spouseFirstName
            ), // Required field. In Farajaland, we have built the option to integrate with MOSIP. So we have different conditionals for each name to check MOSIP responses.  You could always refactor firstNamesEng for a basic setup
            getFamilyNameField(
              'spouseNameInEnglish',
              spouseFamilyNameConditionals,
              certificateHandlebars.spouseFamilyName
            ), // Required field.
            getBirthDate(
              'spouseBirthDate',
              spouseBirthDateConditionals,
              [
                {
                  operation: 'dateFormatIsCorrect',
                  parameters: []
                },
                {
                  operation: 'dateInPast',
                  parameters: []
                }
              ],
              certificateHandlebars.spouseBirthDate
            ), // Required field.
            exactDateOfBirthUnknown(detailsExist),
            getAgeOfIndividualInYears(
              formMessageDescriptors.ageOfSpouse,
              exactDateOfBirthUnknownConditional.concat(detailsExist),
              ageOfIndividualValidators
            ),
            getNationality(
              certificateHandlebars.spouseNationality,
              detailsExist
            ),
            getIDType('death', 'spouse', detailsExist, true),
            ...getIDNumberFields('spouse', detailsExist, true),
            // preceding field of address fields
            divider('spouse-nid-seperator', detailsExist),
            // ADDRESS FIELDS WILL RENDER HERE
            divider('spouse-address-separator')
          ],
          previewGroups: [spouseNameInEnglish]
        }
      ],
      mapping: getSectionMapping('spouse')
    },
    {
      id: 'mother',
      viewType: 'form',
      name: formMessageDescriptors.motherName,
      title: formMessageDescriptors.motherTitle,
      groups: [
        {
          id: 'mother-view-group',
          fields: [
            getDetailsExist(
              formMessageDescriptors.mothersDetailsExist,
              mothersDetailsExistConditionals
            ),
            divider(
              'mother-details-seperator',
              mothersDetailsExistConditionals
            ),
            getReasonNotExisting(certificateHandlebars.motherReasonNotApplying),
            getFirstNameField(
              'motherNameInEnglish',
              motherFirstNameConditionals,
              certificateHandlebars.motherFirstName
            ), // Required field.
            getFamilyNameField(
              'motherNameInEnglish',
              motherFamilyNameConditionals,
              certificateHandlebars.motherFamilyName
            ), // Required field.
            getBirthDate(
              'motherBirthDate',
              mothersBirthDateConditionals,
              parentsBirthDateValidators,
              certificateHandlebars.motherBirthDate
            ), // Required field.
            exactDateOfBirthUnknown(detailsExistConditional),
            getAgeOfIndividualInYears(
              formMessageDescriptors.ageOfMother,
              exactDateOfBirthUnknownConditional.concat(detailsExistConditional)
            ),
            getNationality(
              certificateHandlebars.motherNationality,
              detailsExist
            ), // Required field.
            getNationalID(
              'iD',
              hideIfNidIntegrationEnabled.concat(detailsExist),
              getNationalIDValidators('mother'),
              certificateHandlebars.motherNID
            ),
            // preceding field of address fields
            divider('mother-nid-seperator', detailsExist),
            // ADDRESS FIELDS WILL RENDER HERE
            divider('mother-address-seperator', detailsExist),
            getOccupation(certificateHandlebars.motherOccupation, [
              {
                action: 'hide',
                expression: '!values.detailsExist'
              }
            ])
          ],
          previewGroups: [motherNameInEnglish]
        }
      ],
      mapping: getSectionMapping('mother')
    },
    {
      id: 'father',
      viewType: 'form',
      name: {
        defaultMessage: 'Father',
        description: 'Form section name for Father',
        id: 'form.section.father.name'
      },
      title: {
        defaultMessage: "Father's details",
        description: 'Form section title for Father',
        id: 'form.section.father.title'
      },
      groups: [
        {
          id: 'father-view-group',
          fields: [
            getDetailsExist(
              formMessageDescriptors.fathersDetailsExist,
              fathersDetailsExistConditionals
            ), // Strongly recommend is required if you want to register abandoned / orphaned children!
            divider(
              'father-details-seperator',
              fathersDetailsExistConditionals
            ),
            getReasonNotExisting('fatherReasonNotApplying'), // Strongly recommend is required if you want to register abandoned / orphaned children!
            getFirstNameField(
              'fatherNameInEnglish',
              fatherFirstNameConditionals,
              certificateHandlebars.fatherFirstName
            ), // Required field.
            getFamilyNameField(
              'fatherNameInEnglish',
              fatherFamilyNameConditionals,
              certificateHandlebars.fatherFamilyName
            ), // Required field.
            getBirthDate(
              'fatherBirthDate',
              fathersBirthDateConditionals,
              parentsBirthDateValidators,
              certificateHandlebars.fatherBirthDate
            ), // Required field.
            exactDateOfBirthUnknown(detailsExistConditional),
            getAgeOfIndividualInYears(
              formMessageDescriptors.ageOfFather,
              exactDateOfBirthUnknownConditional.concat(detailsExistConditional)
            ),
            getNationality(
              certificateHandlebars.fatherNationality,
              detailsExist
            ), // Required field.
            getNationalID(
              'iD',
              hideIfNidIntegrationEnabled.concat(detailsExist),
              getNationalIDValidators('father'),
              certificateHandlebars.fatherNID
            ),
            // preceding field of address fields
            divider('father-nid-seperator', detailsExist),
            // ADDRESS FIELDS WILL RENDER HERE
            divider('father-address-seperator', detailsExist),
            getOccupation(certificateHandlebars.fatherOccupation, [
              {
                action: 'hide',
                expression: '!values.detailsExist'
              }
            ])
          ],
          previewGroups: [fatherNameInEnglish]
        }
      ],
      mapping: getSectionMapping('father')
    },*/
    {
      id: 'witness',
      viewType: 'form',
      name: formMessageDescriptors.declarationWitness,
      title: formMessageDescriptors.declarationWitness,
      groups: [
        {
          id: 'witness-view-group',
          fields: declarationWitnessFields('death', true),
          conditionals: [
            {
              action: 'hide',
              expression:
                "draftData?.deathEvent?.placeOfDeath === 'HEALTH_FACILITY'"
            }
          ]
        }
      ]
    },
    documentsSection,
    previewSection,
    reviewSection
  ]
})
