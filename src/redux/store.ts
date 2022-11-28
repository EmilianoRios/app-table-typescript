import { Person } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import favouritesSlice from './states/favourites'
import peopleSlice from './states/people'

export interface AppStore {
  people: Person[]
  favourites: Person[]
}

export default configureStore<AppStore>({
  reducer: {
    people: peopleSlice,
    favourites: favouritesSlice,
  },
})
