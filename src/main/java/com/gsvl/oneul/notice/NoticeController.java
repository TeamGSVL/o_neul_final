package com.gsvl.oneul.notice;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.notice.model.NoticeDto;
import com.gsvl.oneul.notice.model.NoticeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    @Autowired
    private NoticeService service;

    // 공지사항 리스트 뷰
    @GetMapping()
    public String noticeList(NoticeDto dto, Model model) {
        model.addAttribute(Const.NOTICE, service.selNoticeList(dto));
        return "/notice/notice";
    }

    // 공지사항 리스트
    @ResponseBody
    @GetMapping("/list")
    public List<NoticeEntity> noticeListView(NoticeDto dto) {
        return service.selNoticeList(dto);
    }

    // 공지사항 디테일 뷰
    @GetMapping("/noticedetail")
    public String detailListView(NoticeDto dto, Model model) {
        model.addAttribute(Const.NOTICE_DETAIL, service.selNoticeDetail(dto));
        return "/notice/noticedetail";
    }
}
