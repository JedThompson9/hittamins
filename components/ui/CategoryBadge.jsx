const CATEGORY_STYLES = {
  'Pre-Workout': 'bg-brand-blue text-white border-brand-blue',
  'Muscle Recovery': 'bg-brand-mint text-brand-navy border-brand-mint',
  'Vitamins & Supplements': 'bg-brand-sky text-brand-navy border-brand-sky',
}

export default function CategoryBadge({ category }) {
  const styles = CATEGORY_STYLES[category] || 'bg-brand-soft text-brand-navy border-brand-border'
  return (
    <span
      className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-1 border ${styles}`}
    >
      {category}
    </span>
  )
}
