import React, { useContext, useState } from "react";
import { SequencerContext } from "../Sequencer";
import Settings from "./Settings";
import { css, cx } from "emotion";

const styles = {
  active: css`
    display: block;
  `,
  screen: css`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    & > iframe {
      border: none;
    }
  `,
  noSignal: css`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    color: #ffcb05;
    text-transform: uppercase;
  `,
};

export type Playlist = {
  note: string;
  id: string;
};

interface VJProps {
  videos: Playlist[];
  isMenuOpen?: boolean;
}

const VJ: React.SFC<VJProps> = ({ videos, isMenuOpen }) => {
  const sequencerContext = useContext(SequencerContext);
  const [currentNote, setCurrentNote] = useState(null);
  const [playlist, setPlaylist] = useState(videos);

  sequencerContext.onStep((note: any, step: number) => {
    setCurrentNote(note.rawMidi.note.name);
  });

  return (
    <div>
      <Settings
        playlist={playlist}
        isOpen={isMenuOpen}
        onAddVideo={(video: Playlist) => {
          setPlaylist([...playlist, video]);
        }}
        onDelete={(id) =>
          setPlaylist(playlist.filter((video) => video.id !== id))
        }
        onMidiChannelChange={() => {}}
      />
      <div className={styles.noSignal}>
        <h1>No Signal</h1>
      </div>
      {playlist.map((video) => (
        <div
          className={cx(styles.screen, {
            [styles.active]: video.note === currentNote,
          })}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&loop=1&modestbranding=1&mute=1`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default VJ;
