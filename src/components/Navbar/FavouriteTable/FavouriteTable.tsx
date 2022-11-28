import { themeMui } from '@/config'
import { Person } from '@/models'
import { removeFavourite } from '@/redux/states/favourites'
import { AppStore } from '@/redux/store'
import { Flex } from '@chakra-ui/react'
import { IconButton } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
export interface FavouriteTableInterface {}

const FavouriteTable: React.FC<FavouriteTableInterface> = () => {
  const tablePageSize = 10
  const dispatch = useDispatch()
  const stateFavourites = useSelector((store: AppStore) => store.favourites)

  const handleClick = (person: Person) => {
    dispatch(removeFavourite(person))
  }

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      sortable: false,
      filterable: false,
      headerName: '',
      width: 60,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <IconButton size='small' onClick={() => handleClick(params.row)}>
              🗑️
            </IconButton>
          }
        </>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'category',
      headerName: 'Categories',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'company',
      headerName: 'Companies',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'levelOfHappiness',
      headerName: 'Level Of Happiness',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ]

  return (
    <ThemeProvider theme={themeMui}>
      <Flex>
        <DataGrid
          rows={stateFavourites}
          columns={columns}
          disableColumnSelector
          disableSelectionOnClick
          autoHeight
          pageSize={tablePageSize}
          rowsPerPageOptions={[tablePageSize]}
          getRowId={(row: any) => row.id}
        />
      </Flex>
    </ThemeProvider>
  )
}

export default FavouriteTable
