import React, { useEffect, useState } from 'react';
// import './Main.css';
import './CSS/Main.css'
import PostModal from './PostModal';
import { getArticleAPI } from '../actions';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

function Main(props) {
  const [showmodal, setShowModal] = useState("close");
  useEffect(() => {
    props.getArticleAPI();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target != e.currentTarget) {
      return;
    }
    switch (showmodal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
    }
  };
  return (
    <>
      {
        props.articles.length === 0 ? (
          <p>There are no articles</p>
        ) : (
          <div className='Container_Main'>
            <div className='ShareBox_Main'>
              <div>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="./images/user.svg" alt="" />
                )}
                <button onClick={handleClick}
                  disabled={props.loading ? true : false} >
                  Start a Post
                </button>
              </div>

              <div>
                <button >
                  <img src="./images/photos.svg" alt="" />
                  <span>Photo</span>
                </button>

                <button>
                  <img src="./images/video.svg" alt="" />
                  <span>Video</span>
                </button>

                <button>
                  <img src="./images/event.svg" alt="" />
                  <span>Event</span>
                </button>

                <button>
                  <img src="./images/article.svg" alt="" />
                  <span>Article</span> {/* Updated text for LinkedIn button */}
                </button>
              </div>
            </div>

            {/* Load Spinner */}
            <div className="Content_Main_info">
              <div className="spinImg">
                {
                  props.loading && <img src={'/images/Spin.svg'} alt="" />
                }
              </div>


              {props.articles.length > 0 &&
                props.articles.map((articles, key) => (

                  <div className='Article' key={key}>
                    <div className="sharedActor">
                      <a>
                        <img src={articles.actor.image} alt="" />
                        <div>
                          <span>{articles.actor.title}</span>
                          <span>{articles.actor.description}</span>
                          <span>{articles.actor.date.toDate().toLocaleDateString()}</span>
                        </div>
                        <button>
                          <img src="./images/ellipsis.svg" alt="" />
                        </button>
                      </a>
                    </div>
                    <div className='Description'>
                      {articles.description}
                    </div>
                    <div className="ShareImg">
                      <a>
                        {!articles.shareImg && articles.video ? (
                            <ReactPlayer width={"100%"} url={articles.video} />
                          ) : (
                            articles.shareImg && <img src={articles.shareImg} />
                          )
                        }
                      </a>
                    </div>
                    <div className="SocialCount">
                      <li>
                        <button>
                          <img src="https://starpng.com/public/uploads/preview/facebook-like-button-png-image-11574818875msv5cxnljx.png" alt="" style={{ width: '20px' }} />
                          <img src="https://cdn.shopify.com/s/files/1/1061/1924/products/Clapping_Hands_Emoji_ios10_d7ab242e-7230-47bf-b1e2-d46a4bc51b5b_grande.png?v=1571606090" alt="" style={{ width: '20px' }} />
                          <span>75</span>
                        </button>
                      </li>

                      <li>
                        <a>{articles.comments}</a>
                      </li>
                    </div>

                    <div className='SocialActor'>
                      <button>
                        <img src="https://starpng.com/public/uploads/preview/facebook-like-button-png-image-11574818875msv5cxnljx.png" alt="" style={{ width: '20px' }} />
                        <span>Like</span>
                      </button>

                      <button>
                        <img src="https://cdn-icons-png.flaticon.com/512/5338/5338282.png" alt="" style={{ width: '20px' }} />
                        <span>Comments</span>
                      </button>
                      <button>

                        <img src="https://static-00.iconduck.com/assets.00/share-icon-512x478-pbc2yd90.png" alt="" style={{ width: '20px' }} />
                        <span>Share</span>
                      </button>
                      <button>

                        <img src="https://www.iconpacks.net/icons/2/free-send-icon-4008-thumb.png" alt="" style={{ width: '20px' }} />
                        <span>Send</span>
                      </button>
                    </div>

                  </div>
                ))
              }
            </div>
            <PostModal showmodal={showmodal} handleClick={handleClick} />

          </div>)
      }
    </>

  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticleAPI: () => dispatch(getArticleAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
