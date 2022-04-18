import React from 'react';

import {TASK_TYPES} from '../../../constants';

type Props = {
    onTypeSelect: (event: any) => void,
};

class Menu extends React.Component<Props> {
    render() {
        return <>
            <button
                value={TASK_TYPES.ADDICTION}
                onClick={(event: any) => this.props.onTypeSelect(event)}
            >A + B</button>
            <button
                value={TASK_TYPES.ADDICTION_REVERSED}
                onClick={(event: any) => this.props.onTypeSelect(event)}
            >A + ?</button>
            <button
                value={TASK_TYPES.SUBTRACTION}
                onClick={(event: any) => this.props.onTypeSelect(event)}
            >A - B</button>
            <button
                value={TASK_TYPES.SUBTRACTION_REVERSED}
                onClick={(event: any) => this.props.onTypeSelect(event)}
            >A - ?</button>
            <button
                value={TASK_TYPES.COMPARISON}
                onClick={(event: any) => this.props.onTypeSelect(event)}
            >AAA = BBB</button>
            <button
                value={TASK_TYPES.READING}
                onClick={(event: any) => this.props.onTypeSelect(event)}
            >Reading</button>
        </>;
    }
}

export default Menu;
