import { createContext } from 'react'
import { initialArtists } from 'data'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const ArtistsContext = createContext()

export function ArtistsProvider({ children }) {
  const [artists, setArtists] = useLocalStorage('greatArtists', initialArtists)

  return (
    <ArtistsContext.Provider value={[artists, setArtists]}>
      {children}
    </ArtistsContext.Provider>
  )
}
