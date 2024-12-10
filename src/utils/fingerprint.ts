import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const getOrCreateFingerprintId = async () => {
  const storedId = localStorage.getItem('device-id')
  if (storedId) {
    return storedId
  }

  const fp = await FingerprintJS.load()
  const result = await fp.get()
  const visitorId = result.visitorId

  localStorage.setItem('device-id', visitorId)
  return visitorId
}
