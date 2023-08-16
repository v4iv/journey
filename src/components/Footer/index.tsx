import {Button} from '@/components/ui/button'
import {TypographyMuted} from '@/components/ui/typography'

function Footer() {
  return (
    <footer className="flex flex-col justify-center p-3 text-center md:px-0 md:py-5">
      <TypographyMuted>Built with ❤️ by</TypographyMuted>

      <Button variant="link" asChild>
        <a
          href="https://github.com/v4iv"
          target="_blank"
          rel="noreferer noopener"
        >
          VaibhaV
        </a>
      </Button>
    </footer>
  )
}

export default Footer
