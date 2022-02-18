package com.gsvl.oneul.user;

import com.gsvl.oneul.user.model.UserDTO;
import com.gsvl.oneul.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
