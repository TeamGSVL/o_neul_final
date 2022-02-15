package com.gsvl.oneul.season;

import com.gsvl.oneul.season.model.SeasonEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SeasonMapper {
    // 계절별 음식 리스트.
    List<SeasonEntity> selSeasonList(SeasonEntity entity);
}
