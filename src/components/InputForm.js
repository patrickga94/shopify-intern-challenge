import React, {useState, useEffect} from "react";
import axios from 'axios';
import {makeRequest} from '../api/AiRequest'
import {Form, Button, Container} from "react-bootstrap"
require('dotenv').config()
const apiKey = process.env.REACT_APP_AI_APIKEY

const InputForm = (props) => {
    const [input, setInput] = useState(null)
    const [responses, setResponses] = useState([])


    const handleChange= (e) => {
        e.persist()
        setInput(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("input", input)
        makeRequest(input, apiKey)
            .then(res => {
                console.log("full res", res.data)
                console.log("response", res.data.choices[0].text)
            })
            .catch(console.error)
    }

    // useEffect(() =>{
    //     makeRequest(input, apiKey)
    //         .then(res => {
    //             console.log("full res", res.data)
    //             console.log("response", res.data.choices[0].text)
    //         })
    //         .catch(console.error)
    // }, [input])
    return (
        <>
            <h2>Hello there</h2>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Control name="request" type="text" onChange={handleChange}/>
                    <Button className="mt-2" type="submit">Submit</Button>
                </Form>
            </Container>
        </>
    )
}


export default InputForm