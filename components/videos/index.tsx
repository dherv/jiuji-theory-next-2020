import { useState, useEffect, MouseEvent } from "react";
import Api from "../../api/Api";
import VideosSearchForm from "./VideosSearchForm";
import VideosList from "./VideosList";
import { IVideo } from "../../interfaces/interfaces";

const Videos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [searchOn, setSearchOn] = useState<boolean>(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    Api.get("/videos")
      .then(videos => setVideos(videos))
      .catch(error => console.error(error));
  };

  const search = (event: MouseEvent<HTMLButtonElement>, query: string) => {
    event.preventDefault();
    const queryWithDefaultKeywords = `bjj ${query}`;
    return Api.post<{ q: string; maxResults: number }, IVideo[]>(
      "/videos/search",
      {
        q: queryWithDefaultKeywords,
        maxResults: 15
      }
    )
      .then(videos => {
        setVideos(videos);
        setSearchOn(true);
      })

      .catch(error => console.error(error));
  };

  return (
    <>
      <VideosSearchForm onSearch={search} />
      <VideosList videos={videos} searchOn={searchOn} />
    </>
  );
};

export default Videos;
