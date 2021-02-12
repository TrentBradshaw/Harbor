import React, { useState } from 'react';
import Autocomplete from './Autocomplete';

export default function AutoCompleteDockLookup() {
    const [arrayOf7] = useState([]);
    const [loaded] = useState();
    return (
        <div className="App">
            <Autocomplete loaded={loaded} options={arrayOf7} />
        </div>
    );
}
