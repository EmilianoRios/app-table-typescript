import { themeMui } from '@/config'
import { SubjectManager } from '@/models'
import Dialog from '@mui/material/Dialog'
import { ThemeProvider } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { Subscription } from 'rxjs'

interface Props {
  children: React.ReactNode
}

export const dialogOpenSubject$ = new SubjectManager<boolean>()
export const dialogCloseSubject$ = new SubjectManager<boolean>()

export const CustomDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false)
  let openSubject$ = new Subscription()
  let closeSubject$ = new Subscription()

  useEffect(() => {
    openSubject$ = dialogOpenSubject$.getSubject.subscribe(() =>
      handleClickOpen()
    )
    closeSubject$ = dialogCloseSubject$.getSubject.subscribe(() =>
      handleClose()
    )
    return () => {
      openSubject$.unsubscribe()
      closeSubject$.unsubscribe()
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleExit = () => {
    dialogCloseSubject$.setSubject = false
  }

  return (
    <div>
      <ThemeProvider theme={themeMui}>
        <Dialog
          open={open}
          onClose={() => handleExit()}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullWidth
          maxWidth='md'
        >
          {children}
        </Dialog>
      </ThemeProvider>
    </div>
  )
}

export default CustomDialog
