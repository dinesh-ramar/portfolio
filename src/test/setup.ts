import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia — jsdom does not implement it.
// prefers-reduced-motion returns matches: true so animation-based components
// (CountUp, DecryptedText, Framer Motion etc.) show their final state immediately in tests,
// avoiding rAF timing issues in jsdom.
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock IntersectionObserver — jsdom does not implement it.
// Immediately fires the callback with isIntersecting: true on observe().
class MockIntersectionObserver {
    callback: IntersectionObserverCallback
    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback
    }
    observe(element: Element) {
        this.callback(
            [{ isIntersecting: true, target: element } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver
        )
    }
    unobserve() { }
    disconnect() { }
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
})

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
    value: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue(''),
    },
    writable: true,
})
