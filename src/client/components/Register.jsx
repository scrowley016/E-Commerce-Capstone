
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Register () {

  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const navigate = useNavigate();
    // const notify = () => toast("Registration successful.");
    

    const registerUser = async (event) => {
        event.preventDefault();

        // form validation: email
        if (email.length < 3) {
            setEmailError("Email must be at least 3 characters in length");
            return;
          } else {
            setEmailError(null);
          }
          
          // form validation: password
          if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters in length");
            return;
          } else {
            setPasswordError(null);
          }

      try {
        const response = await fetch(
          'http://localhost:3000/api/users/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'yes'
          },
          body: JSON.stringify({
              name,
              email,
              password
          })})
        ;
        const result = await response.json();
        console.log(result);
        toast("Registration successful! Please sign in.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          })
            navigate('/login');
    
        return result
      } catch (err) {
        console.error(err)
      }    
  };

return (
    <>
    <div>
<h2 class='goldfont slightpadding'>Don't have an account? Sign up below.</h2>
 <form
 method="POST"
 onSubmit={registerUser} 
        onClick={() => {
            setEmail(email)
        }}>
<label class='goldfont slightpadding'>
    Name: {""}
    <input 
        class='field'
        placeholder='Enter Name'
        value = {name}
        
         onChange={(e)=> 
        setName(e.target.value)} />
</label>

<label class='goldfont slightpadding'>
    Email: {""}
    <input 
        class='field'
        placeholder='Enter Email'
        value = {email}
        type='email'
         onChange={(e)=> 
        setEmail(e.target.value)} />
</label>
{emailError && <p style={{ color: "red"}}>{emailError}</p>} 

<label class='goldfont slightpadding'>
        Password: {""}
         <input 
         class='field'
         placeholder='Create Password'
         type='password'
         value={password}
         onChange={(e)=> 
         setPassword(e.target.value)}/>
      </label>
    
         {passwordError && <p style={{ color: "red"}}>{passwordError}</p>}

         <button  type='Submit' class='sleekbutton' style=
            {{width: "80px", height: "37px", padding: "10px", 
            fontSize:"15px"}}
           
            //onClick={() => {
             //   navigate('/login');
            //}}
            >Register</button>
        
 </form>
 </div>
         </>
 );
};

