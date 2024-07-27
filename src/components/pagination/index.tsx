import { PageButton, Pagination } from './styles';

import { observer } from 'mobx-react-lite';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// const generatePageNumbers = (
//   currentPage: number,
//   totalPages: number
// ): number[] => {
//   const pages: number[] = [];

//   if (totalPages <= 7) {
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//   } else if (currentPage <= 4) {
//     pages.push(1, 2, 3, 4, 5, -1, totalPages);
//   } else if (currentPage > 4 && currentPage < totalPages - 4) {
//     pages.push(
//       1,
//       -1,
//       currentPage - 1,
//       currentPage,
//       currentPage + 1,
//       -1,
//       totalPages
//     );
//   } else if (currentPage <= totalPages - 4) {
//     pages.push(
//       1,
//       -1,
//       currentPage - 1,
//       currentPage,
//       currentPage + 1,
//       -1,
//       totalPages
//     );
//   } else {
//     pages.push(
//       1,
//       -1,
//       totalPages - 4,
//       totalPages - 3,
//       totalPages - 2,
//       totalPages - 1,
//       totalPages
//     );
//   }

//   return pages;
// };
const generatePageNumbers = (
  currentPage: number,
  totalPages: number
): number[] => {
  const pages: number[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage <= 4) {
    pages.push(1, 2, 3, 4, 5, -1, totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push(
      1,
      -1,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pages.push(
      1,
      -1,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      -1,
      totalPages
    );
  }

  return pages;
};

export const PaginationComponent = observer(
  ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pages = generatePageNumbers(currentPage, totalPages);

    if (totalPages <= 1) {
      return null;
    }

    return (
      <Pagination>
        {pages.map((page, index) =>
          page === -1 ? (
            <PageButton key={`ellipsis-${index}`} disabled>
              ...
            </PageButton>
          ) : (
            <PageButton
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </PageButton>
          )
        )}
      </Pagination>
    );
  }
);
