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

    @GetMapping
    public void goFood(){}

    //ajax 조건 리스트
    @ResponseBody
    @PostMapping("/{fdNum}")
    public List<FoodResultVO> getConditions(@RequestBody FoodConditionEntity entity, @PathVariable int fdNum){
        List<FoodResultVO> list = foodService.getFoodList(entity,fdNum);
        return list;
    }

}
