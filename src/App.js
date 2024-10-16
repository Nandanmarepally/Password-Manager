import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
    state = {
        isTrue: false,
        latestList: [],
        website: '',
        userName: '',
        password: '',
        isShow: false,
    }

    listenWebsite = event => {
        this.setState({website: event.target.value})
    }

    listenUserName = event => {
        this.setState({username: event.target.value})
    }
    listenPassword = event => {
        this.setState({password: event.target.value})
    }

    addContent = event => {
        event.preventDefault()
        const {username,website,password}=this.state 
        const initial = website.slice(0,1).toUpperCase()
        const classValue = colorList[Math.floor(Math.random() * 5)]
        const newValues = {
            id: uuidv4(),
            intialValue: initial,
            websiteName: website,
            userName: username,
            Password: password,
            classAdd: classValue,
        }
        this.setState(prevState => ({
            latestList: [...prevState.latestList,newValues],
            website: '',
            username: '',
            password: '',
            isTrue: true,
            searchInput: '',
        }))
    }

    showPassword = event => {
        if(event.target.checked){
            this.setState({isShow: true})
        }
        else{
            this.setState({isShow: false})
        }
    }

    searchList = event => {
        this.setState({searchInput: event.target.value})
    }


    deleteItem = id =>  {
        const {latestList} = this.state 
        const newList = latestList.filter(eachValue => eachValue.id !== id)
        const caseOf = newList.length !== 0 
        this.setState({latestList: newList, isTrue: caseOf})
    }

    render(){
        const {
            website,
            username,
            password,
            latestList,
            isShow,
            searchInput,
        } = this.state 
        let {isTrue} = this.state 
        const newList = latestList.filter(eachValue => 
        eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
        )
        if (newList.length === 0){
            isTrue = false 
        } else {
            isTrue = true 
        }
        return (
            <div className="main-container">
            <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" 
            className="app-logo"
            alt="app logo"
            />
            <div className="sub-div">
            <img 
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="sub-div1-image2"
            alt="password manager"
             />
             <form className="add-details" onSubmit={this.addContent}>
             <h1 className="detail-heading">Add New Password</h1>
             <div className="input-holder">
             <img src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
             className="input-image"
             alt="website" />
             <input
             type="text"
             className="input-element"
             placeholder="Enter Website"
             onChange={this.listenWebsite}
             value={website} 
             />
             </div>
             <div className="input-holder">
             <img 
             src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
             className="input-image"
             alt="username"
             />
             <input type="text"
             className="input-element"
             placeholder="Enter Username"
             onChange={this.listenUsername}
             value={username} 
             />
             </div>
              <div className="input-holder">
             <img 
             src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
             className="input-image"
             alt="password"
             />
             <input type="text"
             className="input-element"
             placeholder="Enter Password"
             onChange={this.listenPassword}
             value={password} 
             />
             </div> 
             <button type="submit" className="add-btn">Add</button>
             <form/>
             <img src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
             className="sub-div1-image1"
             alt="password manager"
             />
            </div>
            <div className="sub-div2">
            <div className='first-div'>
            <div className="your-password">
            <h1 className="heading-name">Your Passwords</h1>
            <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-holder">
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            className="input-image"
            alt="search" 
            />
            <input
            type="search"
            className="input-element"
            placeholder="Search"
            onChange={this.searchList}
            value={searchInput} 
            />
            </div>
            </div>
            <hr />
            <div className="show-passwords">
            <input 
            type="checkbox"
            className="check-box"
            id="check"
            onChange={this.showPassword} />
            <label htmlFor="check" className="label-password">Show Passwords</label>
            </div>
            {!isTrue && (
                <div className="empty-state">
                <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords" />
                <p className="no-passwords">No Passwords</p>
                </div>
            )}
            {isTrue && (
                <ul className="result-container">
                {newList.map(eachValue => (
                    <li className="item-list" id={eachValue.id} key={eachValue.id}>
                    <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                    </p>
                    <div className="list-content">
                    <p className="website">{eachValue.websiteName}</p>
                    <p className="website">{eachValue.userName}</p>
                    {!isShow && (
                        <img 
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars" 
                        />
                    )}
                    {isShow && <p className="website">{eachValue.Password}</p>
                    </div>
                    <button 
                    className="del-btn"
                    type="button"
                    data-testid="delete"
                    onClick= {() => this.deleteItem(eachValue.id)}
                    >
                    <img 
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    className="del-image"
                    alt="delete"
                    />
                    </button>
                    </li>
                ))}
                </ul>
            )}
            </div>
            </div>
        )
    }
}
export default App
