import React, {
    Component,
} from 'react';
import {
    View
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, {positions, durations} from './ToastContainer';

class Toast extends Component {
    static displayName = 'Toast';
    static propTypes = ToastContainer.propTypes;
    static positions = positions;
    static durations = durations;

    static show = (message, options = {position: positions.BOTTOM, duration: durations.SHORT}) => {
        let toast = new RootSiblings(<ToastContainer
            {...options}
            visible={true}
        >
            {message}
        </ToastContainer>);
        let _hideTimeout = setTimeout(() => {
            Toast.hide(toast);
            clearTimeout(_hideTimeout);
            console.log('Toast auto hide');
        }, options.duration);

        return toast;
    };

    static hide = toast => {
        if (toast instanceof RootSiblings) {
            toast.update(
                <ToastContainer
                    visible={false}>
                </ToastContainer>
            );

            toast.destroy();
        } else {
            console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
        }
    };

    _toast = null;

    componentWillMount = () => {
        this._toast = new RootSiblings(<ToastContainer
            {...this.props}
            duration={0}
        />);
    };

    componentWillReceiveProps = nextProps => {
        this._toast.update(<ToastContainer
            {...nextProps}
            duration={0}
        />);
    };

    componentWillUnmount = () => {
        this._toast.destroy();
    };

    render() {
        return null;
    }
}

export {
    RootSiblings as Manager
};
export default Toast;
