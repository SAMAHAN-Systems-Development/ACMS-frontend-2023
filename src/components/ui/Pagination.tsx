import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
    if(isNaN(Number(event.target.value))){
      toast.error('Page number must be a number');
      return;
    }

    if(Number(event.target.value) < 0){
      toast.error('Page number cannot be negative');
    }

    if(Number(event.target.value) > maxPage){
      toast.error('Page number cannot be greater than ' + maxPage);
    }

    setPageTemp(Number(event.target.value));
  };

  const inputEnterAction = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(pageTemp < 1){
        setPage(1);
        setPageTemp(1);
        toast.error('Invalid input');
        return;
      }
      if(pageTemp > maxPage){
        setPage(maxPage);
        setPageTemp(maxPage);
        toast.error('Invalid input');
        return;
      }
      setPage(pageTemp);
    }
  }

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
          color: '#724700',
          opacity: isPreviousDisabled ? 0.5 : 1,
          cursor: isPreviousDisabled ? 'default' : 'pointer',
        }}
        onClick={isPreviousDisabled ? () => {} : previousClickAction}
        role="button"
        onKeyUp={() => {}}
        tabIndex={0}
      />
      Page
      <input
        className="w-10 border-2 border-blue h-8 text-center rounded text-md text-navyBlue font-bold"
        type="text"
        onChange={inputChangeAction}
        onBlur={inputBlurAction}
        onKeyDown={(event) => {inputEnterAction(event)}}
        value={pageTemp}
      />
      of
      <span
        className="text-center rounded text-lg text-navyBlue font-bold"
      >
        {maxPage}
      </span>
      <span
        className="icon-[material-symbols--keyboard-arrow-right]"
        style={{
          width: '48px',
          height: '48px',
          color: '#724700',
          opacity: isNextDisabled ? 0.5 : 1,
          cursor: isNextDisabled ? 'default' : 'pointer',
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
