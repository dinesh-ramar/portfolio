export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} Dinesh Ramar. All rights reserved.
        </p>
        <p className="text-center text-sm text-muted-foreground mt-1">
          Built with React + Vite + Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

