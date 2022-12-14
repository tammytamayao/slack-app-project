import {baseURL} from "../../config/AxiosConfig";
import {useState} from "react";

export const CreateUserWithFetch = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [userDetails, setUserDetails] = useState()
    
    const createUserWithFetch = async (evt) => {
        evt.preventDefault();
        try {
            const response = await fetch(`${baseURL}auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                })
            })
            console.log(await response.json())
            setUserDetails(await response.json());
        } catch (error) {
            console.log(error.message)
        }
    }
    console.log(email, password, passwordConfirmation)
    
    return (
        <div>
            <form onSubmit={evt => createUserWithFetch(evt)}>
                <input type="text" placeholder={"Email"} onChange={evt => setEmail(evt.target.value)}/>
                <input type="password" placeholder={"Password"} onChange={evt => setPassword(evt.target.value)}/>
                <input type="password" placeholder={"Re-type your password"}
                       onChange={evt => setPasswordConfirmation(evt.target.value)}/>
                <button type={"submit"}>Sign Up</button>
            </form>
        </div>
    )
}