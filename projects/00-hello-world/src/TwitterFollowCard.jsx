//useState is a Hook. useState allows change the sate of the view and rerenders components
import { useState } from "react";
//REMEMBER. React components are JavaScript functions expressed in PascalCase
//TwitterFollowCard is a component
//Props are not mutables
//Children is a special prop
export function TwitterFollowCard({ children, userName, initialIsFollowng}){
    const [isFollowing, setIsFollowing] = useState(initialIsFollowng)

    const handeClick = () => {
        setIsFollowing(!isFollowing)
    }
    const text = isFollowing ? 'Following' : 'Follow';
    const buttonClassName = isFollowing
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button'

    return(
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img
                    className="tw-followCard-avatar" 
                    alt="My avatar" 
                    src={`https://unavatar.io/twitter/${userName}`}/>
                <div className="tw-followCard-info">
                    <strong>{children}</strong>
                    <span className="tw-followCard-infoUserName">@{userName}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick = {handeClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className='tw-followCard-stopFollow'>Unfollow</span>
                </button>
            </aside>
        </article>
    )
}