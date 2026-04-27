// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {id, team, teamImageUrl} = teamCardDetails

  return (
    <li>
      <Link to={`/team-matches/${id}`}>
        <div>
          <img src={teamImageUrl} alt={team} />
          <p>{team}</p>
        </div>
      </Link>
    </li>
  )
}
export default TeamCard
