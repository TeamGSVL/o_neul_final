package com.gsvl.oneul.food;

import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FoodMapper {
    List<FoodResultVO> selFoodList(FoodConditionEntity entity);
}
