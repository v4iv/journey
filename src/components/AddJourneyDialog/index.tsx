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
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'
import {TypographyMuted, TypographyP} from '@/components/ui/typography'

const presets = [2, 3, 4, 5, 10]

function AddJourneyDialog({
  value,
  setValue,
  showButton,
  increment,
  decrement,
  handleChange,
  createNewJourney,
}: {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  showButton: boolean
  increment: () => void
  decrement: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  createNewJourney: (v: number) => void
}) {
  const [t] = useTranslation(['common'])

  return (
    <Dialog>
      <Tooltip>
        {showButton && (
          <TooltipTrigger>
            <DialogTrigger asChild>
              <Button aria-label={t('add-journey')} size="icon">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
        )}

        <TooltipContent>
          <TypographyP>{t('add-journey')}</TypographyP>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('select-range')}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-y-3 py-3">
          <div className="flex items-center justify-center gap-x-5">
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
              min={2}
              max={99}
              type="number"
              value={value}
              className="h-14 w-14 text-center text-xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={handleChange}
            />

            <Button
              aria-label={t('increase-range')}
              variant="secondary"
              size="icon"
              onClick={increment}
              disabled={value > 99}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          <TypographyMuted className="text-center">
            {t('presets')}
          </TypographyMuted>

          <div className="flex flex-wrap justify-center gap-3">
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
            disabled={value < 2 || value > 99}
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
