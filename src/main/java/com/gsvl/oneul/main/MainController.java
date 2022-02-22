package com.gsvl.oneul.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/")
    public String defualt(){
        return "main";
    }
    @GetMapping("/main")
    public void main(){
    }
}
