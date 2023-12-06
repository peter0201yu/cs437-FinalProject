import {React, useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const SettingDropDown = ({ artists, settings, onSubmit }) => {
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedSetting, setSelectedSetting] = useState('');

  // Event handlers
  const handleArtistChange = (e) => setSelectedArtist(e.target.value);
  const handleSettingChange = (e) => setSelectedSetting(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const selections = {
      selectedArtist: selectedArtist,
      selectedSetting: selectedSetting
    };
    onSubmit(selections);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center g-3">
        <Col>
          <Form.Select aria-label="Artist select" value={selectedArtist} onChange={handleArtistChange}>
            <option value="">Select Artist</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>{artist.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select aria-label="Setting select" value={selectedSetting} onChange={handleSettingChange}>
            <option value="">Select Setting</option>
            {settings.map((setting) => (
              <option key={setting.id} value={setting.id}>{setting.name}</option>
            ))}
          </Form.Select>
        </Col>
        {/* Submit Button */}
        <Col>
          <Button variant="success" type="submit" className="w-100" >Play!</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SettingDropDown;
