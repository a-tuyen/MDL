import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import '../styles/ContactForm.scss';

const QuoteForm = () => {

  return (
    <div className="order">
      <div className='form-frame'>
        <h1>Request A Quote</h1>
        <p>Please fill out the form with your project details and we will be in touch</p>
        <form name="quote" method="post">
          <input type="hidden" name="form-name" value="quote" />
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label htmlFor="company">Company:</label>
            <input type="text" name="company" />
          </div>
          <div>
            <label htmlFor="phone">Phone #:</label>
            <input type="tel" name="phone" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" required />
          </div>
          <div>
            <label htmlFor="message">Project Details:</label>
            <textarea name="message" required />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;