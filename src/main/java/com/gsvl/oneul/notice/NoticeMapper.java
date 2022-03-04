package com.gsvl.oneul.notice;

import com.gsvl.oneul.notice.model.NoticeDto;
import com.gsvl.oneul.notice.model.NoticeEntity;
import com.gsvl.oneul.notice.model.ResultVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {
    // 공지사항 리스트
    List<NoticeEntity> selNoticeList(NoticeDto dto);

    // 공지사항 디테일
    NoticeEntity selNoticeDetail(NoticeDto dto);

    // 공지사항 페이지
    ResultVo selMaxPage(NoticeDto dto);

    // 공지사항 조회수
    int addHits(NoticeDto dto);
}
