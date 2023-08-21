import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
export default function Register(){
    const {setUser} = useAuth();
    const [nameError,setNameError] = useState("");
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password,cpassword} = e.target.elements;
        const body = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation:cpassword.value,
        }

        try{
            const resp = await axios.post("/register",body);
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/profile" />
            }
        }
        catch(error){
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
                if (error.response.data.errors.name) {
                    setNameError(error.response.data.errors.name[0]);

                }else{
                    setNameError("");
                }
            }
        }
    }
    
}