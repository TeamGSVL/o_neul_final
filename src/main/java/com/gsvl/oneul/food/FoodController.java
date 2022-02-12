package com.gsvl.oneul.food;

import com.gsvl.oneul.common.Const;
import com.gsvl.oneul.food.model.FoodConNmEntity;
import com.gsvl.oneul.food.model.FoodConditionBean;
import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService foodService;
    @Autowired
    private ApplicationContext appCon;

    @GetMapping()
    public String goFood(Model model){
        model.addAttribute(Const.F_COOKERY,(List<FoodConNmEntity>) appCon.getBean("f_cookery"));
        model.addAttribute(Const.F_WORLDDIV,(List<FoodConNmEntity>) appCon.getBean("f_worlddiv"));
        model.addAttribute(Const.IGD,(List<FoodConNmEntity>) appCon.getBean("igd"));
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
