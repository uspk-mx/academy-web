import { useState, useEffect } from "react"
import type { FileType } from "ui/lib/types"

export function useFiles() {
  const [files, setFiles] = useState<FileType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample data with folder IDs
        const sampleFiles: FileType[] = [
          {
            id: "1",
            name: "black-logo_cxrldb-Thumbnail.png",
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o6OoHnoTqSLOq44x4C6XHRwSJEbPpa.png",
            type: "image/png",
            size: 1024,
            dimensions: { width: 200, height: 104 },
            uploadDate: new Date("2024-06-12"),
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o6OoHnoTqSLOq44x4C6XHRwSJEbPpa.png",
            folderId: "images",
          },
          {
            id: "2",
            name: "team-photo.jpg",
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ti8h7yaFiTCN14vNGJB35olUPg3YW5.png",
            type: "image/jpeg",
            size: 2048,
            dimensions: { width: 800, height: 600 },
            uploadDate: new Date("2024-06-10"),
            thumbnail:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ti8h7yaFiTCN14vNGJB35olUPg3YW5.png",
            folderId: "images",
          },
          {
            id: "3",
            name: "presentation.pptx",
            url: "/placeholder.svg?height=100&width=100",
            type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            size: 3145728,
            uploadDate: new Date("2024-06-08"),
            folderId: "attachments",
          },
          {
            id: "4",
            name: "report.pdf",
            url: "/placeholder.svg?height=100&width=100",
            type: "application/pdf",
            size: 1048576,
            uploadDate: new Date("2024-06-05"),
            folderId: "attachments",
          },
          {
            id: "5",
            name: "course-introduction.mp4",
            url: "/placeholder.svg?height=100&width=100",
            type: "video/mp4",
            size: 15728640,
            uploadDate: new Date("2024-05-25"),
            folderId: "course-intro-videos",
          },
          {
            id: "6",
            name: "lesson-1-basics.mp4",
            url: "/placeholder.svg?height=100&width=100",
            type: "video/mp4",
            size: 12582912,
            uploadDate: new Date("2024-05-22"),
            folderId: "lesson-videos",
          },
          {
            id: "7",
            name: "background-music.mp3",
            url: "/placeholder.svg?height=100&width=100",
            type: "audio/mpeg",
            size: 4194304,
            uploadDate: new Date("2024-05-20"),
            folderId: "audios",
          },
        ]

        setFiles(sampleFiles)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch files")
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  const uploadFiles = async (filesToUpload: File[], folderId: string) => {
    try {
      const formData = new FormData()
      filesToUpload.forEach((file) => {
        formData.append("files", file)
      })
      formData.append("folderId", folderId)

      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // })
      // const data = await response.json()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new file objects
      const newFiles: FileType[] = filesToUpload.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        thumbnail: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        folderId,
      }))

      setFiles((prev) => [...newFiles, ...prev])
      return newFiles
    } catch (err) {
      setError("Failed to upload files")
      throw err
    }
  }

  const deleteFile = async (id: string) => {
    try {
      // await fetch(`/api/files/${id}`, { method: 'DELETE' })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setFiles((prev) => prev.filter((file) => file.id !== id))
    } catch (err) {
      setError("Failed to delete file")
      throw err
    }
  }

  const moveFile = async (id: string, newFolderId: string) => {
    try {
      // await fetch(`/api/files/${id}/move`, {
      //   method: 'POST',
      //   body: JSON.stringify({ folderId: newFolderId }),
      //   headers: { 'Content-Type': 'application/json' }
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setFiles((prev) => prev.map((file) => (file.id === id ? { ...file, folderId: newFolderId } : file)))
    } catch (err) {
      setError("Failed to move file")
      throw err
    }
  }

  return {
    files,
    loading,
    error,
    uploadFiles,
    deleteFile,
    moveFile,
  }
}

