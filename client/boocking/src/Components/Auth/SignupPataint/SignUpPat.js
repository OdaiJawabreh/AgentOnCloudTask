import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";



function SignUpPat() {
    const [firstName, serFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useNavigate();
    return (
        <div>
            
        </div>
    )
}

export default SignUpPat
