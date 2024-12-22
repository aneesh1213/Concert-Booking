import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';


function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const response = await axios.post("http://localhost:3000/login", {
                username, password
            });

            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                alert("login successfull");
                navigate('/concerts');
            }
        }
        catch(err){
            alert("there is error in logging in ", err);
        }
    }
    return (
            
            <div style={{margin:'20px'}}>
                <Typography> Login here </Typography>
                <TextField
                    label="username"
                    fullWidth
                    margin='normal'
                    value={username}
                    onChange={(e)=>{
                        setUsername(e.target.value)
                    }}
                />
                <br />
                <TextField
                    label="password"
                    fullWidth
                    margin='normal'
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                />
                <Button onClick={handleLogin} > Submit </Button>
            </div>
        
    )
}


export default Login; 