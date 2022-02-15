package com.gsvl.oneul.jmt;

import com.gsvl.oneul.jmt.model.JmtDto;
import com.gsvl.oneul.jmt.model.JmtEntity;
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


    @PostMapping()
    @ResponseBody
    public Map<String, Integer> insJmt (@RequestBody List<JmtEntity> jmtArr) {
        for(JmtEntity entity:jmtArr){
            jmtService.insJmt(entity);
        }

        Map<String, Integer> result = new HashMap<>();
        result.put("result", 1);
        return result;
    }
}