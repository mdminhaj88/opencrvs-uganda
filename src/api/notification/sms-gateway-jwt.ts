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
import decode from 'jwt-decode'
import {
  SMS_EMAIL,
  SMS_GATEWAY_ENDPOINT,
  SMS_PASSWORD,
  SMS_USER_ID
} from './constant'
import { URL } from 'url'
import fetch from 'node-fetch'

let token: string | undefined

type Token = {
  exp: number
}

async function refreshToken(token: string): Promise<string> {
  const response = await fetch(
    new URL('v1/refresh-jwt-token', SMS_GATEWAY_ENDPOINT),
    {
      body: JSON.stringify({ token })
    }
  )
  if (!response.ok) {
    throw new Error()
  }
  const resJson: { token: string } = await response.json()
  return resJson.token
}

export async function getToken(): Promise<string> {
  if (!token) {
    const response = await fetch(
      new URL('v1/get-jwt-token', SMS_GATEWAY_ENDPOINT),
      {
        body: JSON.stringify({
          userId: SMS_USER_ID,
          password: SMS_PASSWORD,
          email: SMS_EMAIL
        })
      }
    )
    if (!response.ok) {
      throw new Error()
    }
    const resJson: { token: string } = await response.json()
    token = resJson.token
  }
  const { exp } = decode<Token>(token)
  const tokenExpired = exp > Date.now()
  const closeToExpiration = false
  if (tokenExpired || closeToExpiration) {
    token = await refreshToken(token)
  }
  return token
}
