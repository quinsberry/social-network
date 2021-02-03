import React, { useState } from 'react'
import classnames from 'classnames'

import './Paginator.scss'
import caretLeft from '@assets/icons/common/caret-left.svg'
import caretRight from '@assets/icons/common/caret-right.svg'

type Props = {
  totalItemsCount: number
  pageSize: number
  onPageChange: (pageNumber: number) => void
  currentPage: number
  portionSize?: number
}

export const Paginator: React.FC<Props> = ({ totalItemsCount, pageSize, onPageChange, currentPage, portionSize = 10 }) => {
  const [portionNumber, setPortionNumber] = useState(1)

  const pagesCount = Math.ceil(totalItemsCount / pageSize)
  let pages: Array<number> = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className="paginator">
      {portionNumber > 1 ? (
        <span
          className="paginator__btn left"
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}>
          <img src={caretLeft} alt="Caret left svg icon" />
        </span>
      ) : (
        <span className="paginator__btn invisible">
          <img src={caretLeft} alt="Caret left svg icon" />
        </span>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <span key={p} onClick={() => onPageChange(p)} className={classnames('select', { selected: p === currentPage })}>
              {p}
            </span>
          )
        })}

      {portionCount > portionNumber && (
        <span className="paginator__btn right" onClick={() => setPortionNumber(portionNumber + 1)}>
          <img src={caretRight} alt="Caret right svg icon" />
        </span>
      )}
    </div>
  )
}
