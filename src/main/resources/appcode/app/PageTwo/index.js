import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

export  class PageTwo extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        this.updatePortNumber = this.updatePortNumber.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.getChildState = this.getChildState.bind(this)
    }
    getChildState() {
        return this.state;
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    updatePortNumber(e) {
        this.setState({
            portNumber: e.target.value
        });
    }
    updatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }


    render() {
        return (<form>
            <label>Enter  Password :</label>
            <TextField type="Password"
                hintText="enter password here  .."
                required onChange={this.updatePassword}
            /><br />
            <label >Enter Port Number :</label>
            <TextField
                hintText="enter port number :"
                required onChange={this.updatePortNumber}
            /><br />
        </form>);

    }

}
function mapStateToProps(state) {
    return {
        dispatcher: state.todo
    }
}
export default connect(mapStateToProps)(PageTwo)