export const urlOpener = (url: string, redirectUrl: string) => {
  console.log(url)
  console.log(redirectUrl)
  const baseUrl = new URL(url)
  const params = new URLSearchParams(baseUrl.search)
  params.delete('code_challenge')
  params.delete('code_challenge_method')
  params.delete('identity_provider')
  params.set('realm', '/techweek')
  params.set('nonce', 'abcdefg')

  baseUrl.search = params.toString()
  console.log(baseUrl)
  return window.location.assign(baseUrl.toString())
}
