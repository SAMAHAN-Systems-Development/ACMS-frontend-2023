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
      setPageTemp(maxPage);
      return;
    }

    if (Number(event.target.value) < 1) {
      setPage(1);
      setPageTemp(1);
      return;
    }

    setPage(Number(event.target.value));
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <span
        className="icon-[material-symbols--keyboard-arrow-left]"
        style={{
          width: '48px',
          height: '48px',
          color: '#181842',
          opacity: isPreviousDisabled ? 0.5 : 1,
        }}
        onClick={isPreviousDisabled ? () => {} : previousClickAction}
        role="button"
        onKeyUp={() => {}}
        tabIndex={0}
      />
      <input
        className="w-10 border-2 border-blue h-8 text-center rounded text-md text-navyBlue font-bold"
        type="text"
        onChange={inputChangeAction}
        onBlur={inputBlurAction}
        value={pageTemp}
      />
      <span
        className="icon-[material-symbols--keyboard-arrow-right]"
        style={{
          width: '48px',
          height: '48px',
          color: '#181842',
          opacity: isNextDisabled ? 0.5 : 1,
        }}
        onClick={isNextDisabled ? () => {} : nextClickAction}
        role="button"
        onKeyUp={() => {}}
        tabIndex={0}
      />
    </div>
  );
};

export default Pagination;
