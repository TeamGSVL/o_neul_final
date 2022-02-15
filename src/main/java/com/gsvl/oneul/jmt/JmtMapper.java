package com.gsvl.oneul.jmt;

import com.gsvl.oneul.jmt.model.JmtEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JmtMapper {
    int insJmt(JmtEntity entity);
    JmtEntity selJmt(JmtEntity entity);
}

