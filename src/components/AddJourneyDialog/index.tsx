import {useTranslation} from 'react-i18next'
import {Minus, Plus, PlusCircle} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Separator} from '@/components/ui/separator'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'
import {TypographyMuted, TypographyP} from '@/components/ui/typography'

const presets = [2, 3, 4, 5, 10]

function AddJourneyDialog({
  value,
  setValue,
  increment,
  decrement,
  handleChange,
  createNewJourney,
}: {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  increment: () => void
  decrement: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  createNewJourney: (v: number) => void
}) {
  const [t] = useTranslation(['common'])

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <DialogTrigger asChild>
            <Button aria-label={t('add-journey')} size="icon">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <TooltipContent>
          <TypographyP>{t('add-journey')}</TypographyP>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('select-range')}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-3 py-3">
          <div className="flex items-center justify-around">
            <Button
              aria-label={t('decrease-range')}
              variant="secondary"
              size="icon"
              onClick={decrement}
              disabled={value < 2}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <Input
              type="number"
              value={value}
              className="h-12 w-12 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={handleChange}
            />

            <Button
              aria-label={t('increase-range')}
              variant="secondary"
              size="icon"
              onClick={increment}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          <TypographyMuted>{t('presets')}</TypographyMuted>

          <div className="flex flex-wrap gap-3">
            {presets.map((preset, idx) => (
              <Button
                aria-label={t('preset-journey', {preset})}
                key={idx}
                variant="outline"
                onClick={() => setValue(preset)}
              >
                {preset}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            aria-label={t('add')}
            disabled={value < 2}
            onClick={() => createNewJourney(value)}
          >
            {t('add')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddJourneyDialog
