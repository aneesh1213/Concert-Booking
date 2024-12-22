import Button from '@mui/material/Button';
// import Grid2 from '@mui/material';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
// import { Router } from 'express';


function AdminConcerts(){
    return (
        <>
            {ShowConcerts}
        </>
    )
}


function ShowConcerts(props){
    const concerts = [{}];
    useEffect(()=>{
        const response = axios.get("https://localhost:3000/concerts", {concerts});
        if(!response){
            alert("concerts doent exists !!")
        }

    }, [])


    return <>
        <Grid2 >
            <Card>
                <props.concerts></props.concerts>
            </Card>
        </Grid2>
    </>
    
}

export default AdminConcerts