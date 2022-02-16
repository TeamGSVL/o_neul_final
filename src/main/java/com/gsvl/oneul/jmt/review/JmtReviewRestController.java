package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import com.gsvl.oneul.jmt.review.model.JmtReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/review/ajax")
public class JmtReviewRestController {
    @Autowired private JmtReviewService service;

    @PostMapping()
    public int JmtReview(JmtReviewEntity entity){
        return service.insReview(entity);
    }
    @GetMapping()
    public List<JmtReviewVo> selReviewList(JmtReviewEntity entity){
        return service.selReviewList(entity);
    }
}
