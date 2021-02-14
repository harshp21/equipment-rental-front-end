import React from 'react';
import './contact-us.css';

function ContactUs() {
    return (
        <div className="contact-us">
            <div className="contact-us__info">
                <div className="contact-us__info_section">
                    <div className="section_content">
                        <div className="content_title">About us</div>
                        <div className="content_description">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                    </div>
                    <div className="section_content">
                        <div className="content_title">Contact us</div>
                        <div className="content_description">Our complaint resolution process is designed to ensure fast and efficient resolution of your issue at the first point of contact. While we always aim to provide you with awesome customer service, we understand that there will be times when you may wish to express dissatisfaction with our products, services, staff or policies.</div>
                    </div>
                    <div className="section_content">
                        <div className="content_title">FAQs</div>
                        <div className="content_description">If you have a query related to our products, services or policies please go through our FAQ section, where you will find answers to the most common questions asked by our customers.
                        You can also visit our FAQ section for your order related queries.
                        Hopefully, you will find the answer to your query, but if you don’t, please feel free to contact us and we promise we will do our best to resolve your concern.</div>
                    </div>
                </div>
                <div className="contact-us__form">
                    <div className="contact-us__form_title"></div>

                    <div className="contact-us__form_label">
                        Name
                    </div>
                    <div className="contact-us__form_input-field">
                        <input type="text"></input>
                    </div>

                    <div className="contact-us__form_label">
                        Email Id
                    </div>
                    <div className="contact-us__form_input-field">
                        <input type="text"></input>
                    </div>

                    <div className="contact-us__form_label">LEAVE YOUR MESSAGE HERE</div>
                    <div className="contact-us__form_input-field">
                        <textarea></textarea>
                    </div>

                    <div className="contact-us__form_submit-btn">
                        <div className="submit-btn">Submit </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
