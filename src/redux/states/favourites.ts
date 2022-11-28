import { LocalStorageTypes, Person } from '@/models'
import { getLocalStorage, setLocalStorage } from '@/utilities'
import { createSlice, current } from '@reduxjs/toolkit'

const initialState: Person[] = []

export const favouritesSlice = createSlice({
  name: LocalStorageTypes.FAVOURITES,
  initialState: getLocalStorage(LocalStorageTypes.FAVOURITES)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVOURITES) as string)
    : initialState,
  reducers: {
    addFavourite: (state, action) => {
      setLocalStorage(LocalStorageTypes.FAVOURITES, action.payload)
      return action.payload
    },
    removeFavourite: (state, action) => {
      const filteredState = current(state).filter(
        (p: Person) => p.id !== action.payload.id
      )
      setLocalStorage(LocalStorageTypes.FAVOURITES, filteredState)
      return filteredState
    },
  },
})

export const { addFavourite, removeFavourite } = favouritesSlice.actions

export default favouritesSlice.reducer
