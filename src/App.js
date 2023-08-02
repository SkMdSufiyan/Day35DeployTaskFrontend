import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importing the components
import Home from "./components/Home.js";
import ViewAllQuotes from "./components/ViewAllQuotes.js";
import AddEditQuote from "./components/AddEditQuote.js";
import GetQuoteById from "./components/GetQuoteById.js";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* Establishing routes */}
        <Routes>
          {/* For home page */}
          <Route path="/" element={<Home />} /> 
          {/* For displaying all the quotes */}
          <Route path="/quotes" element={<ViewAllQuotes />} />
          {/* For adding a new quote */}
          <Route path="/quotes/addquote" element={<AddEditQuote />} />
          {/* For updating a quote */}
          <Route path="/quotes/editquote/:quoteID" element={<AddEditQuote />} />
          {/* For getting single quote by supplying quoteID */}
          <Route path="/quotes/:quoteID" element={<GetQuoteById />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
