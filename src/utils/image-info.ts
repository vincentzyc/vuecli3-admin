export async function getImageInfo(imageFile: File) {
  const imageSrc = URL.createObjectURL(imageFile)
  const image = new Image()
  const { name, size, type } = imageFile
  image.src = imageSrc
  return new Promise((resolve, reject) => {
    image.addEventListener('error', error => {
      reject(error)
    })
    image.addEventListener('load', () => {
      resolve({
        width: image.width,
        height: image.height,
        name,
        size,
        type,
        imageFile
      })
    })
  })
}