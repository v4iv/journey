import {useState} from 'react'
import arrayShuffle from 'array-shuffle'
import {Ban, Minus, Plus, PlusCircle, RotateCcw} from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {
  TypographyH1,
  TypographyH4,
  TypographyP,
} from '@/components/ui/typography'
import {Toaster} from '@/components/ui/toaster'
import {useToast} from '@/components/ui/use-toast'
import {ThemeProvider} from '@/components/ui/theme-provider'
import {range} from '@/lib/utils'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

type JourneyType = {trigger: number; content: number[]}

const presets = [2, 3, 4, 5, 10]

function App() {
  const [value, setValue] = useState(2)
  const [journey, setJourney] = useState<JourneyType[]>([])
  const {toast} = useToast()

  const increment = () => setValue(value + 1)
  const decrement = () => setValue(value - 1)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value)

    setValue(newValue)
  }

  const createNewJourney = (v: number) => {
    const journeyArray = range(1, v)
    const shuffledArray = arrayShuffle(journeyArray)

    const newJourney = {
      trigger: value,
      content: shuffledArray,
    }

    const j = [...journey, newJourney]

    setJourney(j)

    toast({
      title: `'1 - ${v}' journey added!`,
    })
  }

  const resetJourneys = () => {
    const reshuffledJourneys = journey.map((j) => {
      const journeyArray = range(1, j.trigger)
      const shuffledArray = arrayShuffle(journeyArray)

      return {
        trigger: j.trigger,
        content: shuffledArray,
      }
    })

    setJourney(reshuffledJourneys)

    toast({
      title: `${reshuffledJourneys.length} journeys reshuffled!`,
    })
  }

  const clearJourneys = () => {
    setJourney([])

    toast({
      title: 'All journeys cleared!',
    })
  }

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <TooltipProvider>
        <div className="mx-auto w-full max-w-screen-md">
          <NavBar />

          <Separator />

          <main className="min-h-screen">
            <div className="relative p-3 md:px-0 md:py-5">
              {!!journey.length && (
                <>
                  <div className="mb-3 flex justify-end gap-x-3">
                    <Button
                      aria-label="Reset"
                      variant="outline"
                      size="sm"
                      disabled={!journey.length}
                      onClick={resetJourneys}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>

                    <Button
                      aria-label="Clear"
                      variant="destructive"
                      size="sm"
                      disabled={!journey.length}
                      onClick={clearJourneys}
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>

                  <Separator />
                </>
              )}

              {!journey.length && (
                <TypographyH1 className="text-center">
                  Press &oplus; to begin your journey...
                </TypographyH1>
              )}

              <Accordion type="single" collapsible>
                {journey.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>{`1 - ${item.trigger}`}</AccordionTrigger>

                    <AccordionContent>
                      <div className="flex flex-wrap gap-x-3">
                        {item.content.map((itemContent, index) => (
                          <Button variant="outline" key={index} disabled>
                            {itemContent}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="fixed bottom-24 left-[50%] translate-x-[-50%]">
                <Dialog>
                  <Tooltip>
                    <TooltipTrigger>
                      <DialogTrigger asChild>
                        <Button aria-label="New Journey" size="icon">
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </TooltipTrigger>

                    <TooltipContent>
                      <TypographyP>New Journey</TypographyP>
                    </TooltipContent>
                  </Tooltip>

                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Select Journey Range</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-y-3 py-3">
                      <div className="flex items-center justify-around">
                        <Button
                          aria-label="Decrease Range"
                          variant="outline"
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
                          aria-label="Increase Range"
                          variant="outline"
                          size="icon"
                          onClick={increment}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Separator />

                      <TypographyH4>Presets</TypographyH4>

                      <div className="flex flex-wrap gap-x-3">
                        {presets.map((preset, idx) => (
                          <Button
                            aria-label={`${preset} Journey`}
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
                        aria-label="Create"
                        disabled={value < 2}
                        onClick={() => createNewJourney(value)}
                      >
                        Create
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </main>

          <Separator />

          <Footer />

          <Toaster />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
