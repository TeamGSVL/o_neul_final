package com.gsvl.oneul.jmt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/jmt/ajax")
public class JmtRestController {
    @Autowired
    private JmtService jmtService;

    @GetMapping("/list/{ijmt}")
    public String getKaKaoJsonData(@PathVariable int ijmt){
        return jmtService.getkakaoJsonPage(ijmt);
    }
    @PostMapping()
    @ResponseBody
    public Map<String, Integer> insJmt (@RequestBody List<String> kakaoId) {
        for(String iKao:kakaoId){
            jmtService.insJmt(iKao);
        }


        Map<String, Integer> result = new HashMap<>();
        result.put("result", 1);
        return result;
    }
}