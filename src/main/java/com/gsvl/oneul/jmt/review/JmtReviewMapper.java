package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import com.gsvl.oneul.jmt.review.model.JmtReviewVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JmtReviewMapper {
    int insReview(JmtReviewEntity entity);
    List<JmtReviewVo> selReviewList(JmtReviewEntity entity);
}
