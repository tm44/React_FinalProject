import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function CurrentUser() {

    const { currentUser } = useAuth();
    console.log(currentUser);

    return (
        <div>
            {currentUser && <span>{currentUser.email}</span>}
            {!currentUser && <span>Not signed in</span>}
        </div>
    )
}
