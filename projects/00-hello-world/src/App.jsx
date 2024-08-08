import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
        userName: 'darcdotexe',
        name: 'Daniel Ramos',
        isFollowing: false
    },
    {
        userName: 'reactjs',
        name: 'React',
        isFollowing: true
    },
    {
        userName: 'jwulen',
        name: 'JWulen',
        isFollowing: false
    },
    {
        userName: 'rubiu5',
        name: 'Rubius Z',
        isFollowing: true
    },
]

export function App(){
    return(
        //React.Fragment could be written as empty tags
        //isFollowing is a boolean prop
        //format is a function. JS functions can be passed as props
        <section className = "App">
            {
                users.map(({userName, name, isFollowing}) =>(
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        initialIsFollowng={isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}