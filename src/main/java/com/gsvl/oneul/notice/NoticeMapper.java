package com.gsvl.oneul.notice;

import com.gsvl.oneul.notice.model.NoticeEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {
    List<NoticeEntity> selNoticeList(NoticeEntity entity);
}
