export default function CategoryBadge({ category, colour }) {
  return (
    <span
      className="inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-1 border"
      style={{ color: colour, borderColor: colour + '55', backgroundColor: colour + '11' }}
    >
      {category}
    </span>
  )
}
