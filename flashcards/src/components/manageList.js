import React, { useState, useEffect } from 'react';
import ListItem from './ListManagement/ListItem';
import { Container, Row } from 'react-bootstrap';
import db from '../firebase/db';
import { useAuth } from '../contexts/AuthContext';
import AddEditItem from './ListManagement/AddEditItem';

export default function ManageList() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const unregisterAuthObserver = db.collection('users')
            .doc(currentUser.email)
            //.doc('test@test.com')
            .collection('phrases')
            .onSnapshot((data) => {
                const phrases = data.docs.map(doc => {
                    return {
                        id: doc.id,
                        sourceLanguage: doc.sourceLanguage,
                        targetLanguage: doc.TargetLanguage,
                        ...doc.data()
                    }
                })

                setList(phrases);
            });

        return unregisterAuthObserver;
    },[currentUser.email]);

    function phrases() {
        return list.map(item => {
            return (
                <ListItem
                    key={item.id}
                    source={item.sourceLanguage}
                    target={item.targetLanguage}
                />
            )
        })
    }

    return (
        <div>
            <h1>Manage the list</h1>
            {list.length === 0 && <span>No items</span>}
            {list.length > 0 && (
            <Container>
            <Row>
                <div className="col-sm-8">
                    {phrases()}
                </div>
                <div className="col-sm-4">
                    <AddEditItem />
                </div>
            </Row>
        </Container>
            )}
        </div>
    );
}
