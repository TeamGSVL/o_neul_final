package com.gsvl.oneul.season;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/season")
public class SeasonController {

    @GetMapping()
    public String goSeasonPage(){
        return "/season/sslist";
    }
}
