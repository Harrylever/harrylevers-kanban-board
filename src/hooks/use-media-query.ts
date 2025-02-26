import { useState, useEffect } from "react"

interface MediaQueryOptions {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const useMediaQuery = (query: string, options?: MediaQueryOptions): boolean => {
  const { defaultValue = false, initializeWithValue = true } = options || {}

  const [matches, setMatches] = useState<boolean>(defaultValue)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const media = window.matchMedia(query)

    // Update state with the initial match value
    if (initializeWithValue) {
      setMatches(media.matches)
    }

    // Handler to update state when the media query changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener for changes
    media.addEventListener("change", handler)

    // Cleanup function to remove the event listener
    return () => {
      media.removeEventListener("change", handler)
    }
  }, [query, initializeWithValue])

  return matches
}

export default useMediaQuery
