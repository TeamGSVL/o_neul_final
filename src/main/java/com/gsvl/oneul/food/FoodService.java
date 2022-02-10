package com.gsvl.oneul.food;

import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FoodService {
    @Autowired
    private FoodMapper foodMapper;


    //검색조건 넣고 결과 리스트로 가져오기 (num은 랜덤나올 갯수)
    public List<FoodResultVO> getFoodList(FoodConditionEntity entity){
        List<FoodResultVO> list = foodMapper.selFoodList(entity);
        //랜덤으로 fdnum개 추출
        if(list.size()==0){
            return null;
        }
        return list;
    }

}
