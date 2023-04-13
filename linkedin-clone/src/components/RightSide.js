import React from 'react'
import './CSS/RightSide.css'
function RightSide() {
  return (
    <div className='Container_right'>
      <div className='FollowCard_right'>
        <div className='Title'>
          <h2>Add to your feed</h2>
          <img src="/images/feed-icon.svg" alt="" />
        </div>

        <div className='FeedList_right'>
          <li>
            <a>
              <div className='Avatar' />
            </a>
            <div>
              <span>#Linkedin</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <div className='Avatar' />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </div>

        <div className='Recommendation_right'>
          View all recommendations
          <img src="/images/right-icon.svg" alt="" />
        </div>
      </div>
      <div className='BannerCard_right'>
        <img
          src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
          alt=""
        />
      </div>
    </div>
  )
}

export default RightSide


