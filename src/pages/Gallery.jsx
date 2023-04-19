import React, { useState, Fragment, useEffect } from 'react';
import { Grid, Card, CardActionArea, CardMedia, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [category, setCategory] = useState('photos');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if(category === 'photos'){
      const fetchPhotos = async () => {
        const response = await fetch('http://localhost:5000/photos');
        const data = await response.json();
        setPhotos(data);
      };
    
      fetchPhotos();
    }else{
      const fetchVideos = async () => {
        const response = await fetch('http://localhost:5000/videos');
        const data = await response.json();
        setVideos(data);
      };
    
      fetchVideos();
    }
  }, [category]);  

  const handleCategoryChange = (_, newCategory) => {
    setCategory(newCategory);
  };

  const currentMedia = category === 'photos' ? photos : videos;

  return (
    <Fragment>
      <Tabs value={category} onChange={handleCategoryChange} centered>
        <Tab label="Photos" value="photos" sx={{width: '50%'}} />
        <Tab label="Videos" value="videos" sx={{width: '50%'}} />
      </Tabs>
      <Grid container spacing={2}>
        {currentMedia.map((media) => (
          <Grid item xs={12} sm={6} md={4} key={media.id}>
            <Card>
              <Link to={`/details/${media.id}`}>
                <CardActionArea>
                  {category === 'photos' ? (
                    <CardMedia component="img" image={media.src} alt={media.id} sx={{ aspectRatio: '16/9', width: '100%' }} />
                  ) : (
                    <CardMedia component="iframe" src={media.src} sx={{ aspectRatio: '16/9', width: '100%' }} style={{pointerEvents: 'none'}} />
                  )}
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default Gallery;