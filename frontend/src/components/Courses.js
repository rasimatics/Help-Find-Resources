import React, { useEffect, useState } from 'react';
import { Container, Form, FormControl, Button, Row, Alert } from 'react-bootstrap'
import axios from 'axios';
import Course from './Course';
import AddCourse from './AddCourse';
import Pages from './Pages';

function Courses() {
  const [courses, setCourses] = useState([])
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([])
  const [showpages, setShowpages] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/courses/all/');
      setCourses(response.data)
      setItems(response.data.slice(0, 5))
    }


    fetchData();
  }, []);

  const search = (e) => {
    let result = courses
    let searchText = e.target.value.trim()
    if (searchText.length !== 0) {
      setShowpages(false)
      result = result.filter(item => {
        return item.name.toLowerCase().includes(searchText.toLowerCase())
      });
    }else{setShowpages(true)}
    setItems(result)
  }

  const navigate = (i, postPerpage) => {
    setItems(courses.slice((i - 1) * postPerpage, i * postPerpage))
  }


  const showAlert = () => {
    setShow(true)
  }



  return (
    <div>
      <Container>
        <Row>

          <Form inline className="m-auto">
            <FormControl type="text" onChange={search} placeholder="Axtarış" className="mr-sm-2" name="search" />
          </Form>

          <AddCourse showAlert={showAlert} />
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
        {items.length > 0 ? items.map(course =>
          //  course.confirmed &&
          <Course key={course.id} id={course.id} url={course.url} name={course.name} expiry_date={course.expiry_date} description={course.description} />)
          :
          <h1>Heç bir nəticə tapılmadı</h1>
        }
      </Container>

      {showpages&& <Pages items={courses} navigate={navigate} />}
    </div>
  );
}

export default Courses;
