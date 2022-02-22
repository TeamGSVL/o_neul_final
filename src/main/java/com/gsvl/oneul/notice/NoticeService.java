package com.gsvl.oneul.notice;

import com.gsvl.oneul.notice.model.NoticeDto;
import com.gsvl.oneul.notice.model.NoticeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {
    @Autowired private NoticeMapper mapper;

    // 공지사항 리스트
    public List<NoticeEntity> selNoticeList(NoticeEntity entity) {
        return mapper.selNoticeList(entity);
    }

    // 공지사항 디테일
    public NoticeEntity selNoticeDetail(NoticeDto dto) {
        return mapper.selNoticeDetail(dto);
    }
}
