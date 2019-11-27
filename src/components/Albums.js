import React, { useState, useEffect } from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { getPhotos } from '../fetch/Fetch';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    borderStyle: 'solid',
  },
  media: {
    height: 140,
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "5em",
  },
  borderGreen: {
    borderColor: "green",
  },
  borderBlue: {
    borderColor: "blue",
  },
  borderPurple: {
    borderColor: "purple",
  }
});

const Albums = () => {
  const classes = useStyles();
  const [albums, setAlbums] = useState([]);
  
  useEffect(() => {
    const fetchAlbums = async () => {
      const photosResponse = await getPhotos();
      const albums = {};
      // organize albums by albumId
      photosResponse.forEach((photo) => {
        const album = albums[photo.albumId];
        if (album) {
          albums[photo.albumId] = [...album, photo];
        } else {
          albums[photo.albumId] = [photo];
        }
      });
      // filter the last 3 albums
      const filteredAlbums = [];
      const albumKeys = Object.keys(albums);
      albumKeys.forEach(albumKey => {
        if(albumKey > albumKeys.length - 3) {
          filteredAlbums.push(albums[albumKey]);
        }
      });
      setAlbums(filteredAlbums);
    };

    fetchAlbums();
  },[]);

  return (
    albums.map((album, index) => {
      // show the last two photos of the album
        return(
          <div className={classes.cardContainer}>
            <Card  key={album[album.length - 2].id} className={clsx(classes.card, {
              [classes.borderGreen] : (index===0),
              [classes.borderBlue] : (index===1),
              [classes.borderPurple] : (index===2),
            })}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={album[album.length - 2].url}
                  title={album[album.length - 2].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {album[album.length - 2].title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card key={album[album.length - 1].id} className={clsx(classes.card, {
              [classes.borderGreen] : (index===0),
              [classes.borderBlue] : (index===1),
              [classes.borderPurple] : (index===2),
            })}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={album[album.length - 1].url}
                  title={album[album.length - 1].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {album[album.length - 1].title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        );
    })
  );
};

export default Albums;