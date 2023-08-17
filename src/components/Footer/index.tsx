import {useTranslation} from 'react-i18next'

import {Button} from '@/components/ui/button'
import {TypographyMuted} from '@/components/ui/typography'

function Footer() {
  const [t] = useTranslation(['common'])

  return (
    <footer className="flex flex-col justify-center p-3 text-center md:px-0 md:py-5">
      <TypographyMuted>{t('built-with-love')}</TypographyMuted>

      <Button role="link" variant="link" asChild>
        <a
          href="https://github.com/v4iv"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('vaibhav')}
        </a>
      </Button>
    </footer>
  )
}

export default Footer
