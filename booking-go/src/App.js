import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import './App.css';

import API from './api';


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
  const iada = suggestion.iata ? `(${suggestion.iata})` : '';
  const city_region = suggestion.city ? suggestion.city : suggestion.region;
  const suggestionText = `${suggestion.name} ${iada}`;
  return `${suggestionText}, ${city_region}, ${suggestion.country}`;
};

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion, {query}) => { 
  
  const iada = suggestion.iata ? `(${suggestion.iata})` : '';
  const suggestionText = `${suggestion.name} ${iada}`;
  const city_region = suggestion.city ? suggestion.city : suggestion.region;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <div className="suggestion-item">
      <div className="suggestion-badge">
        <div className={ 'badge badge-' + getSuggestionType(suggestion.bookingId) }>{getSuggestionType(suggestion.bookingId)}</div>
      </div>
      <div className="suggestion-text">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;
        
            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
        <br />
        <small>{city_region}, {suggestion.country}</small>
      </div>
    </div>
  );
};

const getSuggestionType = bookingId => {
  let name = bookingId.split('-')[0] === 'train' ? 'station' : bookingId.split('-')[0];
    return name;
};

const escapeRegexCharacters = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      search_term: '',
      max_results: 6,
      results: [],
      loading: false
    };

  }

  handleSubmit = ({ value }) => {

    const escapedValue = escapeRegexCharacters(value.trim());
  
    if (escapedValue === '') {
      return [];
    }

    const { search_term, max_results } = this.state;
    console.log(value, search_term);
    
    if(value.length <= 1){
      this.onSuggestionsClearRequested();
      return false;
    }

    this.setLoading(true);

    API.get(`FTSAutocomplete.do?solrIndex=fts_en&solrRows=${max_results}&solrTerm=${value}`)
      .then(res => {
        if(res.data.results.docs.length > 0){
          this.setResults(res.data.results.docs);
        }
        console.log(res.data.results);
        this.setLoading(false);
      })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      search_term: newValue
    });
  };

  setLoading = loading => {
    this.setState({
      loading
    });
  }

  setResults = results => {
    this.setState({
      results
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      results: []
    });
  };


  render() {

    const { search_term, results, loading } = this.state;

    const inputProps = {
      placeholder: 'city, airport, station, region, district...',
      autoComplete: 'off',
      id: 'search_term',
      name: 'search_term',
      value: search_term,
      onChange: this.onChange
    };

    return (
      <div className="App">
        <header className="App-header">
          <div className="form">
            <form>
              <h2 className="title">Let’s find your ideal car {loading}</h2>
              <label htmlFor="search_term" title="Pick Up Location">Pick-up Location</label>
              <Autosuggest
                suggestions={search_term.length > 1 ? results : []}
                onSuggestionsFetchRequested={this.handleSubmit}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
