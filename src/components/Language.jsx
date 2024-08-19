import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "../styles/Language.css";

const Language = () => {
  const [value, setValue] = React.useState("english");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className="AccountWrapper">
        <div style={{ fontWeight: "700", fontSize: "20px" }}>언어 설정</div>
        <div className="ProfileSetting">서비스 언어 설정</div>
        <div className="selectLanguage">
          <div className="h3">언어를 선택해주세요</div>
          <FormControl sx={{ marginLeft: "90px", color: "525463" }}>
            <RadioGroup
              aria-labelledby="controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="english"
                control={
                  <Radio
                    sx={{
                      color: "#CDCED6", // 기본 색상
                      "&.Mui-checked": {
                        color: "#FF903F", // 선택된 상태의 색상
                      },
                    }}
                  />
                }
                label="영어"
              />
              <FormControlLabel
                value="korean"
                control={
                  <Radio
                    sx={{
                      color: "#CDCED6", // 기본 색상
                      "&.Mui-checked": {
                        color: "#FF903F", // 선택된 상태의 색상
                      },
                    }}
                  />
                }
                label="한국어"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="Line" style={{ marginTop: "100px" }}></div>
      </div>
    </>
  );
};

export default Language;
