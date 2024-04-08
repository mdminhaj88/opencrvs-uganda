import { countryLogo } from '@countryconfig/api/application/country-logo'

export const defaultApplicationConfig = {
  APPLICATION_NAME: 'NIRA OpenCRVS',
  BIRTH: {
    REGISTRATION_TARGET: 30 * 6,
    LATE_REGISTRATION_TARGET: 365 * 3,
    FEE: {
      ON_TIME: 0,
      LATE: 5000,
      DELAYED: 10000
    },
    PRINT_IN_ADVANCE: true
  },
  DEATH: {
    REGISTRATION_TARGET: 45,
    FEE: {
      ON_TIME: 5000,
      DELAYED: 5000
    },
    PRINT_IN_ADVANCE: true
  },
  MARRIAGE_REGISTRATION: false,
  MARRIAGE: {
    REGISTRATION_TARGET: 90,
    FEE: {
      ON_TIME: 0,
      DELAYED: 0
    },
    PRINT_IN_ADVANCE: true
  },
  DATE_OF_BIRTH_UNKNOWN: true,
  CURRENCY: {
    languagesAndCountry: ['en-US'],
    isoCode: 'UGX'
  },
  PHONE_NUMBER_PATTERN: '^(03|07)[0-9]{8}$',
  NID_NUMBER_PATTERN: '^[a-zA-Z0-9]{14}$',
  COUNTRY_LOGO: countryLogo,
  LOGIN_BACKGROUND: {
    backgroundColor: '36304E'
  },
  INFORMANT_SIGNATURE: true,
  INFORMANT_SIGNATURE_REQUIRED: true,
  EXTERNAL_VALIDATION_WORKQUEUE: false,
  FIELD_AGENT_AUDIT_LOCATIONS: 'DISTRICT',
  DECLARATION_AUDIT_LOCATIONS: 'DISTRICT',
  USER_NOTIFICATION_DELIVERY_METHOD: 'email', // or 'sms', or '' ... You can use 'sms' for WhatsApp
  INFORMANT_NOTIFICATION_DELIVERY_METHOD: 'email', // or 'sms', or '' ... You can use 'sms' for WhatsApp
  SIGNATURE_REQUIRED_FOR_ROLES: ['LOCAL_REGISTRAR', 'NATIONAL_REGISTRAR']
}

export const COUNTRY_WIDE_CRUDE_DEATH_RATE = 10
