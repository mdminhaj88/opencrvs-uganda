import * as Handlebars from 'handlebars'
import { type IntlShape } from 'react-intl'

type FactoryProps = {
  intl: IntlShape
}
// An example helper showing how to access i18n properties
export function noop(props: FactoryProps): Handlebars.HelperDelegate {
  return function (this: any, value: string) {
    // eslint-disable-next-line no-console
    console.log(props)

    return value
  }
}

export function uppercase(): Handlebars.HelperDelegate {
  return function (this: any, value: string) {
    return value.toUpperCase()
  }
}

export function shortenMonth(): Handlebars.HelperDelegate {
  return function (this: any, value: string) {
    return value
      .split(' ')
      .map((str, i) => {
        if (i != 1) {
          return str
        }
        return str.substring(0, 3)
      })
      .join(' ')
  }
}

const LINE_HEIGHT = 10

function insertTspansIntoText(textLines: string[]) {
  let svgString = ''
  let y = 0
  for (const line of textLines) {
    svgString += `<tspan x="0" y="${y}">${line}</tspan>`
    y += LINE_HEIGHT
  }
  return svgString
}

export function wrap(): Handlebars.HelperDelegate {
  return function (this: any, value: string) {
    const lines = value.split(' ')
    return insertTspansIntoText(lines)
  }
}

/** console.logs available handlebar variables with the handlebar: {{debug}} */
export function debug(): Handlebars.HelperDelegate {
  return function (this: any, value: string) {
    // eslint-disable-next-line no-console
    console.log(this)

    return value
  }
}
