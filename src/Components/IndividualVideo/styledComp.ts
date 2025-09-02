import styled from 'styled-components';

export const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%; 
  padding: 10px;
  cursor: pointer;
  
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

export const AboutVideo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  gap: 8px;
`;

export const ChannelInfo = styled.div`
  flex-shrink: 0;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;

export const PublisherInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const VideoTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;

export const ChannelName = styled.p`
  font-size: 12px;
  color: gray;
  margin: 2px 0;
`;

export const VideoViews = styled.div`
  display: flex;
  font-size: 10px;
  color: gray;
  gap: 4px;
`;
