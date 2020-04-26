import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UpdateResourse from '../components/UpdateResourse'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


function Resource(props) {
    const [urls, setUrls] = useState([])
    const [like, setLike] = useState(0)
    const [count, setCount] = useState(2)


    useEffect(() => {
        const fetchTitle = async () => {
            const response = await axios.get('http://127.0.0.1:8000/get-title/' + props.id + "/");
            setUrls(response.data)
            setLike(props.like)
        }

        fetchTitle();
    }, [props.id,props.like])

    const likePost = (e, id) => {
        e.preventDefault()
        if (localStorage.getItem(id) == null) {
            localStorage.setItem(id, true);
            setLike(like + 1)
            setTimeout(() => {
                axios.put("http://127.0.0.1:8000/posts/" + props.id + "/", {
                    title: props.title,
                    urls: props.urls,
                    confirmed: props.confirmed,
                    description: props.description,
                    like: like + 1
                }).then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
            }, count * 1000)
            setCount(count * 2)
        }
        else {
            localStorage.removeItem(id);
            setLike(like - 1)
            setTimeout(() => {
                axios.put("http://127.0.0.1:8000/posts/" + props.id + "/", {
                    title: props.title,
                    urls: props.urls,
                    confirmed: props.confirmed,
                    description: props.description,
                    like: like - 1
                }).then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
            }, count * 1000)
            setCount(count * 2)
        }
    }

    return (
        <div>
            <Card border="primary">
                <Card.Header>{props.title}</Card.Header>
                <Button className="ml-auto" onClick={(e) => likePost(e, props.id)}>
                    {localStorage.getItem(props.id) ? "Liked " : "Like "}
                    {like}</Button>
                <Card.Body>
                    <Card.Text>{props.description}</Card.Text>
                    {urls.map((url) =>
                        <div key={uuidv4()}>
                            <Card>
                                <Card.Body>
                                    <Card.Text>{url.title}</Card.Text>
                                    <a target="blank" href={url.url}>{url.url}</a>
                                </Card.Body>
                            </Card>
                            <br />
                        </div>
                    )}
                </Card.Body>
                <UpdateResourse id={props.id} />
            </Card>
            <hr></hr>
        </div>

    );
}

export default Resource;
