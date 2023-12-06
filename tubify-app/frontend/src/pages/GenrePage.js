import {React, useState, useEffect} from 'react';
import { Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import GenreDropDown from '../components/GenreDropDown';
import NavigationBar from '../components/NavigationBar';
import { randomBetweenZeroAndN, convertToEmbedUrl, identifyLinkType} from '../utils/functions';
import { popularityMap } from '../utils/maps';
import { SpotifyEmbed } from 'spotify-embed'; 
import { MAINROUTE } from '../utils/config';
import NoSongsAlert from '../components/NoSongAlert';

const GenrePage = () => {
  // Backend route
  const mainRoute = MAINROUTE;
  const [genres, setGenres] = useState([]);
  const [popularities, setPopularities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setURL] = useState([]);
  const [linkType, setLinkType] = useState("");
  const [noSong, setNoSong] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Start by setting loading to true and reset any errors
        setLoading(true);
        setError(null);

        // Fetch genres
        const genresResponse = await fetch(`${mainRoute}/genres`);
        if (!genresResponse.ok) throw new Error('Failed to fetch genres');
        const genresData = await genresResponse.json();
        setGenres(genresData);

        // Prepare for popularities
        setPopularities(Object.entries(popularityMap).map(([id, name]) => ({ id, name })));

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
      genre: selections.selectedGenre,
      popularity: selections.selectedPopularity
    };
    const queryString = new URLSearchParams(params).toString();
  
    try {
      // Make the GET request to the search route
      const response = await fetch(`${mainRoute}/search-by-genre-popularity?${queryString}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response data
      const data = await response.json();
      console.log(data);

      if (data.length > 0) {
        setNoSong(false);
        // Handle the response data
        // Randomly pick a song
        const randInt = randomBetweenZeroAndN(data.length-1);
        const url = data[randInt];
        console.log(url);

        const type = identifyLinkType(url);
        setLinkType(type);
        if (type === "YouTube") {
          const embedURL = convertToEmbedUrl(url);
          console.log(embedURL);
          setURL(embedURL);
          
        } else {
          setURL(url);
        }
      } else {
        setNoSong(true);
      }
      
      
    } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
    }
  };

  if (loading) {
    return (
      <>
      <NavigationBar></NavigationBar>

      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      </>
    );
  }
  
  if (error) {
    return (
      <>
      <NavigationBar></NavigationBar>
        <Alert variant="danger" className="text-center">
          Error: {error}
        </Alert>
      </>
     
    );
  }

    return (
        
      <>
      <NavigationBar></NavigationBar>
      
        <Container className="flex-grow-1 custom-padding my-3">
      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <GenreDropDown genres={genres} popularities={popularities} onSubmit={handleFormSubmit}/>
        </Col>
      </Row>
      <Row className="justify-content-center">
        { 

            noSong ?
            <NoSongsAlert />
            :
            <Col md={6}>
            <div className="embed-responsive embed-responsive-16by9">
              {
                  linkType === "YouTube" ? <iframe 
                  className="embed-responsive-item"
                  width="560" 
                  height="315" 
                  src={url} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
                :
                <SpotifyEmbed src={url}/>
              }
            </div>
          </Col>
        }
        
      </Row>
    </Container>
    </>
    );
};



export default GenrePage;
