import { countryLogo } from '@countryconfig/api/application/country-logo'

export const applicationConfig = {
  APPLICATION_NAME: 'NSIS-CRVS',
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
  COUNTRY_LOGO: countryLogo,
  CURRENCY: {
    languagesAndCountry: ['en-US'],
    isoCode: 'UGX'
  },
  DEATH: {
    REGISTRATION_TARGET: 45,
    FEE: {
      ON_TIME: 5000,
      DELAYED: 5000
    },
    PRINT_IN_ADVANCE: true
  },
  PHONE_NUMBER_PATTERN: '^(03|07)[0-9]{8}$',
  NID_NUMBER_PATTERN: '^[a-zA-Z0-9]{14}$',
  LOGIN_BACKGROUND: {
    backgroundColor: 'D10026'
  },
  MARRIAGE: {
    REGISTRATION_TARGET: 90,
    FEE: {
      ON_TIME: 0,
      DELAYED: 0
    },
    PRINT_IN_ADVANCE: true
  },
  // Following constants aren't configurable via UI
  FIELD_AGENT_AUDIT_LOCATIONS: 'DISTRICT',
  DECLARATION_AUDIT_LOCATIONS: 'DISTRICT',
  FEATURES: {
    DEATH_REGISTRATION: true,
    MARRIAGE_REGISTRATION: false,
    EXTERNAL_VALIDATION_WORKQUEUE: false,
    INFORMANT_SIGNATURE: true,
    PRINT_DECLARATION: false,
    DATE_OF_BIRTH_UNKNOWN: true,
    INFORMANT_SIGNATURE_REQUIRED: true
  },
  USER_NOTIFICATION_DELIVERY_METHOD: 'email', // or 'sms', or '' ... You can use 'sms' for WhatsApp
  INFORMANT_NOTIFICATION_DELIVERY_METHOD: 'email', // or 'sms', or '' ... You can use 'sms' for WhatsApp
  SIGNATURE_REQUIRED_FOR_ROLES: ['LOCAL_REGISTRAR', 'NATIONAL_REGISTRAR']
}

export const COUNTRY_WIDE_CRUDE_DEATH_RATE = 10

type EventNotificationFlags = {
  'sent-notification'?: boolean
  'sent-notification-for-review'?: boolean
  'sent-for-approval'?: boolean
  registered?: boolean
  'sent-for-updates'?: boolean
}

type NotificationFlags = {
  BIRTH?: EventNotificationFlags
  DEATH?: EventNotificationFlags
  MARRIAGE?: EventNotificationFlags
}

export const notificationForRecord: NotificationFlags = {
  BIRTH: {
    'sent-notification': true,
    'sent-notification-for-review': true,
    'sent-for-approval': true,
    registered: true,
    'sent-for-updates': true
  },
  DEATH: {
    'sent-notification': true,
    'sent-notification-for-review': true,
    'sent-for-approval': true,
    registered: true,
    'sent-for-updates': true
  }
}
