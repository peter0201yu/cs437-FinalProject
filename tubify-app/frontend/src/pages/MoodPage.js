import {React, useState} from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { moodMap } from '../utils/maps';
import { MAINROUTE } from '../utils/config';
import { randomBetweenZeroAndN, identifyLinkType, convertToEmbedUrl } from '../utils/functions';
import { SpotifyEmbed } from 'spotify-embed';
import NoSongsAlert from '../components/NoSongAlert';

const MoodPage = () => {
  const [url, setURL] = useState([]);
  const [linkType, setLinkType] = useState("");
  const [error, setError] = useState(null);
  const [noSong, setNoSong] = useState(false);

  const mainRoute = MAINROUTE;
  const moods = [
    { name: "Studying", color: 'primary' },
    { name: "Workout", color: 'danger' },
    { name: "Relaxing", color: 'success' },
    { name: "Emotional", color: 'warning' },
    { name: "Party", color: 'info' }
  ];

  const handleSubmit = async (moodName) => {
    // Placeholder for submitting the value
    console.log(`Submitting mood: ${moodName}`);
    // Here you would have logic to send moodName to your Flask backend

    const params = {
      mood: moodName,
    };

    const queryString = new URLSearchParams(params).toString();
  
    try {
       // Start by setting loading to true and reset any errors
       setError(null);

      // Make the GET request to the search route
      const response = await fetch(`${mainRoute}/search-by-mood?${queryString}`);
      
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
      
    }
    catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
      setError(error.message);
    } 
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
    <NavigationBar />
    <Container className="flex-grow-1 custom-padding my-3">
    <h2 className="text-center mb-4" style={{ color: 'black' }}>Moods</h2>
        <Row className="justify-content-center">
          {moods.map((mood, index) => (
            <Col key={index} md={2} className="mb-3">
               <Button
                variant="outline-dark"
                className={`text-left w-100 py-3 border-start border-4 border-${mood.color}`}
                onClick={() => handleSubmit(mood.name)}
                style={{ color: 'black' }}
              >
                {mood.name}
              </Button>
            </Col>
          ))}
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

export default MoodPage;
