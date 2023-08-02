import React from 'react';
import { Button, Label, Input } from "reactstrap";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { quoteFormValidations } from '../validators/quoteFormValidations';

const AddEditQuote = () => {
  // Taking the base url of the server
  const serverURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const {quoteID} = useParams();
  const todayDate = new Date().toLocaleDateString();
  const emptyQuoteData = {
    "author" : "",
    "quote" : "",
    "category" : "Life",
    "created_date" : todayDate
  };
  const emptyFormErrors = {
    "authorError" : "",
    "quoteError" : ""
  }

  // Intialising states
  const [quoteFormData, setQuoteFormData] = useState(emptyQuoteData);
  const [apiPostEditRequestSuccess, setApiPostEditRequestSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Errors related to API calls

  const [quoteFormErrors, setQuoteFormErrors] = useState(emptyFormErrors); // Errors related to form validations
  const [validQuoteData, setValidQuoteData] = useState(false); // Will be set to true if all the form validations are true
  

// Function to perform API calls (send requests to the server)

// The "fillQuoteData" function is for filling the form fields with the quote data WHILE UPDATING a quote
  const fillQuoteData = async(quoteID) => {
    try{
       await axios.get(`${serverURL}/api/quotes/${quoteID}`)
         .then((res) => {
           setQuoteFormData(res.data.data)
         })
         .catch((err) => {
           setErrorMessage(err.response.data.message);
           
         })
     }catch(error){
       setErrorMessage(error.response.data.message);   
     }
   }

// The "postQuoteFunction" function is for making API POST call WHILE ADDING a new quote
   const postQuoteFunction = async (quoteDat) => {
    try{
      await axios.post(`${serverURL}/api/quotes/`, quoteDat)
        .then((res) => {
          setApiPostEditRequestSuccess(true);
          setErrorMessage("");
          setQuoteFormData(emptyQuoteData);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
          setApiPostEditRequestSuccess(false);
        })
    }catch(error){
      setErrorMessage(error.response.data.message);
      setApiPostEditRequestSuccess(false);
    }
  }

  // The "updateQuoteFunction" function is for making API PUT call WHILE UPDATING a quote
  const updateQuoteFunction = async (quoteID, quoteDat) => {
    try{
      await axios.put(`${serverURL}/api/quotes/${quoteID}`, quoteDat)
        .then((res) => {
          setApiPostEditRequestSuccess(true);
          setErrorMessage("");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
          setApiPostEditRequestSuccess(false);
        })
    }catch(error){
      setErrorMessage(error.response.data.message);
      setApiPostEditRequestSuccess(false);
    }
  }


// While UPDATING a quote: when this component is mounted: executes "fillQuoteData" function once
useEffect(()=>{
  if(quoteID){
    fillQuoteData(quoteID);
  }
  // eslint-disable-next-line
}, []);
  


// Functions to handle form actions
// Function for handling the changes in the input fields (while adding or updating)
const handleChangeQuoteForm = (e) => {
  setQuoteFormData({...quoteFormData, [e.target.name] : e.target.value});

  // Validating the input fields' values

  // Validating the input value of "author"
  if(e.target.name === "author"){
    const isValidAuthorName = quoteFormValidations.validateAuthor(e.target.value);
    if(isValidAuthorName){
      setQuoteFormErrors({...quoteFormErrors, "authorError" : ""});
    }else{
      setQuoteFormErrors({...quoteFormErrors, "authorError" : "Should contain atleast 3 characters"});
    }
  }

  // Validating the input value of "quote"
  if(e.target.name === "quote"){
    const isValidQuote = quoteFormValidations.validateQuote(e.target.value);
    if(isValidQuote){
      setQuoteFormErrors({...quoteFormErrors, "quoteError" : ""});
    }else{
      setQuoteFormErrors({...quoteFormErrors, "quoteError" : "Should contain atleast 10 characters"});
    }
  }

// When there are no quoteFormErrors
// And when there are no empty mandatory fields
// Setting the "validQuoteData" to true
  if((quoteFormErrors.authorError==="" && quoteFormErrors.quoteError==="") && (quoteFormData.author!=="" && quoteFormData.quote!=="")){
    setValidQuoteData(true);
  }else{
    setValidQuoteData(false);
  }

}


// Function for handling the quote data submission
const handleSubmitQuoteForm = (e) => {
  e.preventDefault();
  if(quoteID){
    updateQuoteFunction(quoteID, quoteFormData);

  }else{
    postQuoteFunction(quoteFormData);
  }
}

// Function for handling the onClick event of "Cancel" button
const cancelQuoteFormSubmission = () => {
  if(quoteID){
    navigate('/quotes');
  }else{
    navigate('/');
  }
}


  return (
    <div className='quote-form-div'>
      <h5>{ quoteID ? "Edit quote" : "Add quote" }</h5>
      <hr />
      
      {errorMessage && ! apiPostEditRequestSuccess ? (
        // When there is an errorMessage (related to API call) and the "apiPostEditRequestSuccess" is FALSE : then it renders the error message to the web page
        <div>
          <br />
          <h6 style={{color:"red"}}>{errorMessage}</h6>
          <br />
          {quoteID ? 
          <Button color='warning' className='Button-class' onClick={() => navigate('/quotes')} >To quotes page</Button>
          :
          <Button color='warning' className='Button-class' onClick={() => navigate('/')} >To home page</Button>
        }
        </div>
        ): "" }


        
        {! errorMessage && ! apiPostEditRequestSuccess ? (
          // When there is NO errorMessage (related to API call) and the "apiPostEditRequestSuccess" is FALSE : then it renders the quote form to the web page
          // i.e., when this page loads: then it shows the below quote form
          <div> 
            <Label>Author</Label>
            <Input placeholder='Enter author name' type='text' name='author' value={quoteFormData.author} onChange={handleChangeQuoteForm} />
            <span>{quoteFormErrors.authorError ? quoteFormErrors.authorError : "" }</span>
            <br />

            <Label>Quote</Label>
            <Input placeholder='Enter quote' name='quote' type='textarea' value={quoteFormData.quote} onChange={handleChangeQuoteForm} />
            <span>{quoteFormErrors.quoteError ? quoteFormErrors.quoteError : "" }</span>
            <br />

            <Label>Category</Label>
            <Input placeholder='Enter category' name='category' value={quoteFormData.category} onChange={handleChangeQuoteForm} />
            <br />

            <Label>Created date</Label>
            <Input name='created_date' value={quoteFormData.created_date} disabled={true} onChange={handleChangeQuoteForm} />


            <Button color='success' className='Button-class' disabled={!validQuoteData} onClick={handleSubmitQuoteForm} >{quoteID ? "Update" : "Add" }</Button>
            <Button color='warning' className='Button-class' onClick={cancelQuoteFormSubmission} >Cancel</Button>
          </div>
        ) : "" }


        {apiPostEditRequestSuccess ? (
          // When the apiPostEditRequestSuccess is TRUE (i.e., the API call is success): then it renders the success message to the web page
          <div>
            <h6>{quoteID ? "Quote is updated successfully" : "Quote is added successfully" }</h6>
            <Button color='primary' onClick={()=>navigate('/quotes')}>To quotes page</Button>
          </div>

        ) : "" }

    </div>
  )
}

export default AddEditQuote


