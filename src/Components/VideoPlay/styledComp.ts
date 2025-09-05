import styled from 'styled-components';

export const VideoPlayerUI = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
`;

export const YoutubeVideoDiv = styled.div`
margin-left: 10px;
`

export const YoutubeVideo = styled.iframe`
  width: 75vw;
  height: 60vh;
`;

export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VideoTitle = styled.div`
  padding: 10px;
  p {
    font-weight: bold;
  }
`;

export const VideoChannelDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VideoCountLikeInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

export const VideoCountPub = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin-right: 5px;
    font-size: 11px;
  }
`;

export const VideoLikeDisLikeSave = styled.div`
  display: flex;
  flex-direction: row;
  div {
    margin-right: 15px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
  div * {
    margin-right: 5px;
  }
`;

export const HorizontalLine = styled.hr`
  background-color: gray;
  width: 100vw;
`;

export const VideoDescription = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 10px;
  * {
    margin-right: 10px;
  }
`;

export const ChannelLogoBox = styled.div`
  img {
    height: 50px;
    margin-top: 5px;
  }
`;

export const ChannelNameSubCountDes = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChannelName = styled.p`
  font-size: 14px;
`;

export const ChannelSubCount = styled.p`
  color: gray;
  font-size: 10px;
`;
