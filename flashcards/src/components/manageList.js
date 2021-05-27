import React, { useState, useEffect } from 'react';
import ListItem from './ListManagement/ListItem';
import { Container, Row } from 'react-bootstrap';
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
            .onSnapshot((data) => {
                const phrases = data.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                console.log('phrases');
                console.log(phrases);
                setList(phrases);
            });

        return unregisterAuthObserver;
    },[currentUser.email]);

    function handleEdit(id){
        const phrase = list.find(l => l.id === id);
        setSelectedItem({
            id: phrase.id,
            source: phrase.sourceLanguage,
            target: phrase.targetLanguage
        });
    }

    function handleChangeSource(e) {
        setSelectedItem({
            id: selectedItem.id,
            source: e.target.value,
            target: selectedItem.target
        })
    }

    function handleChangeTarget(e) {
        setSelectedItem({
            id: selectedItem.id,
            source: selectedItem.source,
            target: e.target.value
        })
    }   
    
    function handleSave() {
        if (!selectedItem.id || selectedItem.id === 0) {
            db.collection('users')
                .doc(currentUser.email)
                .collection('phrases')
                .add({
                    sourceLanguage: selectedItem.source,
                    targetLanguage: selectedItem.target,
                    createDate: new Date()
                });
        }
        else {
        db.collection('users')
            .doc(currentUser.email)
            .collection('phrases')
            .doc(selectedItem.id)
            .set( {
                sourceLanguage: selectedItem.source,
                targetLanguage: selectedItem.target
            })
            .then(() => {
                setSelectedItem({
                    id: 0,
                    source: '',
                    target: ''
                });
            })
            .catch((e) => {
                console.log('an error occurred:');
                console.log(e);
            });
        }
    }

    console.log('list:');
    console.log(list);
    return (
        <div>
            <h1>Manage the list</h1>
            {list.length === 0 && <span>No items</span>}
            {list.length > 0 && (
            <Container>
            <Row>
                <div className="col-sm-8">
                    {list.map(item => (
                        <ListItem
                            key={item.id}
                            itemId={item.id}
                            onEdit={handleEdit}
                            source={item.sourceLanguage}
                            target={item.targetLanguage}
                        />
                    ))}
                </div>
                <div className="col-sm-4">
                    <AddEditItem
                        source={selectedItem.source}
                        target={selectedItem.target}
                        id={selectedItem.id}
                        onChangeSource={handleChangeSource}
                        onChangeTarget={handleChangeTarget}
                        onSave={handleSave}
                    />
                </div>
            </Row>
        </Container>
            )}
        </div>
    );
}
