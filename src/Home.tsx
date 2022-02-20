import { Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ModalBox from './ModalBox'
import Navbar from './Navbar'
import TableData from './TableData'

type dataState = {
    title?: string
    author?: string
    url?: string
    created_at?: string
}

const Home = () => {
    const [data, setData] = useState<Array<dataState>>([]);
    const [jsonData, setJsonData] = useState<dataState>({});
    const [open, setOpen] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<Array<dataState>>([]);
    const [showData, setShowData] = useState<boolean>(false);
    function ApiCall() {
        axios({
            method: "GET",
            url: `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`,
            responseType: "json"
        })
            .then((res) => {
                setData(data.concat(res?.data?.hits));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function timer() {
        setCount(prevCount => prevCount + 1);
    }

    function handleClick(item: dataState) {
        setJsonData(item);
        setOpen(true);
    }

    function handleScroll(e: any) {
        const bottom = Math.trunc(e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop) === e.target.documentElement.clientHeight;
        if (bottom) {
            setCount(prevCount => prevCount + 1)
        }
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSearch(e:any) {
        const inputWord = e.target.value;
        if (inputWord) {
            setShowData(true);
            const searchData = data.filter((item) => {
                if (item.title?.toLowerCase().includes(inputWord.toLowerCase()) || item.author?.toLowerCase().includes(inputWord.toLowerCase())) {
                    return item
                }
            })
            setSearchValue(searchData);
        } else {
            setShowData(false)
        }
    }

    useEffect(() => {
        ApiCall();
        const id = setInterval(timer, 10000);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            clearInterval(id);
            window.removeEventListener("scroll", handleScroll);
        }
    }, [count])

    return (
        <Box data-testid="homeBox">
            <Navbar handleSearch={handleSearch} />
            <TableData data={data} handleClick={handleClick} showData={showData} searchValue={searchValue} />
            <ModalBox open={open} jsonData={jsonData} handleClose={handleClose} />
        </Box>
    )
}

export default Home