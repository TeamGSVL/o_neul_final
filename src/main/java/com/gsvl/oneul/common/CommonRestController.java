package com.gsvl.oneul.common;

import com.gsvl.oneul.common.model.img.SearchImgVO;
import com.gsvl.oneul.food.FoodService;
import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/common/ajax")
public class CommonRestController {
    @Autowired
    private FoodService foodService;
    @Autowired
    private CommonService commonService;


    //술과 계절을 분기할수있는 restapi ( 사용안함 )
    /*
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

     */
    //이미지 가져오는 get
    @GetMapping("/img/{keyword}")
    public Map<String,List<SearchImgVO>> getImg(@PathVariable String keyword,@RequestParam int imgNum){
        List<SearchImgVO> list = commonService.getImg(keyword,imgNum);
        Map<String,List<SearchImgVO>> map = new HashMap<>();
        map.put("result",list);
        return map;
    }
}
