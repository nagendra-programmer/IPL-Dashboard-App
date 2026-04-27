// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesDetails()
  }

  getTeamMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,

      latestMatchDetails: {
        id: data.latest_match_details.id,
        umpires: data.latest_match_details.umpires,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        result: data.latest_match_details.result,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
      },

      recentMatches: data.recent_matches.map(eachMatch => ({
        id: eachMatch.id,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        matchStatus: eachMatch.match_status,
        result: eachMatch.result,
      })),
    }
    const {teamBannerUrl, latestMatchDetails, recentMatches} = updatedData

    this.setState({
      teamBannerUrl: teamBannerUrl,
      latestMatchDetails: latestMatchDetails,
      recentMatches: recentMatches,
      isLoading: false,
    })
  }

  renderTeamMatches = () => {
    const {teamBannerUrl, latestMatchDetails, recentMatches} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div>
        <img src={teamBannerUrl} alt="team banner" />
        <h1>Latest Matches</h1>
        <LatestMatch
          key={latestMatchDetails.id}
          latestMatchDetails={latestMatchDetails}
        />
        <div className="recent-matches-container">
          <ul>
            {recentMatches.map(eachItem => (
              <MatchCard key={eachItem.id} matchCardDetails={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="bg-contianer">
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}
export default TeamMatches
