import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export default function LogOut() {

    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }

    return (
        <>
        {currentUser && (
        <Button 
          style={{padding: "0"}} 
          variant="link" 
          onClick={handleLogout}
        ><small>Log Out</small></Button>
        )}
        </>
    )
}
