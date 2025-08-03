import useSelectedCharacters from '../../store/selectedCharacters';
import { downloadCSV } from '../../utils/csv';

import styles from './TotalSelected.module.css';

export default function TotalSelected() {
  const selectedCharacters = useSelectedCharacters(
    (state) => state.selectedCharacters
  );
  const unselectAll = useSelectedCharacters((state) => state.unselectAll);

  if (selectedCharacters.length === 0) {
    return null;
  }

  return (
    <div className={styles.totalSelected}>
      <div>Total selected characters: {selectedCharacters.length}</div>
      <div className={styles.totalSelectedButtons}>
        <button onClick={() => unselectAll()}>Unselect all</button>
        <button onClick={() => downloadCSV(selectedCharacters)}>
          Download
        </button>
      </div>
    </div>
  );
}
