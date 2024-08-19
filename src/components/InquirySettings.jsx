import React, { useState } from "react";
import "../styles/InquirySettings.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const InquirySettings = () => {
  const maxLength = 300; // 최대 입력 가능한 문자 수
  const [story, setStory] = useState(""); // 입력된 이야기를 상태로 관리
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false); // 에러 상태를 관리

  // 선택값 변경 핸들러 함수
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // 텍스트 변경 핸들러 함수
  const handleStoryChange = (event) => {
    const text = event.target.value;
    if (text.length > maxLength) {
      setError(true); // 글자 수 초과 시 에러 표시
    } else {
      setError(false); // 글자 수 이내 시 에러 해제
    }
    setStory(text); // 상태 업데이트
  };

  return (
    <div className="AccountWrapper">
      <div style={{ fontWeight: "700", fontSize: "20px" }}>문의 하기</div>
      <div className="ProfileSetting">
        이메일
        <div className="h3" style={{ fontSize: "14px" }}>
          문의에 대한 답변을 이메일로 보내드려요
        </div>
        <div className="DevEmail">ttoon@gmail.com</div>
        <div className="Line"></div>
      </div>
      <div className="ProfileSetting">문의 하기</div>

      <div className="SelectInquiry">
        <FormControl sx={{ width: "500px", marginTop: "20px" }}>
          <InputLabel id="demo-simple-select-label">
            문의 카테고리를 선택해주세요
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            onChange={handleChange}
            sx={{
              "& .MuiSelect-root": {
                border: "none", // 테두리 제거
              },
              "& .MuiSelect-select": {
                padding: "10px", // 패딩 조정
              },
              "& .MuiSelect-icon": {
                color: "#2B2D36", // 아이콘 색상
              },
            }}
          >
            <MenuItem value={1}>서비스 이용이 불편해요</MenuItem>
            <MenuItem value={2}>원하는 그림이 생성되지 않아요</MenuItem>
            <MenuItem value={3}>속도가 너무 느려요</MenuItem>
            <MenuItem value={4}>서비스 이용에 오류가 있어요</MenuItem>
            <MenuItem value={5}>기타</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TextField
        className="InquiryDetail"
        error={error}
        id="filled-error-helper-text"
        label="어떤 내용이 궁금하신가요?"
        value={story}
        onChange={handleStoryChange}
        helperText={
          error
            ? `글자 수를 초과하였습니다. (최대 ${maxLength}자)`
            : `${story.length}/${maxLength}자`
        }
        variant="filled"
        multiline
        rows={5}
        sx={{
          width: "500px",
          marginTop: "40px", // 수정: 잘못된 속성명 수정
          "& .MuiFilledInput-root": {
            backgroundColor: "#F7F7FA", // 기본 배경색 설정
            border: "none", // 테두리 제거
            "&:focus": {
              backgroundColor: "#FFBF00", // 포커스 시 배경색 주황색으로 변경
            },
          },
          "& .MuiInputBase-root": {
            color: "#2B2D36", // 텍스트 색상
          },
          "& .MuiInputBase-input": {
            padding: "10px", // 텍스트 필드 패딩
          },
          "& .MuiFormHelperText-root": {
            color: "#A9ABBB", // 헬퍼 텍스트 색상
          },
        }}
      />
    </div>
  );
};

export default InquirySettings;
