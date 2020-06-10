import React, { Component, Fragment } from 'react';
import MessageBox from './MessageBox';
import Spinner from '../Spinner/Spinner';
import ErrorBox from '../ErrorBox';
import Loc, { Localize } from '../Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { toast } from 'react-toastify';


const defaultProps = {
    show: false,
    loading: false,
    onClose: null,
    title: 'props.title',
    text: 'props.text',
    error: null,
    itemRender: null,
    closeHandler: null,
    data: []
}

@observer
class SelectionDialog extends Component {

    @observable selected = null;

    submitHandler = (button) => {
        if (button === 'Cancel') {
            this.props.closeHandler(null);
            return;
        }
        
        if (!this.selected) {
            toast.warn(Localize('Must select an item'));
            return;
        }

        this.props.closeHandler({ referee: this.selected, role: this.role});
    }

    render() {
        const p = this.props;

        return (
            <MessageBox show={p.show} onClose={this.submitHandler} buttons='OkCancel'>
                <p className='ModalHead'><Loc>{p.title}</Loc></p>
                <p className='ModalText'><Loc>{p.text}</Loc></p>
                <Spinner loading={p.loading}>
                    {p.error ? 
                        <ErrorBox localizedMessage={p.error.message} detail={p.error.detail}/>
                        : 
                        p.data ? 
                            <Fragment>
                                <ul className='SelectionList'>
                                    {p.data.map(r => {
                                        const isSelected = (r === this.selected);

                                        return <li key={r.id} 
                                            className={'Sortable' + (isSelected ? ' Selected' : '')}
                                            onClick={() => this.selected = r}
                                        >
                                            {p.itemRender ? p.itemRender(r) : null }
                                        </li>
                                    })}
                                </ul>
                            </Fragment>
                            :
                            null
                    }
                </Spinner>
            </MessageBox>
        )
    }
}

SelectionDialog.defaultProps = defaultProps;

export default SelectionDialog;