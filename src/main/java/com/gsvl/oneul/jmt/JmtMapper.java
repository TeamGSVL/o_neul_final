package com.gsvl.oneul.jmt;

import com.gsvl.oneul.jmt.model.KakaoJsonEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JmtMapper {
    int insJmt(KakaoJsonEntity entity);
    KakaoJsonEntity selJmt(KakaoJsonEntity entity);
}

