import React, { useEffect, useState } from 'react';

type propTypes = {
  maxPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<propTypes> = ({ page, setPage, maxPage }) => {
  const [pageTemp, setPageTemp] = useState<number>(page);

  useEffect(() => {
    setPageTemp(page);
  }, [page]);

  const isPreviousDisabled = page === 1;
  const isNextDisabled = page >= maxPage;

  const previousClickAction = () => {
    if (isPreviousDisabled) {
      return;
    }
    setPage(page - 1);
  };

  const nextClickAction = () => {
    if (isNextDisabled) {
      return;
    }
    setPage(page + 1);
  };

  const inputChangeAction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageTemp(Number(event.target.value));
  };

  const inputBlurAction = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > maxPage) {
      setPage(maxPage);
      return;
    }

    if (Number(event.target.value) < 1) {
      setPage(1);
      return;
    }

    setPage(Number(event.target.value));
  };

  return (
    <div className="flex gap-4">
      <button disabled={isPreviousDisabled} onClick={previousClickAction}>
        Prev
      </button>
      <input
        className="w-6 border-2"
        type="text"
        onChange={inputChangeAction}
        onBlur={inputBlurAction}
        value={pageTemp}
      />
      <button disabled={isNextDisabled} onClick={nextClickAction}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
