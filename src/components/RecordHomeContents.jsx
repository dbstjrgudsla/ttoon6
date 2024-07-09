import React from "react";
import '../styles/RecordHomeContents.css'
import FeedBundle from "./FeedBundle";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";

const HomeContents = () =>{
    
    const [currentTab, setCurrentTab] = useState(0);


    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return(
        <div className="ContentsWrapper">
        <div className="h1">님의 기록들 모아보기</div>
            <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
                '& .MuiTab-root': {
                    color: '#a9abbb', // 기본 글씨 색상
                    fontSize: '18px', // 글씨 크기
                    fontWeight :'400' ,
                        marginLeft: '10px' // 각 탭의 좌우 여백
                },
                '& .Mui-selected': {
                    color: '#000000', // 선택된 탭 글씨 색상
                    fontWeight :'700'
                },
                '& .MuiTabs-indicator': {
                    backgroundColor: '#000000', // 탭 아래 인디케이터 색상
                },
                marginBottom: '40px', // 여기에 margin-bottom 값 추가
                marginTop : '20px'
                }}
            >
                <Tab label= "캘린더" />
                <Tab label="피드" />
            </Tabs>
            <div className="Feed" style={{ display: currentTab === 1 ? '' : 'none' }}>
                <FeedBundle />
                <FeedBundle />
                <FeedBundle />
                <FeedBundle />
                <FeedBundle />
                <FeedBundle />
            </div>
        </div>
    )

}

export default HomeContents;