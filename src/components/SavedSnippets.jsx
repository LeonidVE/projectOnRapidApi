import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SavedSnippets({ currUser, data }) {
  const [snippetList, setSnippetList] = useState(data || []);
  const [input, setInput] = useState(null);

  useEffect(() => {
    if (snippetList.length === 0) {
      fetch('/api/v1/snippets')
        .then((res) => res.json())
        .then((res) => setSnippetList(res));
    }
  }, []);

  const editHandler = (el) => {
    fetch(`/api/v1/snippets/${el.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ input }),
    })
      .then((res) => res.json())
      .then((res) => setSnippetList(res));
  };

  const deleteHandler = (el) => {
    fetch(`/api/v1/snippets/${el.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setSnippetList(res));
  };

  return (
    <>
      {snippetList?.map((el) => {
        if (currUser?.id === el.user_id) {
          return (
            <Form key={el.id} className="m-2">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" name="text" defaultValue={el.text} onChange={(e) => (setInput(e.target.value))} rows={3} />
                <Button className="m-1" variant="success" onClick={() => editHandler(el)}>Edit</Button>
                <Button className="m-1" variant="danger" onClick={() => deleteHandler(el)}>Delete</Button>
              </Form.Group>
            </Form>
          );
        }
      })}
    </>
  );
}
