// Write your code here
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const url = 'https://apis.ccbp.in/ipl'
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.teams.map(each => ({
      id: each.id,
      team: each.name,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({teamsList: updatedData, isLoading: false})
  }

  renderTeams = () => {
    const {teamsList} = this.state

    return (
      <div className="home-card">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        <ul>
          {teamsList.map(eachItem => (
            <TeamCard key={eachItem.id} teamCardDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return isLoading ? (
      <div testid="loader">
        <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
      </div>
    ) : (
      this.renderTeams()
    )
  }
}
export default Home
