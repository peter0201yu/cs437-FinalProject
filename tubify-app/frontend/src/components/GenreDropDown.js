import {React, useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const GenreDropDown = ({ genres, popularities, onSubmit }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPopularity, setSelectedPopularity] = useState('');

  // Event handlers
  const handleGenreChange = (e) => setSelectedGenre(e.target.value);
  const handlePopularityChange = (e) => setSelectedPopularity(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const selections = {
      selectedGenre: selectedGenre,
      selectedPopularity: selectedPopularity
    };
    onSubmit(selections);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center g-3">
        <Col>
          <Form.Select aria-label="Artist select" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select aria-label="Setting select" value={selectedPopularity} onChange={handlePopularityChange}>
            <option value="">Select Popularity</option>
            {popularities.map((popularity) => (
              <option key={popularity.id} value={popularity.name}>{popularity.name}</option>
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

export default GenreDropDown;
