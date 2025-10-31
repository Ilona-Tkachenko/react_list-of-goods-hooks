import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Default = '',
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);
  const visibleGoods = [...goodsFromServer];

  if (sortType !== SortType.Default) {
    visibleGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        case SortType.ByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => {
            setSortType((prev: SortType) =>
              prev === SortType.Alphabetically
                ? SortType.Default
                : SortType.Alphabetically,
            );
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => {
            setSortType((prev: SortType) =>
              prev === SortType.ByLength ? SortType.Default : SortType.ByLength,
            );
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
