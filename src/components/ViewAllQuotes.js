import React from 'react';
import { Button, Table } from "reactstrap";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ViewAllQuotes = () => {
  // Taking the base url of the server
  const serverURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  
  // Intialising states
  const [apiRequestSuccess, setApiRequestSuccess] = useState(false);
  const [allQuotesData, setAllQuotesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  

  // Function for handling the API GET call for getting the data of all quotes
  const getAllQuotes = async () => {
    try{
        await axios.get(`${serverURL}/api/quotes`)
          .then((res) => {
            setAllQuotesData(res.data.data);
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

  // When this component is mounted: the "getAllQuotes()" function will be executed once
  useEffect(()=>{
    getAllQuotes();
    // eslint-disable-next-line
  }, []);


  // Function for handling the DELETE operation
  const handleDeleteQuote = async (quoteID) => {
      try{
        await axios.delete(`${serverURL}/api/quotes/${quoteID}`)
          .then((res) => {
            getAllQuotes();
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


  return (
    <div className="component-divs" style={{fontSize: "small"}}>
    <h5>View All Quotes</h5>
    <p>This page may take some time to load the data.</p>
      <hr />
      {apiRequestSuccess ? (
        // If the API request (call) is success: renders the below components to the web page
            <div>
                  <Table responsive striped > 
                    <thead>
                      <tr>
                        <th>Author</th>
                        <th>Quote</th>
                        <th>Category</th>
                        <th>Created date</th>
                        <th>Id</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      {allQuotesData.map((doc, docIndex) => 
                          <tr key={docIndex}>
                          <td>{doc.author}</td>
                          <td style={{maxWidth: '150px', maxHeight: '100px', overflow : "auto"}}>{doc.quote}</td>
                          <td>{doc.category}</td>
                          <td>{doc.created_date}</td>
                          <td style={{maxWidth: '70px', whiteSpace: 'nowrap', overflow : "hidden", overflowX: 'scroll'}}>{doc._id}</td>
                          <td>
                            {/* Button "Edit" will navigate to the "AddEditQuote.js" component */}
                            <Button color='warning' className='action-buttons' style={{fontSize:"smaller"}} onClick={() => navigate('/quotes/editquote/' + doc._id )} >Edit</Button>
                            <Button color='danger' className='action-buttons' style={{fontSize:"smaller"}} onClick={() => handleDeleteQuote(doc._id)} >Delete</Button>
                          </td>
                          </tr>

                      )}
                    </tbody>
              </Table>
              <Button color='primary' onClick={() => navigate('/')} >To home page</Button>
            </div>
      ) : "" }

      {errorMessage ? (
        // If there is any error message in the API call: then it renders the error message to the web page
        <div>
          <br />
          <h6 style={{color:"red"}}>{errorMessage}</h6>
          <br />
          <Button color='primary' onClick={() => navigate('/')} >To home page</Button>
        </div>
      ) : ""}
      
    </div>
  )
}

export default ViewAllQuotes


