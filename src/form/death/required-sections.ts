import { getSectionMapping } from '@countryconfig/utils/mapping/section/death/mapping-utils'
import { formMessageDescriptors } from '../common/messages'
import { ISerializedFormSection } from '../types/types'
import { getFieldMapping } from '@countryconfig/utils/mapping/field-mapping-utils'
import { getInformantsSignature } from '../common/common-optional-fields'

export const registrationSection = {
  id: 'registration',
  viewType: 'hidden',
  name: {
    defaultMessage: 'Registration',
    description: 'Form section name for Registration',
    id: 'form.section.declaration.name'
  },
  groups: [],
  mapping: getSectionMapping('registration')
} as ISerializedFormSection

export const deathDocumentExtraValue = {
  DECEASED_ID_PROOF: 'DECEASED_ID_PROOF',
  DECEASED_DEATH_PROOF: 'DECEASED_DEATH_PROOF',
  DECEASED_DEATH_NOTIFICATION: 'DECEASED_DEATH_NOTIFICATION',
  DECEASED_DEATH_CAUSE_PROOF: 'DECEASED_DEATH_CAUSE_PROOF',
  INFORMANT_ID_PROOF: 'INFORMANT_ID_PROOF'
}

export const deathDocumentType = {
  HOSPITAL_CERTIFICATE_OF_DEATH: 'HOSPITAL_CERTIFICATE_OF_DEATH',
  ATTESTED_LETTER_OF_DEATH: 'ATTESTED_LETTER_OF_DEATH',
  PROOF_OF_CAUSE_OF_DEATH: 'PROOF_OF_CAUSE_OF_DEATH',
  MEDICAL_CERTIFICATE_OF_CAUSE_OF_DEATH:
    'MEDICAL_CERTIFICATE_OF_CAUSE_OF_DEATH',
  BURIAL_RECEIPT: 'BURIAL_RECEIPT',
  FORM_12: 'FORM_12',
  POLICE_CERTIFICATE_OF_DEATH: 'POLICE_CERTIFICATE_OF_DEATH',
  MEDICALLY_CERTIFIED_CAUSE_OF_DEATH: 'MEDICALLY_CERTIFIED_CAUSE_OF_DEATH',
  VERBAL_AUTOPSY_REPORT: 'VERBAL_AUTOPSY_REPORT',
  CORONERS_REPORT: 'CORONERS_REPORT',
  ALIEN_ID: 'ALIEN_ID',
  REFUGEE_ID: 'REFUGEE_ID',
  BIRTH_CERTIFICATE: 'BIRTH_CERTIFICATE',
  NATIONAL_ID: 'NATIONAL_ID',
  PASSPORT: 'PASSPORT',
  OTHER: 'OTHER'
}
export const documentsSection = {
  id: 'documents',
  viewType: 'form',
  name: formMessageDescriptors.documentsName,
  title: formMessageDescriptors.documentsTitle,
  groups: [
    {
      id: 'documents-view-group',
      fields: [
        {
          name: 'paragraph',
          type: 'PARAGRAPH',
          label: formMessageDescriptors.deceasedParagraph,
          initialValue: '',
          validator: []
        },
        {
          name: 'uploadDocForDeceasedDeathNotification',
          type: 'DOCUMENT_UPLOADER_WITH_OPTION',
          label: formMessageDescriptors.deceasedDeathNotification,
          initialValue: '',
          extraValue: deathDocumentExtraValue.DECEASED_DEATH_NOTIFICATION,
          hideAsterisk: true,
          validator: [],
          conditionals: [],
          options: [
            {
              value: deathDocumentType.FORM_12,
              label: formMessageDescriptors.form12
            }
          ],
          mapping: getFieldMapping('documents')
        },
        {
          name: 'uploadDocForDeceasedDeath',
          type: 'DOCUMENT_UPLOADER_WITH_OPTION',
          label: formMessageDescriptors.deceasedDeathProof,
          initialValue: '',
          extraValue: deathDocumentExtraValue.DECEASED_DEATH_PROOF,
          hideAsterisk: true,
          validator: [],
          conditionals: [
            {
              action: 'hide',
              expression:
                'draftData?.deathEvent?.causeOfDeathEstablished === "true"'
            },
            {
              action: 'hide',
              expression: 'draftData?.deathEvent?.placeOfDeath !== "OTHER"'
            }
          ],
          options: [
            {
              value: deathDocumentType.ATTESTED_LETTER_OF_DEATH,
              label: formMessageDescriptors.docTypeLetterOfDeath
            }
          ],
          mapping: getFieldMapping('documents')
        },
        {
          name: 'uploadDocForProofOfCauseOfDeath',
          type: 'DOCUMENT_UPLOADER_WITH_OPTION',
          label: formMessageDescriptors.proofOfCauseOfDeath,
          initialValue: '',
          extraValue: deathDocumentExtraValue.DECEASED_DEATH_PROOF,
          hideAsterisk: true,
          validator: [],
          conditionals: [
            {
              action: 'hide',
              expression:
                'draftData?.deathEvent?.placeOfDeath !== "HEALTH_FACILITY"'
            }
          ],
          options: [
            {
              value: deathDocumentType.PROOF_OF_CAUSE_OF_DEATH,
              label: formMessageDescriptors.proofOfCauseOfDeath
            }
          ],
          mapping: getFieldMapping('documents')
        },
        {
          name: 'uploadDocForMedicalCertificateOfCauseOfDeath',
          type: 'DOCUMENT_UPLOADER_WITH_OPTION',
          label: formMessageDescriptors.medicalCertificateOfCauseOfDeath,
          initialValue: '',
          extraValue: deathDocumentExtraValue.DECEASED_DEATH_PROOF,
          required: true,
          validator: [],
          conditionals: [
            {
              action: 'hide',
              expression:
                'draftData?.deathEvent?.causeOfDeathEstablished === "false"'
            }
          ],
          options: [
            {
              value: deathDocumentType.MEDICALLY_CERTIFIED_CAUSE_OF_DEATH,
              label: formMessageDescriptors.medicalCertificateOfCauseOfDeath
            }
          ],
          mapping: getFieldMapping('documents')
        },
        {
          name: 'uploadDocForCauseOfDeath',
          type: 'DOCUMENT_UPLOADER_WITH_OPTION',
          label: formMessageDescriptors.causeOfDeathProof,
          initialValue: '',
          extraValue: deathDocumentExtraValue.DECEASED_DEATH_CAUSE_PROOF,
          hideAsterisk: true,
          validator: [],
          conditionals: [
            {
              action: 'hide',
              expression:
                'draftData?.deathEvent?.causeOfDeathEstablished !== "true"'
            }
          ],
          options: [
            {
              value: deathDocumentType.MEDICALLY_CERTIFIED_CAUSE_OF_DEATH,
              label: formMessageDescriptors.medicallyCertified
            }
          ],
          mapping: getFieldMapping('documents')
        },
        {
          name: 'uploadDocForDeceased',
          type: 'DOCUMENT_UPLOADER_WITH_OPTION',
          label: formMessageDescriptors.deceasedIDProof,
          initialValue: '',
          extraValue: deathDocumentExtraValue.DECEASED_ID_PROOF,
          hideAsterisk: true,
          validator: [],
          options: [
            {
              value: deathDocumentType.NATIONAL_ID,
              label: formMessageDescriptors.docTypeNID
            },
            {
              value: deathDocumentType.PASSPORT,
              label: formMessageDescriptors.docTypePassport
            },
            {
              value: deathDocumentType.ALIEN_ID,
              label: formMessageDescriptors.iDTypeAlienNumber
            },
            {
              value: deathDocumentType.REFUGEE_ID,
              label: formMessageDescriptors.iDTypeRefugeeNumber
            }
          ],
          mapping: getFieldMapping('documents')
        },
        {
          name: 'uploadDocForInformant',
          type: 'DOCUMENT_UPLOADER_WITH_OPTION',
          label: formMessageDescriptors.proofOfInformantsID,
          initialValue: '',
          extraValue: deathDocumentExtraValue.INFORMANT_ID_PROOF,
          hideAsterisk: true,
          validator: [],
          options: [
            {
              value: deathDocumentType.NATIONAL_ID,
              label: formMessageDescriptors.docTypeNID
            },
            {
              value: deathDocumentType.PASSPORT,
              label: formMessageDescriptors.docTypePassport
            },
            {
              value: deathDocumentType.ALIEN_ID,
              label: formMessageDescriptors.iDTypeAlienNumber
            },
            {
              value: deathDocumentType.REFUGEE_ID,
              label: formMessageDescriptors.iDTypeRefugeeNumber
            }
          ],
          mapping: getFieldMapping('documents')
        }
      ]
    }
  ]
} satisfies ISerializedFormSection

export const previewSection = {
  id: 'preview',
  viewType: 'preview',
  name: formMessageDescriptors.previewName,
  title: formMessageDescriptors.previewTitle,
  groups: [
    {
      id: 'preview-view-group',
      fields: [
        getInformantsSignature([
          {
            action: 'hide',
            expression:
              'Boolean(draftData.documents?.uploadDocForDeceasedDeathNotification?.[0]?.data)'
          }
        ])
      ]
    }
  ]
} satisfies ISerializedFormSection

export const reviewSection = {
  id: 'review',
  viewType: 'review',
  name: formMessageDescriptors.reviewName,
  title: formMessageDescriptors.reviewTitle,
  groups: [
    {
      id: 'review-view-group',
      fields: [
        getInformantsSignature([
          {
            action: 'hide',
            expression:
              'Boolean(draftData.documents?.uploadDocForDeceasedDeathNotification?.[0]?.data)'
          }
        ])
      ]
    }
  ]
} satisfies ISerializedFormSection
