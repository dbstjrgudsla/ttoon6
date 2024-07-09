import React from "react";
import '../styles/FeedBundle.css';
const FeedBundle = () => {

    return(
        <div className="FeedBundleWrapper">
            <div className="h3">2024.06.29</div>
            <div className="FeedImage" style ={{color : 'black',fontSize :'20px'}}>이미지 넣을곳</div>
            <div className="Story">오늘 날씨가 좋아서 오랜만에 한강으로 놀러가서 산책을 했다. 휴학하고 동기들을 오랜만에 보니 참 좋았다 . 날 ...</div>
        </div>
    )
}

export default FeedBundle;