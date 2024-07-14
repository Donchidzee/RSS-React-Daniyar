import React from 'react';
import './SearchSection.css';

type SearchSectionProps = {
  searchValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function SearchSection(props: SearchSectionProps) {
  return (
    <div className="search-section__container">
      <input
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        value={props.searchValue}
        className="search-section__input"
        type="text"
        placeholder="Which book are you looking for?"
      />
      <button onClick={props.handleClick} className="search-section__button">
        Search
      </button>
    </div>
  );
}
