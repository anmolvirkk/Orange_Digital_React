/** @jsxImportSource @emotion/react */
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { CardMedia, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CommentSection from '../components/CommentSection';
import convertToK from '../utils/convertToK';
import { css } from '@emotion/react';

const Details = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const response = await fetch(`http://localhost:5000/details/${id}`);
      const data = await response.json();
      setMedia(data);
    };

    fetchMedia();
  }, [id]);

  if (!media) {
    return <div>Loading...</div>;
  }

  const backgroundStyle = css`
    background-image: linear-gradient(rgba(60, 30, 120, 0.8), rgba(30, 20, 80, 0.8)),
      url(${media.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 400px;
    display: flex;
    align-items: flex-end;
  `;

  const textStyle = css`
    flex: 1;
    padding: 24px;
    color: white;
  `;

  const detailStyle = css`
    display: flex;
    flex-flow: wrap;
    gap: 12px;
  `;

  const likesCommentsStyle = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 24px;
    color: white;
    gap: 24px;
  `;

  const likeCommentStyle = css`
    display: flex;
    align-items: center;
    gap: 6px;
  `;

  const colorBlack = css`
    color:black
  `

  return (
    <Fragment>
      {media.type==='photo'?
      <div css={backgroundStyle}>
        <div css={textStyle}>
          <Typography gutterBottom variant="h3" component="div">
            {media.title}
          </Typography>
          <div css={detailStyle}>
            <Typography variant="body2">By: {media.author}</Typography>
            <Typography variant="body2">At: {media.location}</Typography>
            <Typography variant="body2">On: {media.date}</Typography>
          </div>
        </div>
        <div css={likesCommentsStyle}>
          <div css={likeCommentStyle}>
            <FavoriteIcon />
            <Typography variant="body2">{convertToK(media.likes)}</Typography>
          </div>
          <div css={likeCommentStyle}>
            <ChatBubbleIcon />
            <Typography variant="body2">{convertToK(media.comments)}</Typography>
          </div>
        </div>
      </div>:
      <div>
        <CardMedia component="iframe" src={media.src} sx={{ aspectRatio: '16/9', width: '100%', maxWidth: 750 }} />
        <div css={[textStyle, colorBlack]}>
          <Typography gutterBottom variant="h3" component="div">
            {media.title}
          </Typography>
          <div css={detailStyle}>
            <Typography variant="body2">By: {media.author}</Typography>
            <Typography variant="body2">At: {media.location}</Typography>
            <Typography variant="body2">On: {media.date}</Typography>
          </div>
        </div>
        <div css={[likesCommentsStyle, colorBlack]}>
          <div css={likeCommentStyle}>
            <FavoriteIcon />
            <Typography variant="body2">{convertToK(media.likes)}</Typography>
          </div>
          <div css={likeCommentStyle}>
            <ChatBubbleIcon />
            <Typography variant="body2">{convertToK(media.comments)}</Typography>
          </div>
        </div>
      </div>
      }
      <CommentSection />
    </Fragment>
  );
};

export default Details;
