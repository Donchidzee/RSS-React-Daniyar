import React from 'react';
import './SearchSection.css';

type SearchSectionProps = {
  searchValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default class SearchSection extends React.Component<SearchSectionProps> {
  render() {
    return (
      <div className="search-section__container">
        <input
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          value={this.props.searchValue}
          className="search-section__input"
          type="text"
          placeholder="Which book are you looking for?"
        />
        <button
          onClick={this.props.handleClick}
          className="search-section__button"
        >
          Search
        </button>
      </div>
    );
  }
}
