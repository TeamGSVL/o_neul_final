package com.gsvl.oneul.jmt;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/jmt")
public class JmtController {


    // /jmt/list로 화면이동
    @GetMapping()
    public String goJmtList(){
        return "/jmt/list";
    }

    // /jmt/detail로 화면이동
    @GetMapping("/{ijmt}")
    public String goJmtDetail(@PathVariable int ijmt){
        System.out.println(ijmt);
        return "/jmt/detail";
    }
}
