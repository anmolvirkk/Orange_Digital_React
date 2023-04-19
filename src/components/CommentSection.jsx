/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, Fragment } from 'react';
import { Card, Typography } from '@mui/material';
import {useLocation} from 'react-router-dom'
import moment from 'moment/moment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import convertToK from '../utils/convertToK';

const CommentSection = () => {

  const [comments, setComments] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const parts = location.pathname.split('/');
    const id = parts[2];
    if (id) {
      const fetchComments = async () => {
        const response = await fetch(`http://localhost:5000/comments/${id}`);
        const data = await response.json();
        setComments(data.comments);
      };
      fetchComments();
    }
  }, [location]);

  const commentInfoStyle = css`
    margin-top: 6px;
    display: flex;
    align-content: center;
    gap: 6px;
    opacity: 0.6;
  `

  const centerStyle = css`
    display: flex;
    align-content: center;
    justify-content: center;
    gap: 6px;
  `;

  const cardStyle = css`
    display: flex;
    padding: 12px;
    gap: 12px;
    box-shadow: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    border-radius: 0;
  `;

  const imgStyle = css`
    object-fit: cover;
  `;

  const lineHeight = css`
    line-height: 2;
  `

  return (
    <Fragment>
      {comments.length === 0 && <Typography variant="body2">No comments yet.</Typography>}
      {comments.map((comment) => (
        <Card key={comment.id} sx={cardStyle}>
          <img src={comment.profileImg} alt={comment.username} width="80" height="80" css={imgStyle} />
          <div>
            <Typography variant="h6">{comment.username}</Typography>
            <Typography variant="body2">{comment.comment}</Typography>
            <div css={commentInfoStyle}>
              <div css={centerStyle}>
                <AccessTimeIcon />
                <Typography sx={lineHeight} variant="caption">{moment(comment.date).fromNow()}</Typography>
              </div>
              <div css={centerStyle}>
                <FavoriteIcon />
                <Typography sx={lineHeight} variant="caption">{convertToK(comment.likes)}</Typography>
              </div>
              <div css={centerStyle}>
                <ChatBubbleIcon />
                <Typography sx={lineHeight} variant="caption">{convertToK(comment.replies)}</Typography>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </Fragment>
  );
};

export default CommentSection;
