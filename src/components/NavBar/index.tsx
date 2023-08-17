import {Moon, Sun} from 'lucide-react'

import {useTranslation} from 'react-i18next'

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useTheme} from '@/components/ui/theme-provider'
import {TypographyH3, TypographyP} from '@/components/ui/typography'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'

function NavBar() {
  const [t] = useTranslation(['common'])
  const {setTheme} = useTheme()

  return (
    <nav className="p-3 md:px-0 md:py-5">
      <div className="flex items-center">
        <Avatar className="mx-2 h-6 w-6">
          <AvatarImage src="/icon-192-maskable.png" alt={t('app')} />
          <AvatarFallback>{t('app')}</AvatarFallback>
        </Avatar>

        <TypographyH3 className="grow text-center">{t('app')}</TypographyH3>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                  <span className="sr-only">{t('toggle-theme')}</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>

            <TooltipContent>
              <TypographyP>{t('toggle-theme')}</TypographyP>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              {t('light')}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme('dark')}>
              {t('dark')}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setTheme('system')}>
              {t('system')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default NavBar
