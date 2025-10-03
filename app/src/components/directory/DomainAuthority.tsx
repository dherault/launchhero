type Props = {
  value: number
}

function DomainAuthority({ value }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm">
        {value}
      </div>
      <div className="grow h-2 flex bg-neutral-200 rounded-xs overflow-hidden">
        <div
          style={{
            width: `${value}%`,
            backgroundColor: getBackgroundColor(value),
          }}
        />
      </div>
    </div>
  )
}

// Calculate background color: red (DA ≤ 10) → yellow → orange → green (DA ≥ 80)
function getBackgroundColor(da: number) {
  if (da <= 10) return 'rgb(239, 68, 68)' // red-500
  if (da >= 80) return 'rgb(34, 197, 94)' // green-500

  // Interpolate between colors
  if (da <= 45) {
    // red (10) → yellow (45)
    const t = (da - 10) / 35

    return `rgb(${239 - t * 22}, ${68 + t * 152}, 68)`
  }
  else {
    // yellow (45) → green (80)
    const t = (da - 45) / 35

    return `rgb(${217 - t * 183}, ${220 - t * 23}, ${68 + t * 26})`
  }
}

export default DomainAuthority
