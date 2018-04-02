import React from 'react';
import {
    Step,
    Stepper,
    StepButton,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PageOne from "../PageOne";
import PageTwo from "../PageTwo";
import PageThree from "../PageThree";
import { connect } from 'react-redux';
import { printDetails, PRINT_CURRNT_DATA } from "../../actions/actions"
import RefreshIndicator from 'material-ui/RefreshIndicator';


export class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            serverName: "",
            userName: "",
            portNumber: 0,
            password: "",
            dataBaseName: "",
            statusBar: "hide"
        }
        this.handleNext = this.handleNext.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.postDataToServer = this.postDataToServer.bind(this);

    }
    handleNext() {
        const input = this.props;
        if (this.childOne != undefined) {
            let pageOneObj = this.childOne.getChildState();            
            this.setState({ serverName: pageOneObj.serverName });
            this.setState({ userName: pageOneObj.userName });
            this.setState({ dataBaseName: pageOneObj.dataBaseName });
            input.dispatch(printDetails(this.state));            
        }
        if (this.childTwo != undefined) {
            let pageTwoObj = this.childTwo.getChildState();
            this.setState({ portNumber: pageTwoObj.portNumber });
            this.setState({ password: pageTwoObj.password });
            input.dispatch(printDetails(this.state));            
        }

        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
        if (stepIndex === 2) {
            this.state.statusBar = "loading";
            this.postDataToServer();

        } else {
            this.state.statusBar = "hide";
        }
    };
    postDataToServer() {
        let headers = {
            'Content-Type': 'application/json'
        };
        let credentials = {
            'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
        fetch("/postMappingData.do", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(this.state)
        }).then(resposemap => {
            this.state.statusBar = "hide";                        
        });
    }
    handlePrev() {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const { finished, stepIndex } = this.state;
        const style = {
            container: {
                position: 'relative',
            },
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
        };

        return (
            <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Step 1 -3</StepLabel>
                        <StepContent>
                            <p>
                                Enter the below given inputs to finish test connection
                  </p>
                            <PageOne ref="childOne" {...this.state} onRef={ref => (this.childOne = ref)} />
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Step 2 -3</StepLabel>
                        <StepContent>
                            <p>Enter the below given inputs to finish test connection</p>
                            <PageTwo ref="childTwo" {...this.state} onRef={ref => (this.childTwo = ref)} />
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                        <StepContent>
                            <p>Enter the below given inputs to finish test connection</p>
                            <PageThree />
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
                {finished && (
                    <p style={{ margin: '20px 0', textAlign: 'center' }}>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({ stepIndex: 0, finished: false });
                            }}
                        >
                            Click here
                </a> to reset the example.
              </p>
                )}
                <RefreshIndicator
                    size={100}
                    left={70}
                    top={0}
                    loadingColor="#FF9800"
                    status={this.state.statusBar}
                    style={style.refresh}
                />
            </div>
        );
    }

}
function mapStateToProps(state) {
    return {
        dispatcher: state.todo
    }
}
export default connect(mapStateToProps)(HomeComponent);



