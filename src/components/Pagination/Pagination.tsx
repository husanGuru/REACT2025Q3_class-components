import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// const PAGINATION_LIMIT = 5;

//page = 1 totalPages=6
//page = 2 totalPages=6
//page = 3 totalPages=6
//page = 4 totalPages=6
//page = 5 totalPages=6
//page = 6 totalPages=6

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  // let activeLeft = 0;
  // let activeRight = 0;
  // 1 0
  //2 1
  //3 2
  //4 3
  //5 4
  //6

  //99 5
  //100 5

  // if (totalPages > PAGINATION_LIMIT) {

  // }
  // switch (true) {
  //   case totalPages > PAGINATION_LIMIT:
  //     activeLeft = page - PAGINATION_LIMIT;
  //     break;

  //   default:
  // }

  // if (totalPages > PAGINATION_LIMIT) {
  //   startPages = PAGINATION_LIMIT;
  // }

  return (
    <div className={styles.pagination}>
      {page > 1 && (
        <button key={0} className={`${styles.item}`}>
          1
        </button>
      )}

      {
        // Array.from({ length: activeLeft }, (_, i) => i + 1).map((pageNumber) => (
        //   <button
        //     key={pageNumber}
        //     className={styles.item}
        //     onClick={() => onChange(pageNumber)}
        //   >
        //     {pageNumber}
        //   </button>
        // ))
      }

      <button key={page - 1} className={`${styles.item} ${styles.active}`}>
        {page}
      </button>

      {
        // Array.from({ length: activeRight }, (_, i) => activeRight - i).map(
        //   (pageNumber) => (
        //     <button
        //       key={pageNumber}
        //       className={styles.item}
        //       onClick={() => onChange(pageNumber)}
        //     >
        //       {pageNumber}
        //     </button>
        //   )
        // )
      }

      {page < totalPages && (
        <button
          key={totalPages}
          className={`${styles.item}`}
          onClick={() => onChange(totalPages)}
        >
          {totalPages + 1}
        </button>
      )}
    </div>
  );
}
