import React, { useState, useEffect } from 'react';
import ListItem from './ListManagement/ListItem';
import { Table, Container, Row } from 'react-bootstrap';
import db from '../firebase/db';
import { useAuth } from '../contexts/AuthContext';
import AddEditItem from './ListManagement/AddEditItem';

export default function ManageList() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState({});
    const { currentUser } = useAuth();

    useEffect(() => {
        const unregisterAuthObserver = db.collection('users')
            .doc(currentUser.email)
            //.doc('test@test.com')
            .collection('phrases')
            .orderBy('createDate', 'desc')
            .onSnapshot((data) => {
                const phrases = data.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                setList(phrases);
            });

        return unregisterAuthObserver;
    },[currentUser.email]);

    function handleEdit(id){
        const phrase = list.find(l => l.id === id);
        setSelectedItem({
            id: phrase.id,
            english: phrase.english,
            spanish: phrase.spanish
        });
    }

    function handleChangeEnglish(e) {
        setSelectedItem({
            id: selectedItem.id,
            english: e.target.value,
            spanish: selectedItem.spanish
        })
    }

    function handleChangeSpanish(e) {
        setSelectedItem({
            id: selectedItem.id,
            english: selectedItem.english,
            spanish: e.target.value
        })
    }   

    function handleDelete(id) {
        db.collection('users')
            .doc(currentUser.email)
            .collection('phrases')
            .doc(id)
            .delete();
    }
    
    function handleSave() {
        if (!selectedItem.id || selectedItem.id === 0) {
            db.collection('users')
                .doc(currentUser.email)
                .collection('phrases')
                .add({
                    english: selectedItem.english,
                    spanish: selectedItem.spanish,
                    createDate: new Date()
                })
                .then(() => {
                    setSelectedItem({
                        id: 0,
                        english: '',
                        spanish: ''
                    });
                })
                .catch((e) => {
                    console.log('an error occurred:');
                    console.log(e);
                });                
        }
        else {
        db.collection('users')
            .doc(currentUser.email)
            .collection('phrases')
            .doc(selectedItem.id)
            .set({
                english: selectedItem.english,
                spanish: selectedItem.spanish
            }, { merge: true })
            .then(() => {
                setSelectedItem({
                    id: 0,
                    english: '',
                    spanish: ''
                });
            })
            .catch((e) => {
                console.log('an error occurred:');
                console.log(e);
            });
        }
    }

    return (
        <div>
            <h1>Manage the list</h1>
            {list.length === 0 && <span>No items yet!  Add at least three items to the list to play the game.</span>}

            <Container>
            <Row>
                <div className="col-sm-8">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <th>English</th>
                            <th>Spanish</th>
                            <th></th>
                        </thead>
                        <tbody>
                        {list.length > 0 && (
                        list.map(item => (
                            <ListItem
                                key={item.id}
                                itemId={item.id}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                english={item.english}
                                spanish={item.spanish}
                            />
                        ))
                    )}
                        </tbody>
                    </Table>
                </div>
                <div className="col-sm-4">
                    <AddEditItem
                        english={selectedItem.english}
                        spanish={selectedItem.spanish}
                        id={selectedItem.id}
                        onChangeEnglish={handleChangeEnglish}
                        onChangeSpanish={handleChangeSpanish}
                        onSave={handleSave}
                        disabled={
                            !selectedItem
                            || !selectedItem.english
                            || !selectedItem.spanish
                            || selectedItem.english.length === 0
                            || selectedItem.spanish.length === 0
                        }
                    />
                </div>
            </Row>
        </Container>
        </div>
    );
}
