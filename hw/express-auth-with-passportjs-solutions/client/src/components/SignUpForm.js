import React from 'react'
import { Redirect } from 'react-router-dom'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            showError: false
        }
    }

    handleSubmitForm = async (event) => {
        event.preventDefault()

        const { name, email, password } = this.state

        try {
            await this.props.signUp({ name, email, password })

        }
        catch (error) {
            this.setState(state => {
                return { showError: true }
            })
        }
    }

    handleTextInput = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {

        const { isSignedIn } = this.props
        const { showError } = this.state

        let errorMessage

        if (showError) {
            errorMessage = (
                <div className="errorMessage">
                    <span>This user exists, try new email</span>
                </div>
            )
        }

        if (isSignedIn) {
            return <Redirect to="/dashboard" />
        }

        return (
            <div>
                {errorMessage}
                <form className="form" onSubmit={this.handleSubmitForm}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={this.handleTextInput}
                            value={this.state.name}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleTextInput}
                            value={this.state.email}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleTextInput}
                            value={this.state.password}
                        />

                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }


}

export default SignUpForm