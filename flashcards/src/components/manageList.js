import React, { useState, useEffect } from 'react';
import ListItem from './ListManagement/ListItem';
import { Table, Container, Row, Button, Col } from 'react-bootstrap';
import db from '../firebase/db';
import { useAuth } from '../contexts/AuthContext';
import AddEditItem from './ListManagement/AddEditItem';
import { useHistory } from 'react-router-dom';
import starterPhrases from '../data/starterPhrases';

export default function ManageList() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState({});
    const { currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const unregisterAuthObserver = db.collection('users')
            .doc(currentUser.email)
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
                setLoading(false);
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
        savePhrase(selectedItem);
    }

    function savePhrase(phrase) {
        const isNew = !phrase.id || phrase.id.length === 0;
        if (!isNew) {
            db.collection('users')
                .doc(currentUser.email)
                .collection('phrases')
                .doc(phrase.id)
                .set({
                    english: phrase.english,
                    spanish: phrase.spanish
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
        else {
            db.collection('users')
                .doc(currentUser.email)
                .collection('phrases')
                .add({
                    english: phrase.english,
                    spanish: phrase.spanish,
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
    }

    function importStarterPhrases() {
        starterPhrases.forEach(s => {
            savePhrase(s);
        });
    }

    return (
        <div className="pt-3">
            <h1>Manage the list</h1>
            {list.length === 0 && <span>No items yet!  Add at least three items to the list to play the game.</span>}
            {!loading && list.length < 4 && (
                <div className="pt-3"><Button onClick={importStarterPhrases}>Import Mike's favorite phrases</Button></div>
            )}
            <Container className="pt-4">
            <Row>
                <div className="col-sm-8">
                {list && list.length > 0 && (
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th style={{width: "42%"}}>English</th>
                            <th style={{width: "42%"}}>Spanish</th>
                            <th style={{width: "16%"}}></th>
                        </tr>
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
                )}
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
            {list.length >= 3 && (
            <Row>
                <Col className="col-sm-2 offset-sm-3">
                    <Button onClick={() => history.push('/game')}>Play Game!</Button>
                </Col>
            </Row>
            )}

        </Container>
        </div>
    );
}
