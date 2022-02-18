package com.gsvl.oneul.user;

import com.gsvl.oneul.user.model.UserDTO;
import com.gsvl.oneul.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired private UserService service;


    @GetMapping("/login")
    public void goLoginPage(){ }

    @GetMapping("/join")
    public void goJoinPage(){ }

    @PostMapping("/join")
    public String join(UserEntity entity){
        service.join(entity);
        return "redirect:/user/login";
    }


    //AJAX
    //zzimFood 확인
    @GetMapping("/ajax/zzim/food")
    @ResponseBody
    public int isZzimFood(UserDTO dto){
        return service.isZzimFood(dto);
    }
    //zzimfood insert
    @GetMapping("/ajax/zzim/food/ins")
    @ResponseBody
    public int insZzimFood(UserDTO dto){
        return service.insZzimFood(dto);
    }
    //zzimfood delete
    @GetMapping("/ajax/zzim/food/del")
    @ResponseBody
    public int delZzimFood(UserDTO dto){
        return service.delZzimFood(dto);
    }





    //zzimJmt 확인
    @GetMapping("/ajax/zzim/jmt")
    @ResponseBody
    public int isZzimJmt(UserDTO dto){
        return service.isZzimJmt(dto);
    }
}
