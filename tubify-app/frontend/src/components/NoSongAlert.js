import React from 'react';
import { Alert } from 'react-bootstrap';

const NoSongsAlert = () => {
    return (
      <Alert variant="warning" className="text-center">
        No songs available.
      </Alert>
    );
};

export default NoSongsAlert;