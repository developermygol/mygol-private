import React, { Component } from 'react';
import Loc from './Locale/Loc';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const defaultProps = {
    steps: [],
    nextButtonText: 'Next',
    nextButtonClassName: 'Button Active',
    backButtonText: 'Previous',
    backButtonClassName: 'Button',
    finalButtonText: 'Finish',
    finalButtonClassName: 'Button Active', 
    onFinalButtonClick: null
};

// const step = {
//     title: 'title',
//     component: null, 
//     validate: () => { return true; }
// }


@observer
class WizardStepsComponent extends Component {

    @observable currentIndex = 0;
    @observable error = null;

    previousHandler = () => {
        if (this.currentIndex > 0) this.currentIndex--;
    }

    nextHandler = () => {
        const { steps } = this.props;
        const current = steps[this.currentIndex];

        if (current.validate) {
            const validation = current.validate();
            if (validation !== true) {
                this.error = validation;
                return;
            }
        }

        this.error = null;
        if (this.currentIndex < this.props.steps.length - 1) 
            this.currentIndex++;
        else
            if (this.props.onFinalButtonClick) this.props.onFinalButtonClick();
    }

    render() {
        const p = this.props;
        if (this.currentIndex >= p.steps.length) return "Current index out of range";

        const current = p.steps[this.currentIndex];
        const isFirst = (this.currentIndex === 0);
        const isFinal = (this.currentIndex === p.steps.length - 1);

        return (
            <div className='Wizard'>
                <p className='Title'><Loc>{current.title}</Loc></p>
                
                <div className='Content'>
                    {current.component}
                </div>
                
                {this.error ? <small className='Error'>{this.error}</small> : null}
                
                <div className='Buttons'>
                    {isFirst ? null : <button className={p.backButtonClassName} onClick={this.previousHandler}><Loc>{p.backButtonText}</Loc></button>}
                    
                    {isFinal ? 
                        <button className={p.finalButtonClassName} onClick={this.nextHandler}><Loc>{p.finalButtonText}</Loc></button> 
                        :
                        <button className={p.nextButtonClassName} onClick={this.nextHandler}><Loc>{p.nextButtonText}</Loc></button>
                    }

                    {p.extraButtons || null}
                </div>
            </div>
        )
    }
}

WizardStepsComponent.defaultProps = defaultProps;

export default WizardStepsComponent;