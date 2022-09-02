import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Button , Avatar} from "@mui/material";
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 import "./itemDetail.css";
 import {User} from "../../core/model/User";

 interface UserState {
    user: User;
  }

 function ItemDetail() {
    const location = useLocation();
    const state = location.state as UserState; 
    const { user } = state;
    const [selectedUser, setSelectedUser] = useState({} as User);
    


    useEffect(() => {
        console.log(user);
        setSelectedUser(user);
    } , [location]);

   return (
      <div className="body">
        <div className="container">
            <div className="back-button-container">
                <Button variant="contained" startIcon={  <ArrowBackIcon />} onClick={() => window.history.back()} >
                Back
                </Button>
            </div>
            <div className="item-detail-container">
                <div className="item-detail">
                    <div className="item-detail-header">
                    <Typography component="div" variant="h5" align="center" noWrap sx={{margin: 4, fontWeight: 'bold', color: 'text.primary' }}>
                     Profile
                    </Typography>  
                    </div>
                    <div className="item-detail-body">
                        <div className="avatar-container">
                            <Avatar alt="Remy Sharp" src={selectedUser.avatar} sx={{ width: 100, height: 100 }}/>
                        </div>
                            <Typography component="div" variant="h6" align="center" noWrap sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                {selectedUser.first_name} {selectedUser.last_name}

                                <Typography component="div" variant="caption" align="center" noWrap sx={{  color: 'text.primary' }}>
                                {selectedUser.email} 
                            </Typography>
                            </Typography>
                      
                            


                    </div>
                </div>

            </div>
            </div>
    </div>
   );
 }
    export default ItemDetail;