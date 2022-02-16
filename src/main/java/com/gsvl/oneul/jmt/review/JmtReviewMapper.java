package com.gsvl.oneul.jmt.review;

import com.gsvl.oneul.jmt.review.model.JmtReviewEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JmtReviewMapper {
    int insReview(JmtReviewEntity entity);
}
