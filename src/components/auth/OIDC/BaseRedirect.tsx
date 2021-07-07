import React, { useEffect } from 'react'

import { clientId, generateKey } from 'helpers'

export const BaseRedirect = () => {
  useEffect(() => {
    const state = generateKey()
    const nonce = generateKey()
    window.location.assign(
      // swap out un/commented link for local vs dev deployed development
      `https://id-uat.b2b.verizonmedia.com/identity/oauth2/authorize?realm=/techweek&client_id=${clientId}&response_type=code&scope=openid%20profile%20email%20oath:username%20fedidp:sub%20agency&redirect_uri=https://dev.d2o6b06bpexdr7.amplifyapp.com/auth/b2b_redir&state=${state}&nonce=${nonce}`
      // `https://id-uat.b2b.verizonmedia.com/identity/oauth2/authorize?realm=/techweek&client_id=${clientId}&response_type=code&scope=openid%20profile%20email%20oath:username%20fedidp:sub%20agency&redirect_uri=https://localhost:3000/auth/b2b_redir&state=${state}&nonce=${nonce}`
    )
  }, [])

  return <div style={{ display: 'none' }}></div>
}
