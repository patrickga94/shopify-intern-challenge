import React, {useState, useEffect} from "react";
import axios from 'axios';
import {makeRequest} from '../api/AiRequest'
require('dotenv').config()
const apiKey = process.env.REACT_APP_AI_APIKEY

const InputForm = (props) => {
    useEffect(() =>{
        makeRequest("Write a poem about a dog wearing skis", apiKey)
            .then(res => {
                console.log("response", res.data.choices[0].text)
            })
            .catch(console.error)
    }, [])
    return (
        <>
            <h2>Hello there</h2>
        </>
    )
}


export default InputForm