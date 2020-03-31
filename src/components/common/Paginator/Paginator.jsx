import React from 'react';
import classnames from 'classnames';

import './Paginator.scss';

const Paginator = ({ onPageChange, currentPage }) => {

  let pagesDisplay = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];

  return (
    <div className="paginator">
      {pagesDisplay.map((p, index) => {
        if (p > 0) {
          return (
            <span onClick={() => onPageChange(p)} key={index} className={classnames('select', { selected: currentPage === p })}>{p}</span>
          );
        } else {
          return undefined;
        }
      })}
    </div>
  );
};

export default Paginator;