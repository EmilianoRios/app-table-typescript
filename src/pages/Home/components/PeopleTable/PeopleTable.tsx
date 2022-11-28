import { themeMui } from '@/config'
import { Person } from '@/models'
import { addFavourite } from '@/redux/states/favourites'
import { AppStore } from '@/redux/store'
import { Flex } from '@chakra-ui/react'
import { Checkbox as CheckboxMui } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
  const tablePageSize = 10
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
  const dispatch = useDispatch()
  const statePeople = useSelector((store: AppStore) => store.people)
  const favouritePeople = useSelector((store: AppStore) => store.favourites)

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person)
      ? filterPerson(person)
      : [...selectedPeople, person]
    dispatch(addFavourite(filteredPeople))
    setSelectedPeople(filteredPeople)
  }

  const findPerson = (person: Person) =>
    !!favouritePeople.find((p) => p.id === person.id)

  const filterPerson = (person: Person) =>
    favouritePeople.filter((p) => p.id !== person.id)

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
            <CheckboxMui
              checked={findPerson(params.row)}
              onChange={() => handleChange(params.row)}
            />
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

  useEffect(() => {
    setSelectedPeople(favouritePeople)
  }, [favouritePeople])

  return (
    <ThemeProvider theme={themeMui}>
      <Flex m='0 auto' maxW='1280px' padding='2rem'>
        <DataGrid
          rows={statePeople}
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

export default PeopleTable
