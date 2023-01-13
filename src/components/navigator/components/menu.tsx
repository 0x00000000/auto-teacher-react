import React from 'react';

import {
    SECTIONS,
} from "../../../constants";

type Props = {
    onSelectSection: (event: any) => void;
}

class Menu extends React.Component<Props> {
    render() {
        return <div>
            <button
                onClick={(event) => this.props.onSelectSection(event)}
                value={SECTIONS.TRAINING}
            >Training</button>
            <button
                onClick={(event) => this.props.onSelectSection(event)}
                value={SECTIONS.SETTINGS}
            >Settings</button>
        </div>
    }
}

export default Menu;
