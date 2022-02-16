package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JmtReviewService {
    @Autowired private JmtReviewMapper mapper;

    public int insReview(JmtReviewEntity entity){
        return mapper.insReview(entity);
    }
}
