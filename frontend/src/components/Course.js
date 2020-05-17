import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios'


function Course(props) {
    const [titles, setTitles] = useState([])

    useEffect(() => {
        const fetchTitle = async () => {
            const response = await axios.get('http://127.0.0.1:8000/courses/get-title/' + props.id);
            setTitles(response.data)
        }

        fetchTitle();
    }, [props.id])

    return (
        <div>
            {console.log(props.url)}
            <Card border="primary">
                <Card.Header>{props.name}</Card.Header>
                <Card.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>{props.description}</Card.Text><br/>
                            {titles.map((title) =>
                                <Card.Text key={title.id}>{title.title}</Card.Text>
                            )}
                            <a target="blank" href={props.url}>{props.url}</a>
                        </Card.Body>
                    </Card>
                    {props.expiry_date && <Card.Footer> Son tarix: {props.expiry_date}</Card.Footer>}
                </Card.Body>
            </Card>
            <hr></hr>
        </div>
    );
}

export default Course;
