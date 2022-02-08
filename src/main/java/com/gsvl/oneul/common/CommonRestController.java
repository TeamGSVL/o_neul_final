package com.gsvl.oneul.common;

import com.gsvl.oneul.food.FoodService;
import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ajax/common")
public class CommonRestController {
    @Autowired
    private FoodService foodService;


    //술과 계절을 분기할수있는 restapi
    @GetMapping("/{subCode}")
    public List<FoodResultVO> getSeasonList(@PathVariable int subCode, @RequestParam int code,@RequestParam int fdNum, FoodConditionEntity entity){
        System.out.println(code);
        if(code==1){
            entity.setF_season(subCode);
        }else if(code==2){
            entity.setAlknum(subCode);
        }
        return foodService.getFoodList(entity,fdNum);
    }
}
