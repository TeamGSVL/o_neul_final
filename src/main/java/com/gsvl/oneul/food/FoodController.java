package com.gsvl.oneul.food;

import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @GetMapping()
    public String goFood(){
        return "/food/condition";
    }

    //ajax 조건 리스트
    @ResponseBody
    @PostMapping()
    public List<FoodResultVO> getConditions(@RequestBody FoodConditionEntity entity){
        List<FoodResultVO> list = foodService.getFoodList(entity);
        return list;
    }

}
