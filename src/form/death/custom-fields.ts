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
import { EventLocationAddressCases, SerializedFormField } from '../types/types'
import { getCustomFieldMapping } from '@countryconfig/utils/mapping/field-mapping-utils'
import { formMessageDescriptors } from '../common/messages'
import { getAddressFields } from '../addresses/address-fields'

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
