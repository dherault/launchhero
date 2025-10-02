import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { Upload, X, Loader2 } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { storage } from '~firebase'

import { cn } from '~utils/ui'

import { Button } from '~components/ui/Button'
import { Dialog, DialogContent } from '~components/ui/Dialog'

interface ImageUploadProps {
  storagePath: string
  multiple?: boolean
  maxSizeMB?: number
  accept?: Record<string, string[]>
  currentImageUrls?: string[]
  onUploadComplete?: (urls: string[]) => void
  onUploadError?: (error: Error | null) => void
}

export function ImageUpload({
  storagePath,
  multiple = false,
  maxSizeMB = 10,
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
  currentImageUrls = [],
  onUploadComplete,
  onUploadError,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [imageUrls, setImageUrls] = useState<string[]>(currentImageUrls)

  const onDrop = async (acceptedFiles: File[]) => {
    const filesToUpload = multiple ? acceptedFiles : [acceptedFiles[0]]

    onUploadError?.(null)

    filesToUpload.forEach(file => {
      if (!file) return

      // Validate file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024

      if (file.size > maxSizeBytes) {
        const errorMessage = `File size exceeds ${maxSizeMB}MB limit`

        onUploadError?.(new Error(errorMessage))

        return
      }

      const uploadId = nanoid()

      setUploading(previous => ({
        ...previous,
        [uploadId]: true,
      }))
      setProgress(previous => ({
        ...previous,
        [uploadId]: 0,
      }))

      try {
        // Create a unique filename
        const filename = `${Date.now()}_${nanoid()}`
        const storageRef = ref(storage, `${storagePath}/${filename}`)

        // Upload file
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

            setProgress(previous => ({
              ...previous,
              [uploadId]: progressPercent,
            }))
          },
          error => {
            setUploading(previous => {
              const next = { ...previous }

              delete next[uploadId]

              return next
            })
            setProgress(previous => {
              const next = { ...previous }

              delete next[uploadId]

              return next
            })
            onUploadError?.(error)
          },
          async () => {
            // Upload completed successfully
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

            setImageUrls(previous => {
              const nextUrls = [...previous, downloadURL]

              return nextUrls
            })
            setUploading(previous => {
              const next = { ...previous }

              delete next[uploadId]

              return next
            })
            setProgress(previous => {
              const next = { ...previous }

              delete next[uploadId]

              return next
            })

            // Call onUploadComplete after state updates
            const nextUrls = [...imageUrls, downloadURL]

            onUploadComplete?.(nextUrls)
          },
        )
      }
      catch (err) {
        const error = err as Error

        setUploading(previous => {
          const next = { ...previous }

          delete next[uploadId]

          return next
        })
        setProgress(previous => {
          const next = { ...previous }

          delete next[uploadId]

          return next
        })
        onUploadError?.(error)
      }
    })
  }

  const removeImage = async (index: number) => {
    const imageUrl = imageUrls[index]

    if (!imageUrl) return

    try {
      await deleteObject(ref(storage, imageUrl))

      const nextUrls = imageUrls.filter((_, i) => i !== index)

      setImageUrls(nextUrls)
      onUploadComplete?.(nextUrls)
    }
    catch (error) {
      onUploadError?.(error as Error)
    }
  }

  const isUploading = Object.keys(uploading).length > 0
  const hasImages = imageUrls.length > 0
  const canUploadMore = multiple || (!hasImages && !isUploading)

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {imageUrls.map((imageUrl, index) => (
          <ImageUploadSlot
            key={imageUrl}
            imageUrl={imageUrl}
            isUploading={false}
            uploadProgress={0}
            accept={accept}
            onDrop={onDrop}
            onRemove={() => removeImage(index)}
            index={index}
            canUpload={false}
          />
        ))}
        {Object.entries(uploading).map(([uploadId, isUploadingFile]) => (
          <ImageUploadSlot
            key={uploadId}
            imageUrl={undefined}
            isUploading={isUploadingFile}
            uploadProgress={progress[uploadId] || 0}
            accept={accept}
            onDrop={onDrop}
            onRemove={() => {}}
            index={-1}
            canUpload={false}
          />
        ))}
        {canUploadMore && (
          <ImageUploadSlot
            key="upload-slot"
            imageUrl={undefined}
            isUploading={false}
            uploadProgress={0}
            accept={accept}
            onDrop={onDrop}
            onRemove={() => {}}
            index={-1}
            canUpload={true}
          />
        )}
      </div>
    </div>
  )
}

interface ImageUploadSlotProps {
  index: number
  imageUrl?: string
  isUploading: boolean
  uploadProgress: number
  accept: Record<string, string[]>
  onDrop: (files: File[]) => void
  onRemove: () => void
  canUpload: boolean
}

function ImageUploadSlot({
  index,
  imageUrl,
  isUploading,
  uploadProgress,
  accept,
  onDrop,
  onRemove,
  canUpload,
}: ImageUploadSlotProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    disabled: !canUpload || isUploading,
  })

  return (
    <div className="w-full">
      {!imageUrl
        ? (
            <div
              {...getRootProps()}
              className={cn(
                'border rounded-xs p-8 text-center transition-colors aspect-square flex items-center justify-center',
                canUpload && !isUploading && 'cursor-pointer',
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50',
                (isUploading || !canUpload) && 'opacity-50 cursor-not-allowed',
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2">
                {isUploading
                  ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
                        <p className="text-xs text-neutral-500">
                          {uploadProgress.toFixed(0)}
                          %
                        </p>
                        <div className="w-full max-w-[100px] h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </>
                    )
                  : (
                      <>
                        <Upload className="h-4 w-4 text-neutral-500" />
                        <p className="text-xs text-neutral-500">
                          {isDragActive ? 'Drop here' : 'Upload'}
                        </p>
                      </>
                    )}
              </div>
            </div>
          )
        : (
            <>
              <div className="relative rounded-xs overflow-hidden border border-border aspect-square">
                <img
                  src={imageUrl}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setIsDialogOpen(true)}
                />
                <Button
                  onClick={onRemove}
                  variant="white"
                  size="icon-xs"
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              >
                <DialogContent
                  showCloseButton={false}
                  className="p-0 border-none"
                >
                  <img
                    src={imageUrl}
                    alt={`Upload ${index + 1}`}
                    className="object-contain"
                  />
                </DialogContent>
              </Dialog>
            </>
          )}
    </div>
  )
}
