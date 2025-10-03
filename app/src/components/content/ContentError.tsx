type Props = {
  message?: string | null
}

function ContentError({ message }: Props) {
  if (!message) return null

  return (
    <div className="text-sm text-red-500">
      {message}
    </div>
  )
}

export default ContentError
