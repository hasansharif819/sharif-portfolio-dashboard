import React from 'react';
import { useGetAllContactsQuery } from '../../../redux/features/contact/contact.api';
import { Card, Col, Row, Spin } from 'antd';
import './Contact.css';

const { Meta } = Card;

// Define the type for the contact data
interface ContactData {
  _id: string;
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { data: contacts, isFetching } = useGetAllContactsQuery({});

  if (isFetching) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contacts: {contacts?.data?.length}</h1>
      <Row gutter={[16, 16]} className="contact-row">
        {contacts ? (
          contacts?.data?.map((contact: ContactData) => (
            <Col xs={24} sm={24} md={12} lg={8} key={contact._id} className="contact-col">
              <Card hoverable className="contact-card">
                <Meta
                  title={contact.name}
                  description={
                    <>
                      <p style={{ color: 'black' }}><strong>Email:</strong> {contact.email}</p>
                      <p style={{ color: 'black' }}><strong>Message:</strong> {contact.message}</p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </Row>
    </div>
  );
};

export default Contact;
