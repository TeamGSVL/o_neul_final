package com.gsvl.oneul.notice;

import com.gsvl.oneul.notice.model.NoticeDto;
import com.gsvl.oneul.notice.model.NoticeEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {
    // 공지사항 리스트
    List<NoticeEntity> selNoticeList(NoticeEntity entity);

    // 공지사항 디테일
    NoticeEntity selNoticeDetail(NoticeDto dto);
}
