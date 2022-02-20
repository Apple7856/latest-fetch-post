import { AppBar, Box, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'

type handleSearchProps = {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
}

const Navbar = (props:handleSearchProps) => {
    return (
        <Box>
            <AppBar>
                <Toolbar sx={{
                    display: "flex",
                    alignItems: "center",
                    "justifyContent": "space-around"
                }}>
                    <Typography variant="h6" data-testid="heading">Fetch-Post</Typography>
                    <TextField placeholder='Search...' data-testid="textField" onChange={(e)=>props.handleSearch(e)} type="text" sx={{ marginLeft: "10px", border: "2px solid white", borderRadius: "5px", backgroundColor: "white" }} />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar