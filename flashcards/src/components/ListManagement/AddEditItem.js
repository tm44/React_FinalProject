import React from 'react';
import { Button, Container, Col, Row, Form } from 'react-bootstrap';

export default function AddEditItem({english, spanish, onChangeEnglish, onChangeSpanish, onSave, disabled, id}) {

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="english">English</Form.Label>
                    <Form.Control name="english" onChange={onChangeEnglish} type="text" value={english || ''} />
                </Form.Group>
                <Form.Group className="pt-3">
                    <Form.Label htmlFor="spanish">Spanish</Form.Label>
                    <Form.Control name="spanish" onChange={onChangeSpanish} type="text" value={spanish || ''} />
                </Form.Group>
                <Form.Group className="pt-3">
                    <Button disabled={disabled} onClick={onSave} className="w-100">Save</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}
