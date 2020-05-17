import React, { useState, useEffect } from 'react';
import { Container, Row, Form, FormControl, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import Resource from './Resource'
import AddResource from './AddResource'
import Pages from './Pages'

function Resources() {
  const [resources, setResources] = useState([])
  const [items, setItems] = useState([])
  const [show, setShow] = useState(false);
  const [showpages, setShowpages] = useState(true)

  const navigate = (i, postPerpage) => {
    setItems(resources.slice((i - 1) * postPerpage, i * postPerpage))
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/posts/');
      setResources(response.data)
      setItems(response.data.slice(0, 5))
    }

    fetchData();
  }, []);

  const search = (e) => {
    let result = resources
    let searchText = e.target.value.trim()
    if (searchText.length !== 0) {
      setShowpages(false)
      let words = searchText.split(" ");
      result = result.filter(item => {
        return item.title.toLowerCase().includes(searchText.toLowerCase())
      })
    }else{setShowpages(true)}

    setItems(result)
  }

  const showAlert = () => {
    setShow(true)
  }

  return (
    <div>
      <Container>
        <Row>

          <Form inline className="m-auto">
            <FormControl
              onChange={search}
              type="text" placeholder="Axtarış" className="mr-sm-2" name="q" />
          </Form>

          <AddResource showAlert={showAlert} />

        </Row>
        <br />
        {show &&
          <Alert variant="success" dismissible onClose={() => setShow(false)}>
            <Alert.Heading>Paylaşdığınız üçün təşəkkür edirik</Alert.Heading>
            <p>
              Tezliklə paylaşımınız təsdiqlənəcək
          </p>
          </Alert>
        }
      </Container><hr></hr>

      <Container style={{ maxWidth: "52rem" }}>
        {items.length > 0 ? items.map(resource =>
          //  resource.confirmed && 
          <Resource key={resource.id} id={resource.id} confirmed={resource.confirmed} urls={resource.urls} like={resource.like} title={resource.title} description={resource.description} />)
          :
          <Alert variant="danger">
            Təəssüf ki heç bir nəticə tapılmadı
          </Alert>
        }
      </Container>
      {showpages&& <Pages items={resources} navigate={navigate} />}
    </div>
  );
}

export default Resources;
