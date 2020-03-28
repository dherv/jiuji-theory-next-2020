import { FC } from "react";
import { IVideo } from "../../interfaces/interfaces";
import YouTube from "react-youtube";
import { SCVideosList } from "./VideosList.styled";
import { SCVideosListSearch } from "./VideosListSearch.styled";
import { VideosUtils } from "./videos.utils";

const VideosList: FC<{ videos: IVideo[]; searchOn: boolean }> = ({
  videos,
  searchOn
}) => {
  const SC = searchOn ? SCVideosListSearch : SCVideosList;

  return (
    <SC.List>
      {videos.map(({ youtubeId, title, description }, index) => (
        <SC.ListItem key={`${youtubeId}_${index}`}>
          <SC.VideoCard key={youtubeId}>
            <YouTube
              opts={{
                ...VideosUtils.youtubeSizes.get("medium"),
                playerVars: {
                  origin: "http://localhost:3000",
                  modestbranding: 1,
                  enablejsapi: 1
                }
              }}
              videoId={youtubeId}
            />
            <SC.VideoCardContent>
              <SC.VideoCardTitle>{title}</SC.VideoCardTitle>
              <h5>{description}</h5>
            </SC.VideoCardContent>
          </SC.VideoCard>
        </SC.ListItem>
      ))}
    </SC.List>
  );
};

export default VideosList;
