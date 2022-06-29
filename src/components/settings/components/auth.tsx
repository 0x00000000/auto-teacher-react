import React from 'react';

type Props = {
    onAuthPasswordChange: (event: any) => void;
    onAuthPasswordCheck: () => void;
};

class Auth extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <>
            <p>Enter parent's password:</p>
            <input
                type='password'
                onChange={(event: any) => this.props.onAuthPasswordChange(event)}
            />
            <button
                onClick={() => this.props.onAuthPasswordCheck()}
            >Enter</button>
        </>;
    }
}

export default Auth;
