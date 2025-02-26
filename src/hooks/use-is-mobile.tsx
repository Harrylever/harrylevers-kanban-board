import useMediaQuery from "./use-media-query"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1050

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`)
}

export function useIsTablet() {
  return useMediaQuery(`(max-width: ${TABLET_BREAKPOINT}px)`)
}
