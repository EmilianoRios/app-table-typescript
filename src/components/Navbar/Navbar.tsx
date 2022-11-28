import { AppStore } from '@/redux/store'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { CustomDialog } from '../CustomDialog'
import { dialogOpenSubject$ } from '../CustomDialog/CustomDialog'
import { FavouriteTable } from './FavouriteTable'
export interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
  useSelector((store: AppStore) => store.favourites)

  const handleClick = () => {
    dialogOpenSubject$.setSubject = true
  }

  return (
    <>
      <Flex
        minWidth='max-content'
        alignItems='center'
        gap='2'
        padding={3}
        bg='blackAlpha.600'
      >
        <Box p='2'>
          <Heading size='md'>App-Table</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>
          <CustomDialog>
            <FavouriteTable />
          </CustomDialog>
          <Button colorScheme='pink' onClick={handleClick}>
            Favourites ❤️
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  )
}

export default Navbar
