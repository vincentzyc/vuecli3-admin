export async function getImageInfo(imageFile: File) {
  const imageSrc = URL.createObjectURL(imageFile)
  const image = new Image()
  const { name, size, type } = imageFile
  image.src = imageSrc
  return new Promise(resolve => {
    image.onload = () => {
      resolve({
        width: image.width,
        height: image.height,
        name,
        size,
        type,
        imageFile
      })
    }
  })
}