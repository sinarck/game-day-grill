import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { KeyboardEvent } from "react"

interface SelectableProps {
  name: string
  selected: any
  onSelect: any
  icon: LucideIcon
}

const Selectable = ({
  name,
  onSelect,
  selected,
  icon: Icon,
}: SelectableProps) => {
  const isSelected = name === selected

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSelect((prev) => !prev)
    }
  }

  return (
    <div
      className={cn(
        "w-full cursor-pointer rounded-sm border p-3 shadow-sm transition-all duration-200 ease-in hover:shadow-md",
        isSelected && "border-yellow-300 bg-yellow-50 text-yellow-600"
      )}
      onClick={() => onSelect(name)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 align-middle">
        <Icon />
        <p className="whitespace-nowrap text-center">{name}</p>
      </div>
    </div>
  )
}

export default Selectable
