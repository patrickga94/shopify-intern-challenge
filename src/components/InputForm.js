import React, {useState, useEffect} from "react";
import axios from 'axios';
import {makeRequest} from '../api/AiRequest'
require('dotenv').config()
const apiKey = process.env.REACT_APP_AI_APIKEY

const InputForm = (props) => {
    useEffect(() =>{
        makeRequest(apiKey)
            .then(res => {
                console.log(res)
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