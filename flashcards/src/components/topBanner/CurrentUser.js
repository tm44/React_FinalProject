import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function CurrentUser() {

    const { currentUser } = useAuth();

    return (
        <>
            {currentUser && <small>{currentUser.email}</small>}
            {!currentUser && <small>Not signed in</small>}
        </>
    )
}
