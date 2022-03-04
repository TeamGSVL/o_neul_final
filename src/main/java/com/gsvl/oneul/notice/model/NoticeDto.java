package com.gsvl.oneul.notice.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDto {
    private int inotice;
    private int recordCount;
    private int currentPage;
    private int startIdx;
}
