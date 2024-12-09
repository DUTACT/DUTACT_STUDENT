export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export const getDefaultImageFile = () => {
  const defaultImageData = new Uint8Array([255, 0, 0, 255])

  const blob = new Blob([defaultImageData], { type: 'image/jpeg' })
  return new File([blob], 'default-image.jpg', { type: 'image/jpeg' })
}

export const maskEmail = (email: string) => {
  const [username, domain] = email.split('@')
  const maskedUsername = username.substring(0, 3) + '*'.repeat(username.length - 3)
  return `${maskedUsername}@${domain}`
}
