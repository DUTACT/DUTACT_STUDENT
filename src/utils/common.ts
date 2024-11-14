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
