import {useState} from 'react'
import arrayShuffle from 'array-shuffle'
import {Ban, RotateCcw} from 'lucide-react'
import {useTranslation} from 'react-i18next'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {ThemeProvider} from '@/components/ui/theme-provider'
import {Toaster} from '@/components/ui/toaster'
import {TooltipProvider} from '@/components/ui/tooltip'
import {TypographyH1} from '@/components/ui/typography'
import {useToast} from '@/components/ui/use-toast'
import {range} from '@/lib/utils'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import AddJourneyDialog from '@/components/AddJourneyDialog'

export interface JourneyType {
  title: number
  content: number[]
}

function App() {
  const {toast} = useToast()
  const [t] = useTranslation(['common'])
  const [value, setValue] = useState(2)
  const [journeys, setJourneys] = useState<JourneyType[]>([])

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
      title: value,
      content: shuffledArray,
    }

    setJourneys([...journeys, newJourney])

    toast({
      title: t('journey-added', {value: v}),
    })
  }

  const resetJourneys = () => {
    const reshuffledJourneys = journeys.map((journey) => {
      const journeyArray = range(1, journey.title)
      const shuffledArray = arrayShuffle(journeyArray)

      return {
        title: journey.title,
        content: shuffledArray,
      }
    })

    setJourneys(reshuffledJourneys)

    toast({
      title: t('reshuffled', {count: reshuffledJourneys.length}),
    })
  }

  const clearJourneys = () => {
    setJourneys([])

    toast({
      title: t('journeys-cleared'),
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
              {!!journeys.length && (
                <>
                  <div className="mb-3 flex justify-end gap-x-3">
                    <Button
                      aria-label={t('reset')}
                      variant="outline"
                      size="sm"
                      disabled={!journeys.length}
                      onClick={resetJourneys}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      {t('reset')}
                    </Button>

                    <Button
                      aria-label={t('clear')}
                      variant="destructive"
                      size="sm"
                      disabled={!journeys.length}
                      onClick={clearJourneys}
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      {t('clear')}
                    </Button>
                  </div>

                  <Separator />
                </>
              )}

              {!journeys.length && (
                <TypographyH1 className="text-center">
                  {t('begin-journey')}
                </TypographyH1>
              )}

              <Accordion type="single" collapsible>
                {journeys.map((journey, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>
                      {t('journey', {value: journey.title})}
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="flex flex-wrap gap-3">
                        {journey.content.map((journeyContent, index) => (
                          <Button variant="outline" key={index} disabled>
                            {journeyContent}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="fixed bottom-24 left-[50%] translate-x-[-50%]">
                <AddJourneyDialog
                  value={value}
                  setValue={setValue}
                  increment={increment}
                  decrement={decrement}
                  handleChange={handleChange}
                  createNewJourney={createNewJourney}
                />
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
