import {React, useState, useEffect} from 'react';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import MainDropDown from '../components/MainDropDown';

// Random num generator between 0 and N (inclusive)
function randomBetweenZeroAndN(n) {
    return Math.floor(Math.random() * (n + 1));
}

function convertToEmbedUrl(youtubeUrl) {
    const videoId = youtubeUrl.split('watch?v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
}

const MainPage = () => {
  // Backend route
  const mainRoute = 'http://127.0.0.1:5000';
  const [artists, setArtists] = useState([]);
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setURL] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Start by setting loading to true and reset any errors
        setLoading(true);
        setError(null);

        // Fetch artists
        const artistsResponse = await fetch(`${mainRoute}/main_artists`);
        if (!artistsResponse.ok) throw new Error('Failed to fetch artists');
        const artistsData = await artistsResponse.json();
        setArtists(artistsData);

        // Fetch settings
        const settingsResponse = await fetch(`${mainRoute}/settings`);
        if (!settingsResponse.ok) throw new Error('Failed to fetch settings');
        const settingsData = await settingsResponse.json();
        setSettings(settingsData);

      } catch (err) {
        // If an error occurs, set the error state
        setError(err.message);
      } finally {
        // Set loading to false after fetching is complete or if an error occurred
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (selections) => {
    // Construct the query string from selections

    const params = {
      artist: selections.selectedArtist,
      setting: selections.selectedSetting
    };
    const queryString = new URLSearchParams(params).toString();
  
    try {
      // Make the GET request to the search route
      const response = await fetch(`${mainRoute}/search?${queryString}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response data
      const data = await response.json();
      
      // Handle the response data
      // Randomly pick a song
      const randInt = randomBetweenZeroAndN(data.length-1);
      const url = data[randInt];
      console.log(url);
      const embedURL = convertToEmbedUrl(url);
      console.log(embedURL);
      setURL(embedURL);

    } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        Error: {error}
      </Alert>
    );
  }
    return (
        
        <Container className="flex-grow-1 custom-padding my-3">
      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <MainDropDown artists={artists} settings={settings} onSubmit={handleFormSubmit}/>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe 
              className="embed-responsive-item"
              width="560" 
              height="315" 
              src={url} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </Col>
      </Row>
    </Container>
    );
};



export default MainPage;
