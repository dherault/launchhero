import type { PropsWithChildren } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~components/ui/Accordion'

function DangerZone({ children }: PropsWithChildren) {
  return (
    <Accordion type="multiple">
      <AccordionItem
        value="delete"
        className="border-none"
      >
        <AccordionTrigger className="pt-0 text-red-500">
          Danger zone
        </AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default DangerZone
