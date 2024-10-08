import React, { useState } from "react";
import "../styles/InquirySettings.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import apiClient from "./apiClient"; // POST 요청을 보내기 위해 필요한 API 클라이언트

const InquirySettings = () => {
  const maxLength = 300; // 최대 입력 가능한 문자 수
  const [story, setStory] = useState(""); // 입력된 이야기를 상태로 관리
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState(""); // 이메일 상태 관리
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

  // 이메일 입력 핸들러 함수
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // 문의사항 제출 핸들러 함수
  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken"); // 토큰 가져오기
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const requestBody = {
      receiver: email, // 입력된 이메일
      category: category, // 선택된 카테고리 (문자열로 변환)
      body: story, // 입력된 문의 내용
    };

    try {
      const response = await apiClient.post("/ask", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.isSuccess) {
        console.log("Inquiry sent successfully");
      } else {
        console.error("Error sending inquiry:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
    }
  };

  return (
    <div className="AccountWrapper">
      <div style={{ fontWeight: "700", fontSize: "20px" }}>문의 하기</div>
      <div className="ProfileSetting">
        이메일
        <div className="h3" style={{ fontSize: "14px" }}>
          문의에 대한 답변을 이메일로 보내드려요
        </div>
        <input
          className="DevEmail"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력하세요"
          style={{
            width: "500px",
            padding: "10px",
            marginTop: "10px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
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
            <MenuItem value={"서비스 이용이 불편해요"}>
              서비스 이용이 불편해요
            </MenuItem>
            <MenuItem value={"원하는 그림이 생성되지 않아요"}>
              원하는 그림이 생성되지 않아요
            </MenuItem>
            <MenuItem value={"속도가 너무 느려요"}>속도가 너무 느려요</MenuItem>
            <MenuItem value={"서비스 이용에 오류가 있어요"}>
              서비스 이용에 오류가 있어요
            </MenuItem>
            <MenuItem value={"기타"}>기타</MenuItem>
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
          marginTop: "40px",
          "& .MuiFilledInput-root": {
            backgroundColor: "#F7F7FA", // 기본 배경색 설정
            border: "none", // 테두리 제거
            "&:focus": {
              backgroundColor: "#FF903F", // 포커스 시 배경색 주황색으로 변경
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
      <div className="submitButton">
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#FF903F", // 오렌지 색상
            "&:hover": {
              backgroundColor: "#ff7b1d", // 호버 시 더 진한 오렌지 색상
            },
            width: "127px", // 버튼 크기 조정
            height: "44px", // 버튼 높이 조정
            marginTop: "20px", // 위쪽 마진 조정
            color: "#FFFFFF", // 텍스트 색상
            fontWeight: "bold", // 텍스트 굵게
            borderRadius: "8px", // 버튼의 둥근 모서리,
          }}
        >
          문의하기
        </Button>
      </div>
    </div>
  );
};

export default InquirySettings;
