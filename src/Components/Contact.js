import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import img from "../assets/img.jpeg";

const StyledContactForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;

  .contact-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 150px;
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 400px;
    height: 400px;
    border-radius: 40%;
  }

  .image-caption {
    font-size: 14px;
    color: #333;
    margin-top: 10px;
    max-width: 300px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: blue;
  }

  p {
    font-size: 12px;
    color: #666;
    margin-bottom: 10px;
    max-width: 300px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  input,
  textarea,
  select {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
  }

  input[type="submit"] {
    background-color: #007bff;
    color: blue;
    cursor: pointer;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
  }

  .error {
    color: red;
    font-size: 12px;
  }
`;

const Contact = () => {
  const form = useRef();

  // Address options
  const addressOptions = [
    "123 Main St, New York, NY",
    "456 Oak St, Los Angeles, CA",
    "789 Pine St, Chicago, IL",
    "101 Maple St, Houston, TX",
    "202 Cedar St, Miami, FL",
  ];

  // State for form fields
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_subject: "",
    message: "",
    query_type: "",
    address: "", // Added address field
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation function
  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.user_name.trim()) {
      newErrors.user_name = "Full Name is required";
    }
    if (!emailRegex.test(formData.user_email)) {
      newErrors.user_email = "Invalid email format";
    }
    if (!formData.user_subject.trim()) {
      newErrors.user_subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }
    if (!formData.query_type) {
      newErrors.query_type = "Please select a query type";
    }
    if (!formData.address) {
      newErrors.address = "Please select an address";
    }

    return newErrors;
  };

  // Submit handler
  const sendEmail = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    emailjs
      .sendForm(
        "your_service_id",
        "your_template_id",
        form.current,
        "your_user_id"
      )
      .then(
        (result) => {
          console.log("Message Sent Successfully!", result.text);
        },
        (error) => {
          console.log("Failed to Send Message", error.text);
        }
      );

    // Reset form state after successful submission
    setFormData({
      user_name: "",
      user_email: "",
      user_subject: "",
      message: "",
      query_type: "",
      address: "", // Reset address field
    });

    e.target.reset();
  };

  return (
    <StyledContactForm>
      <div className="contact-container">
        <div className="image-container">
          <img src={img} alt="Chat with our support team" />
          <p className="image-caption">Chat with our support team</p>
        </div>

        <div className="form-container">
          <h2>Send a message</h2>
          <p>The support team will reach out within the next few hours</p>

          <form ref={form} onSubmit={sendEmail}>
            <label>Full Name</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
            {errors.user_name && <p className="error">{errors.user_name}</p>}

            <label>Email Address</label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
            />
            {errors.user_email && <p className="error">{errors.user_email}</p>}

            <label>Query Type</label>
            <select name="query_type" value={formData.query_type} onChange={handleChange}>
              <option value="">Select a query type</option>
              <option value="support">Support</option>
              <option value="sales">Sales</option>
              <option value="feedback">Feedback</option>
            </select>
            {errors.query_type && <p className="error">{errors.query_type}</p>}

            <label>Address</label>
            <select name="address" value={formData.address} onChange={handleChange}>
              <option value="">Select an address</option>
              {addressOptions.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </select>
            {errors.address && <p className="error">{errors.address}</p>}

            <label>Subject</label>
            <input
              type="text"
              name="user_subject"
              value={formData.user_subject}
              onChange={handleChange}
            />
            {errors.user_subject && <p className="error">{errors.user_subject}</p>}

            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <p className="error">{errors.message}</p>}

            <input type="submit" value="SEND MESSAGE" />
          </form>
        </div>
      </div>
    </StyledContactForm>
  );
};

export default Contact;
