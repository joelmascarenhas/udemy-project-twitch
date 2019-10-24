import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2',() => {
            window.gapi.client.init({
                clientId:'16322371693-igbrmetlk46movl84ceqfjcarnnqhok6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                //this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                //we can also write it as this.onAuthChange() since the code is the same
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        //We dont need component level state since we are using Redux
        //this.setState({ isSignedIn: this.auth.isSignedIn.get() })

        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId()); //calls action creator
        } else {
            this.props.signOut(); //calls action creator
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        //if(this.state.isSignedIn === null){
        if(this.props.isSignedIn === null){
            return null;
        }
        //else if (this.state.isSignedIn){
        else if (this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        }
        else {
            return (
                <button className="ui green google button" onClick={this.onSignInClick}>
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            );
        }
    }

    render(){
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
};


export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);