/**
 * Abstraction over image persistence. The mock implementation keeps files
 * in-memory as data URLs; swap for S3/Cloudinary/Vercel Blob later without
 * touching the ImageUploader UI.
 */
export interface ImageStorage {
  upload(file: File): Promise<{ url: string; width?: number; height?: number }>
  delete(url: string): Promise<void>
  getUrl(key: string): Promise<string>
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

export const MAX_FILE_SIZE_MB = 8

export class LocalImageStorage implements ImageStorage {
  private store = new Map<string, string>()

  validate(file: File): string | null {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `Unsupported format: ${file.type || 'unknown'}. Use JPEG, PNG, WebP or AVIF.`
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `File exceeds the ${MAX_FILE_SIZE_MB}MB limit.`
    }
    return null
  }

  async upload(file: File): Promise<{ url: string; width?: number; height?: number }> {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error('Could not read file'))
      reader.readAsDataURL(file)
    })
    const key = `local-${crypto.randomUUID()}`
    this.store.set(key, dataUrl)
    const dims = await new Promise<{ width?: number; height?: number }>((resolve) => {
      const image = new Image()
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight })
      image.onerror = () => resolve({})
      image.src = dataUrl
    })
    return { url: dataUrl, ...dims }
  }

  async delete(url: string): Promise<void> {
    for (const [key, value] of this.store) {
      if (value === url) this.store.delete(key)
    }
  }

  async getUrl(key: string): Promise<string> {
    return this.store.get(key) ?? ''
  }
}

export const imageStorage: ImageStorage = new LocalImageStorage()
