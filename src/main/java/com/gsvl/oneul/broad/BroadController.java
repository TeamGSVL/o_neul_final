package com.gsvl.oneul.broad;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/broad")
public class BroadController {

    @GetMapping("/{itv}")
    public String goBroadPage(@PathVariable int itv){
        System.out.println(itv);
        return "/broad/brdetail";
    }
}
