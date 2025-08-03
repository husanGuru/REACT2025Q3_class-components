import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const PAGINATION_LIMIT = 5;

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  let activeLeft = 0;
  let activeRight = 0;

  activeLeft = page - 1 > PAGINATION_LIMIT ? PAGINATION_LIMIT : page - 2;
  activeRight =
    page < totalPages - PAGINATION_LIMIT
      ? PAGINATION_LIMIT
      : totalPages - page - 1;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.item}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        {'<-'}
      </button>
      {page > 1 && (
        <button
          key={1}
          className={`${styles.item}`}
          onClick={() => onChange(1)}
        >
          1
        </button>
      )}
      {page > PAGINATION_LIMIT + 2 && '...'}

      {Array.from({ length: activeLeft }, (_, i) => i + 1)
        .reverse()
        .map((pageNumber) => (
          <button
            key={page - pageNumber}
            className={styles.item}
            onClick={() => onChange(page - pageNumber)}
          >
            {page - pageNumber}
          </button>
        ))}

      <button key={page} className={`${styles.item} ${styles.active}`}>
        {page}
      </button>

      {Array.from({ length: activeRight }, (_, i) => i + 1).map(
        (pageNumber) => (
          <button
            key={page + pageNumber}
            className={styles.item}
            onClick={() => onChange(page + pageNumber)}
          >
            {page + pageNumber}
          </button>
        )
      )}

      {page < totalPages - PAGINATION_LIMIT - 1 && '...'}

      {page < totalPages && (
        <button
          key={totalPages}
          className={`${styles.item}`}
          onClick={() => onChange(totalPages)}
        >
          {totalPages}
        </button>
      )}
      <button
        className={styles.item}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        {'->'}
      </button>
    </div>
  );
}
