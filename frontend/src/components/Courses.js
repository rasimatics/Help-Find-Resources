import React, { useEffect, useState } from 'react';
import { Container, Form, FormControl, Button,Row } from 'react-bootstrap'
import axios from 'axios';
import Course from './Course';
import AddCourse from './AddCourse';

function Courses() {
  const [courses, setCourses] = useState([])
  const [text, setText] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/courses/all/');
      setCourses(response.data)
    }


    fetchData();
  }, []);

  const search = (e) => {
    e.preventDefault()
    axios.get("http://127.0.0.1:8000/courses/search/" + text + "/").then((response) => {
      response.data.length>0? setCourses(response.data) : setCourses([])
      
    })
  }


  return (
    <div>
      <Container>
        <Row>

          <Form onSubmit={search} inline className="m-auto">
            <FormControl type="text" onChange={e=>setText(e.target.value)} placeholder="Axtarış" className="mr-sm-2" name="search" />
            <Button type="submit" variant="outline-success">Axtar</Button>
          </Form>

          <AddCourse />

        </Row>
      </Container><hr></hr>
      <Container style={{ maxWidth: "52rem" }}>
        {courses.length>0? courses.map(course =>
          <Course key={course.id} id={course.id} name={course.name} expiry_date={course.expiry_date}  description={course.description} />)
        :
        <h1>Heç bir nəticə tapılmadı</h1>
        }
      </Container>
    </div>
  );
}

export default Courses;
