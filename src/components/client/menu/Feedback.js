import React, { useState } from 'react';
import UseScrollToHash from "../common/UseScrollToHash";
import * as serviceService from "../services/ServiceService";
import { toast } from "react-toastify";

const ContactForm = () => {
    UseScrollToHash();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState(''); // State for Name
    const [phone, setPhone] = useState(''); // State for Phone

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await serviceService.sendFeedback({email, message, imageFile});
            toast.success("Sent successfully");

            // Reset all fields after submission
            setName(''); // Reset Name
            setPhone(''); // Reset Phone
            setEmail(''); // Reset Email
            setMessage(''); // Reset Message
            setPreviewImage(null); // Reset Image Preview
            setImageFile(null); // Reset Image File
        } catch (error) {
            toast.error("Send failed");
        }
    };

    return (
        <section className="ftco-section contact-section" id="feedback">
            <div className="container mt-5">
                <div className="row block-9">
                    <div className="col-md-4 contact-info">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <h2 className="h4">Contact Information</h2>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <p><span>Website:</span> <a href="#">yoursite.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Name"
                                            value={name} // Bind name state
                                            onChange={(e) => setName(e.target.value)} // Handle name input
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Your Phone Number"
                                            pattern="[0-9]{10}"
                                            required
                                            value={phone} // Bind phone state
                                            onChange={(e) => setPhone(e.target.value)} // Handle phone input
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    name="imageUrl"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {previewImage && (
                                    <div>
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{maxWidth: '200px', maxHeight: '200px'}}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <textarea
                                    cols="30"
                                    rows="7"
                                    className="form-control"
                                    placeholder="Message Feedback"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary py-3 px-5"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactForm;
