import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Concert() {
    return (
        <PresentConcerts />
    )
}

function PresentConcerts() {
    const [concerts, setConcerts] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchConcerts = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("token from concert.jsx in useeffect is: ", token);
                const response = await axios.get("http://localhost:3000/concerts", {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                setConcerts(response.data.concerts);
            }
            catch (err) {
                console.log(err);
                alert("there is error fetfching concerts from the backend")
            }
        }

        fetchConcerts();
    }, []);

    return (
       
            // {/* <Grid container spacing={2}>
            //     {concerts.map((concert)=>(
            //         <Grid item xs={12} sm={6} md={4} key={concert._id}>
            //             <Card>
            //                 <Typography variant='h4'> {concert.artistname}</Typography>
            //                 <Typography variant='h4'> {concert.date}</Typography>
            //                 <Typography variant='h4'> {concert.location}</Typography>
            //                 <Typography variant='h4'> {concert.ticketprice}</Typography>
            //                 <Button type='submit'> Book </Button>
            //             </Card>
            //         </Grid>
            //     ))}
            // </Grid> */}

            <div className='container mx-auto p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {concerts.map((concert) => (
                        <div key={concert._id} className='bg-white rounded-lg shadow-lg '>
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
                                 onClick={()=>{
                                    navigate(`/concerts/${concert._id}`)
                                 }}>
                                    Book Now 
                                </button>
                            </div>  
                        </div>
                    ))}
                </div>
            </div>
    )
}

export default Concert;