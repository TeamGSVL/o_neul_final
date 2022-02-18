package com.gsvl.oneul.notice;

import com.gsvl.oneul.notice.model.NoticeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {
    @Autowired private NoticeMapper mapper;

    public List<NoticeEntity> selNoticeList(NoticeEntity entity) {
        return mapper.selNoticeList(entity);
    }
}
