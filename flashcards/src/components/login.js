import React, { useRef, useState } from 'react';
import { Form, Button, Col, Alert, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/main');

        } catch {
            setError('There was an error signing in.');
        }
        setLoading(false);
    }

    return (
        <Container className="pt-4">
            <Col className="col-sm-4 offset-sm-4">
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>  
                <Button disabled={loading} type="submit" className="w-100 mt-3">Log In</Button>                                       
            </Form>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
                <br />
                <small><em>Don't worry - you can use a fake email account!</em></small>
            </div>
            </Col>
        </Container>
    )
}