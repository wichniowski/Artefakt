import React, { useState } from 'react';
import { css } from 'emotion';
import { Environment, Sequencer, VJ } from 'artefakt';
import Logo from './logo.svg';

const styles = {
  logo: css`
    width: 150px;
    position: absolute;
    right: 2rem;
    z-index: 9999;
    top: 2rem;
    cursor: pointer;
  `,
};

function SuperInterlacer() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <img
        src={Logo}
        className={styles.logo}
        onClick={() => setMenuOpen(!isMenuOpen)}
      />
      <Environment bpm={160}>
        <Sequencer midi>
          <VJ
            isMenuOpen={isMenuOpen}
            videos={[
              {
                id: 'eRpMctqzVOI',
                note: 'C',
              },
              {
                id: 'L7he8tHtPXM',
                note: 'D',
              },
              {
                id: '5xwLFRdewgE',
                note: 'E',
              },
              {
                id: 'y8nONfU8Mog',
                note: 'F',
              },
              {
                id: 'UjCdB5p2v0Y',
                note: 'G',
              },
              {
                id: 'aFsNz5VMyC8',
                note: 'A',
              },
              {
                id: '5l2V72BzlbM',
                note: 'B',
              },
            ]}
          ></VJ>
        </Sequencer>
      </Environment>
    </div>
  );
}

export default SuperInterlacer;
