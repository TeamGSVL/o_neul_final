package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review/ajax")
public class JmtReviewRestController {
    @Autowired private JmtReviewService service;

    @PostMapping()
    public int JmtReview(JmtReviewEntity entity){
        return service.insReview(entity);
    }
}
