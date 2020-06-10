import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import Loc, { Localize } from '../Locale/Loc';
import Spinner from '../Spinner/Spinner';
import ErrorBox from '../ErrorBox';
import MessageBox from './MessageBox';


const defaultProps = {
    show: false,
    loading: false,
    onClose: null,
    title: 'props.title',
    text: 'props.text',
    error: null
}

@observer
class BaseSelectionDialog extends Component {

    @observable selected = null;

    clickHandler = (button) => {
        if (!button || button === 'Cancel') {
            this.props.onClose(null);
            return;
        }
        
        if (!this.selected) {
            toast.warn(Localize('Must select an item'));
            return;
        }

        this.props.onClose({ referee: this.selected, role: this.role });
    }

    render() {
        const p = this.props;

        return (
            <MessageBox show={p.show} onClose={this.clickHandler} buttons='OkCancel'>
                <p className='ModalHead'><Loc>{p.title}</Loc></p>
                <p className=''><Loc>{p.text}</Loc></p>
                <Spinner loading={p.loading}>
                    {p.error ? 
                        <ErrorBox localizedMessage={p.error.message} detail={p.error.detail}/>
                        : 
                        p.children
                    }
                </Spinner>
            </MessageBox>
        )
    }
}

BaseSelectionDialog.defaultProps = defaultProps;

export default BaseSelectionDialog;