package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import com.gsvl.oneul.jmt.review.model.JmtReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JmtReviewService {
    @Autowired private JmtReviewMapper mapper;

    public int insReview(JmtReviewEntity entity){
        return mapper.insReview(entity);
    }
    List<JmtReviewVo> selReviewList(JmtReviewEntity entity){
        return mapper.selReviewList(entity);
    }
}
