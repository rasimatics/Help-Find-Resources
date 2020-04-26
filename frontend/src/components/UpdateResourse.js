import React, { useState } from 'react';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios'
import {v1 as uuidv4} from 'uuid'


function UpdateResource(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("")
    const [urls, setUrls] = useState([""])
    const [newUrls, setnewUrls] = useState([])


    const handleClose = () => {
        setShow(false);
        setUrls([""])
    }
    const handleShow = () => {
        axios.get("http://127.0.0.1:8000/posts/" + props.id + "/").then(res => {
            setUrls(res.data.urls)
            setTitle(res.data.title)
        })
        setShow(true);
    }

    const addLinkField = () => {
        setnewUrls([...newUrls, ""])
    }

    const handleChange = (event, index) => {
        const changeUrls = [...newUrls]
        changeUrls[index] = event.target.value
        setnewUrls(changeUrls)
    }

    const  change =  (e) => {
        e.preventDefault()
        const oldUrls = [...urls]
        const thenewUrls = [...newUrls]
        let modifiedUrl = thenewUrls.filter((url) => url !== "")
        modifiedUrl = [...oldUrls,...modifiedUrl]
        axios.put("http://127.0.0.1:8000/posts/" + props.id + "/", {
            title: title,
            urls: modifiedUrl,
            confirmed:false
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        handleClose()
    }


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>Link əlavə etmək</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Link əlavə etmək</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="2">
                                Ad:
                     </Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly value={title} type="text" placeholder="Mənbənin adı" />
                            </Col>
                        </Form.Group>
                        {urls.map((url) =>
                            <Form.Group key={uuidv4()} as={Row} controlId="formPlaintext">
                                <Form.Label column sm="2">
                                    Url:
                        </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        readOnly
                                        value={url}
                                        type="url"
                                        placeholder="Paylaşmaq istədiyiniz link" />
                                </Col>
                            </Form.Group>
                        )}

                        {newUrls.map((newUrl, index) =>
                            <Form.Group key={newUrl.id} as={Row} controlId="formPlaintext">
                                <Form.Label column sm="2">
                                    Url:
                            </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        onChange={(event) => handleChange(event, index)}
                                        type="url"
                                        placeholder="Paylaşmaq istədiyiniz link" />
                                </Col>
                            </Form.Group>
                        )}

                        <Button className="ml-auto" onClick={addLinkField} variant="primary">Link əlavə etmək</Button>
                        <hr></hr>
                        <Button onClick={change} type="submit" variant="primary" >
                            Yadda saxla
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UpdateResource;
