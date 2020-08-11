import React, { useState } from "react";
import { css, cx } from "emotion";
import { Playlist } from "./";

const styles = {
  container: css`
    text-transform: uppercase;
    color: #ffcb05;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 90;
    left: 0;
    top: 0;
  `,
  closed: css`
    display: none;
  `,
  label: css`
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.5rem;
  `,
  input: css`
    outline: none;
    text-transform: uppercase;
    background: none;
    color: #ffcb05;
    font-size: 1rem;
    border: none;
    border-bottom: 1px dotted #ffcb05;
  `,
  button: css`
    background: #ffcb05;
    color: black;
    border: none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 1rem 0;
  `,
  wrapper: css`
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    padding: 1rem;
    width: 100%;
    height: 100%;
  `,
  playlist: css`
    padding: 0;
    list-style: none;
    text-transform: uppercase;
  `,
  midi: css`
    position: absolute;
    margin: 1rem;
    bottom: 0;
    right: 0;
  `,
  form: css`
    padding: 1rem 0;
  `,
  deleteButton: css`
    text-transform: uppercase;
    background: #ffcb05;
    border: none;
    color: black;
    margin-left: 1rem;
  `,
  menuButton: css`
    cursor: pointer;
    outline: none;
    position: absolute;
    font-size: 1rem;
    right: 0;
    top: 0;
    background: #ffcb05;
    border: none;
    z-index: 99;
  `,
  field: css`
    margin-bottom: 1rem;
  `,
};

interface SettingsProps {
  playlist: Playlist[];
  onAddVideo: (video: Playlist) => void;
  onMidiChannelChange: (channel: string) => void;
  onDelete: (videoId: string) => void;
  isOpen?: boolean;
}

const Settings: React.SFC<SettingsProps> = ({
  playlist,
  onAddVideo,
  onMidiChannelChange,
  onDelete,
  isOpen,
}) => {
  const [video, setVideo] = useState({ id: "", note: "" });

  return (
    <div className={styles.container}>
      <div className={cx(styles.wrapper, { [styles.closed]: isOpen })}>
        <div>
          <h1>Channels</h1>
          <ul className={styles.playlist}>
            {playlist.map((video, index) => (
              <li>
                <span>
                  Channel {index}: {video.id} - {video.note}
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    onDelete(video.id);
                  }}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onAddVideo(video);
          }}
        >
          <div className={styles.field}>
            <label htmlFor="id" className={styles.label}>
              Youtube ID:
            </label>
            <input
              name="id"
              type="text"
              className={styles.input}
              onChange={(e) => {
                setVideo({ ...video, id: e.target.value });
              }}
            ></input>
          </div>
          <div className={styles.field}>
            <label htmlFor="note" className={styles.label}>
              Note:
            </label>
            <input
              name="note"
              type="text"
              className={styles.input}
              onChange={(e) => {
                setVideo({ ...video, note: e.target.value });
              }}
            ></input>
          </div>
          <button type="submit" className={styles.button}>
            Add
          </button>
        </form>
        <div className={styles.midi}>
          <label htmlFor="midichannel" className={styles.label}>
            Midi Channel:
          </label>
          <input
            name="midichannel"
            type="text"
            className={styles.input}
            onChange={(e) => {
              onMidiChannelChange(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
