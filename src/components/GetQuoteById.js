import React from 'react';
import { Button, Table } from "reactstrap";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const GetQuoteById = () => {
  // Taking the base url of the server
  const serverURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const {quoteID} = useParams();
  
  // Intialising states
  const [apiRequestSuccess, setApiRequestSuccess] = useState(false);
  const [singleQuoteData, setSingleQuoteData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

// Function to get a single quote from the database by requesting the server
  const getSingleQuote = async (id) => {
    try{
        await axios.get(`${serverURL}/api/quotes/${id}`)
          .then((res) => {
            setSingleQuoteData(res.data.data);
            setApiRequestSuccess(true);
            setErrorMessage("");
          })
          .catch((err) => {
            setErrorMessage(err.response.data.message);
            setApiRequestSuccess(false);
          })
    }catch(error){
      setErrorMessage(error.response.data.message);
      setApiRequestSuccess(false);
    }
  }

  // When this component is mounted: executes the "getSingleQuote()" function once
  useEffect(()=>{
    getSingleQuote(quoteID);
    // eslint-disable-next-line
  }, []);


  return (
    <div className="component-divs">
      <h5>View a quote</h5>
      <p>This page may take some time to load the data.</p>
      <hr />
      {apiRequestSuccess ? (
        // If the api request is success: then renders the below elements to the web page
            <div>
                  <Table responsive striped>
                    
                    <thead>
                      <tr>
                        <th>Author</th>
                        <th>Quote</th>
                        <th>Category</th>
                        <th>Created date</th>
                        <th>Id</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      <tr>
                        <td>{singleQuoteData.author}</td>
                        <td style={{maxWidth: '150px', maxHeight: '100px', overflow : "auto"}}>{singleQuoteData.quote}</td>
                        <td>{singleQuoteData.category}</td>
                        <td>{singleQuoteData.created_date}</td>
                        <td style={{maxWidth: '70px', whiteSpace: 'nowrap', overflow : "hidden", overflowX: 'scroll'}}>{singleQuoteData._id}</td>
                      </tr>
                    </tbody>
              </Table>
              {/* Button for going back to home page */}
              <Button color='primary' onClick={() => navigate('/')} >Back</Button>
            </div>
      ) : "" }

      {errorMessage ? (
        // When there is some error in the API call: renders the error message to the web page
        <div>
          <br />
          <h6 style={{color:"red"}}>{errorMessage}</h6>
          <br />
          {/* Button for going back to home page */}
          <Button color='primary' onClick={() => navigate('/')} >Back</Button>
        </div>
      ) : ""}
      
    </div>
  )
}

export default GetQuoteById