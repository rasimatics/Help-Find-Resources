
import React, { useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';



function AddResource() {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState("")
    const [urlError, setUrlError] = useState("")
    const [urls, setUrls] = useState([""])
    const [desc, setDesc] = useState(" ")


    const handleClose = () => {
        setShow(false);
        setUrls([""])
    }
    const handleShow = () => setShow(true);

    
    const addLink = () => {
        setUrls([...urls, ""])
    }

    const addResource = (e) => {
        e.preventDefault()
        if (title === "") setTitleError("Adı daxil edin")
        else if (urls.length === 0) setUrlError("Linki daxil edin")
        else {
            const oldUrls = [...urls]
            const modifiedUrl = oldUrls.filter((url) => url !== "")
            axios.post(" http://127.0.0.1:8000/create/",
                {
                    title: title,
                    urls: modifiedUrl,
                    description: desc,
                    confirmed: false,
                    like:0
                }).then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
            handleClose()
            // setTimeout(()=>window.location.reload(),1000)
        }
    }
    const handleChange = (index, event) => {
        const changeUrls = [...urls]
        changeUrls[index] = event.target.value
        setUrls(changeUrls)
    }


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>Mənbə əlavə etmək</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Mənbə əlavə etmək</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Ad:
                             </Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Mənbənin adı" />
                                <div>{titleError}</div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Haqqında:
                             </Form.Label>
                            <Col sm="10">
                                <Form.Control onChange={(e) => setDesc(e.target.value)} type="text" placeholder="Haqqında" />
                            </Col>
                        </Form.Group>
                        {urls.map((url, index) =>
                            <Form.Group key={uuidv4()} as={Row} controlId="formPlaintext">
                                <Form.Label key={uuidv4()} column sm="2">
                                    Url:
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control 
                                        value={url}
                                        onChange={(event) => handleChange(index, event)}
                                        type="url"
                                        placeholder="Paylaşmaq istədiyiniz link" />
                                    <div>{urlError}</div>
                                </Col>
                            </Form.Group>
                        )}

                        <Button className="ml-auto" variant="primary" onClick={addLink}>Link əlavə etmək</Button>
                        <hr></hr>
                        <Button type="submit" variant="primary" onClick={addResource}>
                            Yadda saxla
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddResource;




