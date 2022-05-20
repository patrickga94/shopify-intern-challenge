import React, {useState, useEffect} from "react";
import axios from 'axios';
import {makeRequest} from '../api/AiRequest'
import {Form, Button, Container} from "react-bootstrap"
require('dotenv').config()
const apiKey = process.env.REACT_APP_AI_APIKEY

const InputForm = (props) => {
    const [input, setInput] = useState(null)
    const [responses, setResponses] = useState([])
    const [responseBlocks, setResponseBlocks] = useState(<p>Make a request and see what the AI comes up with!</p>)


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
                let output = res.data.choices[0].text
                setResponses(prevResponse => {
                    return [{input, output}, ...prevResponse]
                })
            })
            .catch(console.error)
    }

    
    useEffect(()=>{
        if(responses.length > 0){
            setResponseBlocks(responses.map((element, index) => {
                console.log("element", element)
                console.log("index", index)
                return(
                    <div 
                        className="d-flex flex-column justify-content-center align-items-center m-2"
                        key={index}
                        style={{width: "50%", backgroundColor: "aliceblue"}}>
                        <p><strong>Prompt:</strong> {element.input}</p>
                        <p><strong>Response:</strong> {element.output}</p>
                    </div>
                )
        }))
        }
        console.log("response blocks", responseBlocks)
    }, [responses])


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
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Control name="request" type="text" onChange={handleChange}/>
                    <Button className="mt-2" type="submit">Submit</Button>
                </Form>
            </Container>
            <h2>Responses:</h2>
            <div className="d-flex flex-column justify-content-center align-items-center">
                    {responseBlocks}
            </div>
        </>
    )
}


export default InputForm