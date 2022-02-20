import { Box, Dialog } from '@mui/material'
import React from 'react'

type jsonDataProps = {
    open: boolean
    jsonData: {
        title?: string
        author?: string
        url?: string
        created_at?: string
    }
    handleClose: ()=>void
}

const ModalBox = (props: jsonDataProps) => {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <Box data-testid="modalBox" sx={{ width: "300px", height: "300px", backgroundColor: "white"}}>
                {
                    JSON.stringify(props.jsonData)
                }
            </Box>
        </Dialog>
    )
}

export default ModalBox