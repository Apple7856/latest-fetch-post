import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'

type dataValue = {
    title?: string
    author?: string
    url?: string
    created_at?: string
}

type dataProps = {
    data: {
        title?: string
        author?: string
        url?: string
        created_at?: string
    }[]
    handleClick: (item: dataValue) => void
    searchValue: {
        title?: string
        author?: string
        url?: string
        created_at?: string
    }[]
    showData: boolean
}

const TableData = (props: dataProps) => {
    const [age, setAge] = useState("");
    function handleChange(e: SelectChangeEvent) {
        setAge(e.target.value as string);
    }
    return (
        <Box sx={{ marginTop: "70px" }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell data-testid="title" sx={{ cursor:"pointer", color: "Red", fontWeight: "bold" }}>
                                Title
                            </TableCell>
                            <TableCell data-testid="author" sx={{ color: "Red", fontWeight: "bold" }}>Author</TableCell>
                            <TableCell data-testid="url" sx={{ color: "Red", fontWeight: "bold" }}>Url</TableCell>
                            <TableCell data-testid="created_at" sx={{ color: "Red", fontWeight: "bold" }}>Created_at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.showData ?
                                props.searchValue.map((item, index: number) => {
                                    return <TableRow key={index} onClick={() => props.handleClick(item)}>
                                        <TableCell>{item?.title}</TableCell>
                                        <TableCell>{item?.author}</TableCell>
                                        <TableCell>{item?.url}</TableCell>
                                        <TableCell>{item?.created_at}</TableCell>
                                    </TableRow>
                                })
                                :
                                props.data.map((item, index: number) => {
                                    return <TableRow key={index} onClick={() => props.handleClick(item)}>
                                        <TableCell>{item?.title}</TableCell>
                                        <TableCell>{item?.author}</TableCell>
                                        <TableCell>{item?.url}</TableCell>
                                        <TableCell>{item?.created_at}</TableCell>
                                    </TableRow>
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TableData;