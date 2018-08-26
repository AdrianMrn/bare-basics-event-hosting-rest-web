import React, { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import Store from '../../../Store';

class Autocomplete extends Component {
    handleSelect = address => {
        // Change it in the store immediately
        this.handleChange(address);

        // Get the coordinates and set these in the store as well
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => { this.setAddress(latLng, address) })
            .catch(error => { });
    };

    setAddress = (latLng, address) => {
        let store = this.props.store;
        let eventEdit = store.get('eventEdit');

        store.set('eventEdit')({
            ...eventEdit,
            address,
            coords_lon: latLng.lng,
            coords_lat: latLng.lat
        });
    }

    handleChange = address => {
        let eventEdit = this.props.store.get('eventEdit');
        this.props.store.set('eventEdit')({
            ...eventEdit,
            address,
            coords_lon: 0,
            coords_lat: 0
        });
    };

    render() {
        let eventEdit = this.props.store.get('eventEdit');
        const address = eventEdit.address;
        return (
            <PlacesAutocomplete
                value={address || ''}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Location (address)',
                                className: 'form-control',
                            }) }
                            disabled={this.props.disabled}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { className }) }>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default Store.withStore(Autocomplete);
