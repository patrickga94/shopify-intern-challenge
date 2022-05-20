import React, {useState, useEffect} from "react";
import {makeRequest} from '../api/AiRequest'
import {Form, Button, Container, Row, Col} from "react-bootstrap"
require('dotenv').config()
const apiKey = process.env.REACT_APP_AI_APIKEY

const InputForm = (props) => {
    const [input, setInput] = useState(null)
    const [responses, setResponses] = useState([])
    const [responseBlocks, setResponseBlocks] = useState(
        <div 
            className="d-flex flex-column justify-content-center align-items-center m-2"
            style={{width: "50%", backgroundColor: "aliceblue", border: "2px solid black"}}>
                <p><strong>Submit a prompt and see what the AI comes up with!</strong></p>
        </div>
        )


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
        setInput("")
        if(responses.length > 0){
            setResponseBlocks(responses.map((element, index) => {
                console.log("element", element)
                console.log("index", index)
                return(
                    <div 
                        className="m-2"
                        key={index}
                        style={{width: "50%", backgroundColor: "aliceblue", border: "2px solid black", padding: "10px"}}>
                        <Row className="m-2">
                            <Col className="col-2">
                                <h5>Prompt:</h5> 
                            </Col>
                            <Col className="col-10">
                                <p>{element.input}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-2">
                                <h5>Response:</h5> 
                            </Col>
                            <Col className="col-10">
                                <p>{element.output}</p>
                            </Col>
                        </Row>
                    </div>
                )
        }))
        }
        console.log("response blocks", responseBlocks)
    }, [responses])


    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        name="request" 
                        type="text"
                        value={input}
                        placeholder="Enter a prompt for the AI!"
                        onChange={handleChange}/>
                    <Button className="mt-2" type="submit">Submit</Button>
                </Form>
            </Container>
            <h2 className="mt-5">Responses:</h2>
            <div className="d-flex flex-column justify-content-center align-items-center">
                    {responseBlocks}
            </div>
        </>
    )
}


export default InputForm