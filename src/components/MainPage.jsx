import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormData from 'form-data';
import axios from 'axios';

export default function MainPage({ currUser }) {
  const [img, setImg] = useState({});
  const [output, setOutput] = useState({});
  const clickHandler = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('image', img);
      const options = {
        method: 'POST',
        url: 'https://ocr43.p.rapidapi.com/v1/results',
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.RAPID_API_HOST,
        },
        data,
      };
      axios.request(options)
        .then((response) => {
          setOutput({ text: (response.data.results[0].entities[0].objects[0].entities[0].text) });
          console.log(response.data);
        });
    } catch (error) { console.log(error); }
  }, [img]);

  const inputHandler = (e) => {
    setOutput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const saveHandler = () => {
    fetch('/api/v1/save', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(output),
    });
  };

  const destroyHandler = () => {
    setOutput({ text: '' });
  };

  return (
    <Form>
      <Form.Group className="m-3" controlId="exampleForm.ControlInput1">
        <input type="file" name="image" placeholder="Choose Image" onChange={(e) => setImg(e.target.files[0])} />
        <Button onClick={clickHandler}>RECOGNIZE</Button>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" name="text" value={output.text} onChange={inputHandler} rows={3} />
        {currUser.id && (

          <>
            <Button className="m-1" variant="success" onClick={saveHandler}>Save</Button>
            <Button className="m-1" variant="warning" onClick={destroyHandler}>Destroy</Button>
          </>
        )}
      </Form.Group>
    </Form>
  );
}
