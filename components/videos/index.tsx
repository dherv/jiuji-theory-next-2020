import { useState, useEffect, MouseEvent } from "react";
import Api from "../../api/Api";
import VideosSearchForm from "./VideosSearchForm";
import VideosList from "./VideosList";
import { IVideo, INote } from "../../interfaces/interfaces";
import { SCVideos as SC } from "./index.styled";
import VideosSelectNotes from "./VideosSelectNotes";

const Videos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [searchOn, setSearchOn] = useState<boolean>(false);
  const [videoToAdd, setVideoToAdd] = useState<IVideo>(null);
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchNotes = (): Promise<void> => {
    return Api.get<INote>("/notes")
      .then(notes => setNotes(notes))
      .catch(error => {
        return console.error(error);
      });
  };

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

  const addVideo = async (video: IVideo): Promise<void> => {
    await fetchNotes();
    setVideoToAdd(video);
  };

  const saveVideoWithNotes = (notes: INote[]) => {
    const video = videoToAdd;
    videoToAdd.notes = notes;
    Api.post<IVideo, IVideo>("/videos", video)
      .then(() => setVideoToAdd(null))
      .catch(error => console.error(error));
  };

  return (
    <>
      <VideosSearchForm onSearch={search} />
      <SC.VideosContainer>
        <VideosList videos={videos} searchOn={searchOn} addVideo={addVideo} />
        {videoToAdd !== null && (
          <VideosSelectNotes
            notes={notes}
            videoTitle={videoToAdd.title}
            saveVideoWithNotes={saveVideoWithNotes}
          />
        )}
      </SC.VideosContainer>
    </>
  );
};

export default Videos;
