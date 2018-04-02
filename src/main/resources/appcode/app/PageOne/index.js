import React from 'react';
import TextField from 'material-ui/TextField';
import { printDetails } from "../../actions/actions"
import { connect } from 'react-redux';


export class PageOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props;
        this.updateServerName = this.updateServerName.bind(this)
        this.updateUserName = this.updateUserName.bind(this)
        this.getChildState = this.getChildState.bind(this)
        this.updateDBName=this.updateDBName.bind(this)


    }

    getChildState() {
        return this.state;
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    updateServerName(e) {
        this.setState({
            serverName: e.target.value
        });
    }
    updateUserName(e) {
        this.setState({
            userName: e.target.value
        });
    }

    updateDBName(e) {
        this.setState({
            dataBaseName: e.target.value
        });
    }

    render() {

        return (
            <form>
                <label>Enter Server Name:</label>
                <TextField
                    hintText="enter here .."
                    required onChange={this.updateServerName} ref="serverName"
                /><br />
                <label >Db name :</label>
                <TextField
                    hintText="enter here :"
                    required ref="dbname" onChange={this.updateDBName}
                /><br />
                <label >User Name :</label>
                <TextField
                    hintText="enter here :"
                    required ref="userName" onChange={this.updateUserName}
                /><br />
            </form>


        );
    }


}
function mapStateToProps(state) {
    return {
        dispatcher: state.todo
    }
}
export default connect(mapStateToProps)(PageOne)