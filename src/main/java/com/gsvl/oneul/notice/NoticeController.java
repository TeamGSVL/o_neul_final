package com.gsvl.oneul.notice;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.notice.model.NoticeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    @Autowired private NoticeService service;

    @GetMapping()
    public String noticeList(NoticeEntity entity, Model model) {
        model.addAttribute(Const.NOTICE, service.selNoticeList(entity));
        return "/notice/notice";
    }

    @ResponseBody
    @GetMapping("/list")
    public List<NoticeEntity> list(@RequestBody NoticeEntity entity) {
        return service.selNoticeList(entity);
    }
}
