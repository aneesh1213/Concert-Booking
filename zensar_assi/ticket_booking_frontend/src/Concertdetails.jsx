import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  axios  from 'axios';


function ConcertDetails(){
    return <>
        <ShowDetails/>
    </>
}   

export const BookConcert = (id) => {
    try{

        const token = localStorage.getItem("token");

        const response = axios.post(`htpp://localhost:3000/concerts/${id}/book`, {
            headers: {
                'Authorization': `${token}`
            }
        });
        alert("concert booked successfully !!")
    }
    catch(err){
        console.log("there is error in booking catch part !")
        alert("there is problem in booking function in concert details !")
    }
}


function ShowDetails(){
    const {id} = useParams();
    const [concert, setConcert] = useState(null);

    useEffect(()=>{
        const fetchConcertDetails = async () => {
            try{
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:3000/concerts/${id}`);
                setConcert(response.data.concert);
            }
            catch(err){
                console.log(err);
                alert("Error showing concert details!")
            }   
        }
        fetchConcertDetails();
    }, [id]);


  

    return (
        
        concert && (
        
            <div className=' flex items-center justify-center gap-6 min-h-screen '>
                
                <div className='w-full max-w-md bg-white rounded-lg shadow-lg '>
                    <div className='p-6'>
                        <h2 className='text-xl font-bold text-grey-800 mb-2'>
                            {concert.artistname}
                        </h2>
                        <p className='text-grey-600 mb-2'>
                            <span className='font-semibold'>Date: </span>{concert.date}
                        </p>
                        <p className='text-grey-600 mb-2'>
                            <span className='font-semibold'>Location: </span>{concert.location}
                        </p>
                        <p className='text-grey-600 mb-4'>
                            <span className='font-semibold'>Ticket Price: </span>{concert.ticketprice}
                        </p>
                        <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-medium'
                            onClick={BookConcert}
                        >
                            Book Now 
                        </button>
                    </div>  
                </div>
            </div>
        )
        
    );
}

export default ConcertDetails