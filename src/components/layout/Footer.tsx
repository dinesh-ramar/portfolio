export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background w-full">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          © {currentYear} Dinesh Ramar. All rights reserved.
        </p>
        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-1">
          Built with React + Vite + Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
