import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import  axios  from 'axios';


function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handlerRegister = async () => {
        try{
            const response = await axios.post("http://localhost:3000/register", {
                username, 
                password
            });

            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                alert("registration is successfull!");
                navigate("/login");
            }
        }
        catch(err){
            console.log(err);
            alert("registration failed !");
        }
    }

    
    return (
        

            <div>
                <Typography variant='h4'> Register Here </Typography>
                <TextField
                    label="username"
                    fullWidth
                    margin='normal'
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                />
                <br />
                <TextField
                    label="password"
                    fullWidth
                    margin='normal'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <Button 
                variant='contained'
                color='primary'
                onClick={handlerRegister}
                
                > Submit </Button>
            </div>
        
    )
}


export default Register;