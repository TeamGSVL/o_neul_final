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

    public List<JmtReviewVo> selReviewList(JmtReviewEntity entity){
        return mapper.selReviewList(entity);
    }

    public JmtReviewVo selReview(JmtReviewEntity entity){ return mapper.selReview(entity);}

    public int delReview(JmtReviewEntity entity){ return mapper.delReview(entity);}

    public int updReview(JmtReviewEntity entity){ return mapper.updReview(entity);}
}
