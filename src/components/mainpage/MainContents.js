import React, { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import {
  ContentBody,
  ContentData,
  ContentHeader,
  ContentMoreView,
  ContentNameTitle,
  ContentSlide,
  ContentSlideImage,
  HashTag,
  HashTagBt,
  MainPageContent,
  WriteingDate,
} from "../../styles/diarystyles/mainpage/maincontentstyle";

const MainContents = ({ data }) => {
  const swiperRef = useRef();
  const navigate = useNavigate();
  // 데이터 emoji 값에 따라 이모지(기분) 그림 출력
  const EmojiFuc = emoji => {
    let result;
    if (emoji == 0) {
      result = "images/joy.jpeg";
    } else if (emoji == 1) {
      result = "images/sadness.jpeg";
    } else if (emoji == 2) {
      result = "images/angry.jpeg";
    } else if (emoji == 3) {
      result = "images/surprise.jpeg";
    } else if (emoji == 4) {
      result = "images/love.jpeg";
    } else {
      console.log("not-found-emoji");
    }
    return result;
  };
  const filteredDay = result => {
    let fDay = result.split("-")[2].split(" ")[0];
    return fDay.startsWith("0") ? fDay.slice(2) : fDay;
  };
  return (
    <div>
      {data.map(item => (
        <MainPageContent key={item.diaryId}>
          <ContentHeader>
            <div className="profile-image">
              <img src="https://picsum.photos/40/40" alt="" />
            </div>
            {/* Content title */}
            <ContentNameTitle>
              {/* User name */}
              <div>{/* <span>{item.nm}</span> */}</div>

              <div>
                <span>{item.title}</span>
              </div>
            </ContentNameTitle>

            {/* Content Date */}
            <WriteingDate>
              <span>{filteredDay(item.createdAt)}</span>
            </WriteingDate>
          </ContentHeader>
          {/* swiper */}
          <ContentSlide>
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              modules={[Pagination]}
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
              pagination={true}
              className="content-slide"
            >
              {item.pics.map((pics, index) => (
                <SwiperSlide key={index}>
                  <ContentSlideImage>
                    <img src={pics} alt="" />
                  </ContentSlideImage>
                </SwiperSlide>
              ))}
            </Swiper>
          </ContentSlide>

          <ContentBody>
            <ContentData>
              <div>
                <img src={EmojiFuc(item.emoji)} alt="" />
              </div>
              <div>
                <span>{item.contents}</span>
              </div>
            </ContentData>
            <ContentMoreView>
              <Link to={`/readpage?id=${item.diaryId}`}>더보기</Link>
            </ContentMoreView>
            <HashTag>
              {/* 해시태그 출력 */}
              {item.hashContents.map((hashContents, index) => (
                <HashTagBt key={index} onClick={() => {}}>
                  #{hashContents}
                </HashTagBt>
              ))}
              {/* test hash */}
              {item.hashContents.map((hashContents, index) => (
                <HashTagBt
                  key={index}
                  onClick={() => {
                    navigate(`/hashtag/${hashContents}`);
                  }}
                >
                  #{hashContents}
                </HashTagBt>
              ))}
            </HashTag>
          </ContentBody>
        </MainPageContent>
      ))}
    </div>
  );
};

export default MainContents;
