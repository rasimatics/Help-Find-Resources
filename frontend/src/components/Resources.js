import React, { useState, useEffect } from 'react';
import { Container, Row, Form, FormControl, Button } from 'react-bootstrap'
import axios from 'axios'
import Resource from '../components/Resource'
import AddResource from '../components/AddResource'

function Resources() {
  const [resources, setResources] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/posts/');
      setResources(response.data)
    }

    fetchData();
  }, []);

  const search = (e) => {
    e.preventDefault()
    axios.get("http://127.0.0.1:8000/search/" + text+"/").then((response) => {
      response.data.length > 0 ? setResources(response.data) : setResources([])

    })
  }


  return (
    <div>
      <Container>
        <Row>

          <Form onSubmit={search} inline className="m-auto">
            <FormControl onChange={e => setText(e.target.value)} type="text" placeholder="Axtarış" className="mr-sm-2" name="q"/>
            <Button type="submit" variant="outline-success">Axtar</Button>
          </Form>

          <AddResource />

        </Row>
      </Container><hr></hr>
      <Container style={{ maxWidth: "52rem" }}>
        {resources.length > 0 ? resources.map(resource =>
          resource.confirmed && <Resource key={resource.id} id={resource.id} confirmed={resource.confirmed} urls={resource.urls} like={resource.like} title={resource.title} description={resource.description} />)
        : 
          <h1>Heç bir nəticə tapılmadı</h1>
        }
      </Container>
    </div>
  );
}

export default Resources;
