export default function Loading({content}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-accent-Default font-black animate-pulse">{content}</p>
    </div>
  )
}
