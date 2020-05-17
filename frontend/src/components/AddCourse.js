
import React, { useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import axios from 'axios'


function AddCourse(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")
    const [urlError, setUrlError] = useState("")
    const [url, setUrl] = useState("")
    const [date, setDate] = useState(null)
    const [desc, setDesc] = useState("")


    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);


    const addCourse = (e) => {
        e.preventDefault()
        if (title === "") setTitleError("Adı daxil edin")
        else if (url === "") setUrlError("Linki daxil edin")
        else {
            axios.post("http://127.0.0.1:8000/courses/create/",
                {
                    name: title,
                    url: url,
                    expiry_date: date,
                    description: desc,
                    confirmed: false

                }).then((response) => {
                    props.showAlert()
                    console.log(response)
                }, (error) => {
                    console.log(error);
                });
            handleClose()
        }
    }


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>Kurs əlavə etmək</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Kurs əlavə etmək</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Ad:
                             </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="Kursun adı" />
                                <div>{titleError}</div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Haqqında:
                             </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    onChange={(e) => setDesc(e.target.value)}
                                    type="text"
                                    placeholder="Kurs haqqında" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Url:
                                </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    onChange={(e) => setUrl(e.target.value)}
                                    type="url"
                                    placeholder="Paylaşmaq istədiyiniz link" />
                                <div>{urlError}</div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Bitmə tarixi:
                             </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    onChange={(e) => setDate(e.target.value)}
                                    type="date"
                                />
                            </Col>
                        </Form.Group>

                        <hr></hr>
                        <Button onClick={addCourse} type="submit" variant="primary" >
                            Yadda saxla
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddCourse;




