import { type ComponentProps, type MouseEvent, type PropsWithChildren, type ReactNode, useCallback, useState } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~components/ui/Tooltip'

type Props = PropsWithChildren<{
  content: ReactNode
  asChild?: boolean
  contentProps?: ComponentProps<typeof TooltipContent>
}>

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

function ResponsiveTooltip({ children, content, asChild = false, contentProps = {} }: Props) {
  const [open, setOpen] = useState(false)

  const handleTriggerClick = useCallback((event: MouseEvent) => {
    if (!isTouch) return

    event.preventDefault()
    setOpen(open => !open)
  }, [])

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip
        open={isTouch ? open : undefined}
        onOpenChange={isTouch ? setOpen : undefined}
      >
        <TooltipTrigger
          asChild={asChild}
          onClick={handleTriggerClick}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent {...contentProps}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ResponsiveTooltip
