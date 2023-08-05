import React from 'react';
import { Button, Label, Input, Card, CardBody } from "reactstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// This component contains navigation buttons and input field for quoteID (when trying to get a single quote by supplying quoteID)
const Home = () => {
  
  const navigate = useNavigate();
  // Intialising states
  const [requestSingleQuote, setRequestSingleQuote] = useState(false);
  const [idSupplied, setIdSupplied] = useState("");
  const [emptyId, setEmptyId] = useState(true); // "emptyId" will be set to false when the user supplies a non-empty quoteID

  // Function to initiate single quote search
  const initiateSingleQuoteSearch = (e) => {
    e.preventDefault();
    setRequestSingleQuote(true);
  }

  // Function for handling the quoteID input field
  const handleChangeQuoteIdField = (e) => {
    setIdSupplied(e.target.value);
    // Validating whether the quoteID supplied is non-empty
    if(e.target.value.length!==0){
      setEmptyId(false);
    }else{
      setEmptyId(true);
    }
  }

  // Function to handle submission for the quoteID input field
  const handleSubmitQuoteId = (e) => {
    e.preventDefault();
    // When the "Submit" button is clicked: then it navigates to the "GetQuoteById.js" component
    navigate(`/quotes/${idSupplied}`);
    // And sets the value of "idSupplies" to ""
    setIdSupplied("");
  }

  // Function to handle the cancel single quote search
  const cancelSingleQuoteSearch = (e) => {
    e.preventDefault();
    setRequestSingleQuote(false);
    setIdSupplied("");
    setEmptyId(true);

  }


  return (
    <div className="quote-form-div">
      <p><b style={{color:"blue"}}>Welcome to the quotes application</b></p>
      
      
    {requestSingleQuote? (
      // If the "View a quote" button is clicked: then renders the below card to the web page
      <Card style={{width: '18rem'}}>
        <CardBody>
          <Label>Quote id</Label>
          <br />
          <Input placeholder='Enter quote id' value={idSupplied} onChange={handleChangeQuoteIdField} />
          <span>{emptyId ? "Enter valid id" : ""}</span>
          <br />
          <Button color='success' className='Button-class' disabled={emptyId} onClick={handleSubmitQuoteId} >Submit</Button>
          <Button color='warning' className='Button-class' onClick={cancelSingleQuoteSearch} >Cancel</Button>
        </CardBody>
      </Card>

    ) : (
      // When just the home page is opened and any button is not clicked then renders the below elements to the web page
        <div>
          <Button className='Button-class' color='primary' onClick={initiateSingleQuoteSearch}>View a quote</Button>
          <Button className='Button-class' color='warning' onClick={()=>navigate('/quotes')}>View all quotes</Button>
          <br />
          <Button className='Button-class' color='success' onClick={()=>navigate('/quotes/addquote')}>Add a quote</Button>
        </div>
    )}
    </div>
  )
}

export default Home
