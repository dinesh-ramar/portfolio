import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-heading-2 mb-6 font-semibold">
          Get In Touch
        </h2>
        <p className="text-body mb-8 text-muted-foreground">
          I'm always open to discussing new opportunities and interesting
          projects. Feel free to reach out!
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" size="lg" className="h-12 px-8">
            <a
              href="mailto:dineshramar413@gmail.com"
              aria-label="Send email to Dinesh Ramar"
            >
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Email
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8"
          >
            <a
              href="https://github.com/dinesh-ramar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Dinesh Ramar's GitHub profile"
            >
              <Github className="mr-2 h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8"
          >
            <a
              href="https://www.linkedin.com/in/dinesh-ramar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Dinesh Ramar's LinkedIn profile"
            >
              <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

