import { useEffect, useMemo, useState } from 'react'

export const useMedia = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [isMobile, setIsMobile] = useState(false)
  const [isLaptop, setIsLaptop] = useState(false)

  const setDimension = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    setIsMobile(window.innerWidth < 769)
    setIsLaptop(window.innerWidth < 1025)
  }

  useEffect(() => {
    setDimension()

    window.addEventListener('resize', setDimension)

    return () => {
      window.removeEventListener('resize', setDimension)
    }
  }, [])

  return useMemo(
    () => ({
      height: screenSize.height,
      width: screenSize.width,
      isMobile,
      isLaptop,
    }),
    [screenSize.height, screenSize.width, isMobile, isLaptop],
  )
}
